import { toZonedTime } from 'date-fns-tz';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../models/RutasModel';
import { createPreferencia, getMensualidadesUser, pagarManual, updateValorMensualidadesUser } from '../services/MensualidadService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

export default function useMensualidades(consultarSocios) {

    const navigate = useNavigate();
    const titulo = "Mensualidades";
    const zonaHoraria = 'America/Bogota';
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openFactura, setOpenFactura] = useState(false);
    const [mensualidad, setMensualidad] = useState(null);
    const [factura, setFactura] = useState(null);
    const [preferencia, setPreferencia] = useState(null);
    const [mensualidades, setMensualidades] = useState([]);
    const [busquedaAño, setBusquedaAño] = useState(new Date().getFullYear().toString());
    const [touched, setTouched] = useState(false);
    const [user, setUser] = useState({});
    const [pago, setPago] = useState({
        mensualidad_id: null,
        metodo_pago: null,
        soporte: null,
        referencia_pago: null,
    });
    const [valorMensualidad, setValorMensualidad] = useState('');
    const [editingMensualidad, setEditingMensualidad] = useState(null);

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setLoading(false);
        setOpenModal(false);
        setPreferencia(null);
        setMensualidad(null);
        setFactura(null);
        setTouched(false);
        setOpenFactura(false);
    }

    /*=========== Navegar ==============================*/

    const goMensualidades = (documento) => {
        navigate(PrivateRoutes.PAGOS_SOCIOS, { state: { documento } })
    }

    /*=========== Crear Preferencia ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const cargar = (mensualidad) => {
        setMensualidad(mensualidad);
        setOpenModal(true);
        setPago({ metodo_pago: null, valor: null, mensualidad_id: mensualidad.id });
    }

    const crearPreferencia = async () => {
        setLoading(true);
        try {
            const response = await createPreferencia(pago);
            if (response.status) {
                setOpenModal(true);
                setPreferencia(response.preference_id);
            }else{
                response.errors.forEach((error) => {
                    alertWarning(error);
                })
            }
        } catch (error) {
            alertError(error.message);
        }
        setLoading(false);
    };

    /*=========== Pagar manual ==============================*/

    const handleChangeCheck = () => {
        setTouched(!touched);
        pago.valor = null;
    }

    const handleChange = ({ target }) => {
        setPago({
            ...pago,
            [target.name]: target.value,
            mensualidad_id: mensualidad.id
        })
    }

    const handleChangeImagen = (event) => {
        const file = event.target.files[0];
        setPago({ ...pago, soporte: file });
    };

    const pagoManual = async (documento) => {
        setLoading(true);
        try {
            const formData = new FormData();
            if (pago.mensualidad_id !== null) formData.append('mensualidad_id', pago.mensualidad_id);
            if (pago.metodo_pago !== null) formData.append('metodo_pago', pago.metodo_pago);
            if (pago.referencia_pago !== null) formData.append('referencia_pago', pago.referencia_pago);
            const valor = pago.valor !== null ? parseFloat(pago.valor) : null;
            if (valor !== null) {
                formData.append('valor', valor);
            }
            if (pago.soporte) {
                formData.append('soporte', pago.soporte);
            }
            const response = await pagarManual(formData);

            if (response.status) {
                setOpenModal(false);
                await getMensualidadesUsuario(documento);
                alertSucces(response.message);
            } else {
                response.errors.forEach((error) => {
                    alertWarning(error);
                })
            }
        } catch (error) {
            alertError(error.message);
            console.log(error);
        }
        setLoading(false);
    }

    /*=========== Obtener mensualidades ==============================*/

    const getMensualidadesUsuario = async (documento) => {
        setLoading(true);
        try {
            const mensualidades = await getMensualidadesUser(documento);
            setMensualidades(mensualidades.mensualidades);
            const socio = mensualidades.asociado ? mensualidades.asociado : mensualidades.adherente;
            setUser(socio);
        } catch (error) {
            alertError(error.message);
            console.log(error);

        }
        setLoading(false);
    }

    /*=========== Busqueda Mensualidades =======================*/

    const filtroBusqueda = () => {
        return mensualidades.filter((cuota) => {
            const zonedDate = toZonedTime(cuota.fecha, zonaHoraria);
            const añoCuota = zonedDate.getFullYear();
            return añoCuota.toString().includes(busquedaAño);
        });
    }

    const listado = filtroBusqueda();

    /*=========== Cargar factura ==============================*/

    const handleBusquedaAño = ({ target }) => {
        setBusquedaAño(target.value);
    }

    const toggleModalFactura = () => {
        setOpenFactura(!openFactura);
    }

    const cargarFactura = (factura) => {
        setOpenFactura(true);
        setFactura(factura);
    }

    /*=========== Editar valor mensualidad ==============================*/

    const handleEditMensualidad = (row) => {
        setEditingMensualidad(row.documento);
        setValorMensualidad(row.mensualidad);
    };

    const handleSaveMensualidad = async (documento) => {
        setLoading(true);
        try {
            const response = await updateValorMensualidadesUser(documento, valorMensualidad);
            if (response.status) {
                alertSucces(response.message);
                await consultarSocios();
                setEditingMensualidad(null);
            } else {
                alertWarning(response.message);
                setEditingMensualidad(null);
            }
        } catch (error) {
            alertError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelMensualidad = () => {
        setEditingMensualidad(null);
    };

    return {
        titulo,
        user,
        loading,
        listado,
        openModal,
        preferencia,
        pago,
        mensualidad,
        openFactura,
        factura,
        touched,
        busquedaAño,
        valorMensualidad,
        editingMensualidad,
        handleChangeImagen,
        getMensualidadesUsuario,
        toggleModal,
        cargar,
        crearPreferencia,
        handleChange,
        pagoManual,
        toggleModalFactura,
        cargarFactura,
        goMensualidades,
        handleBusquedaAño,
        handleChangeCheck,
        handleEditMensualidad,
        handleSaveMensualidad,
        handleCancelMensualidad,
        setValorMensualidad,
    }

}
