import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../models/RutasModel';
import { getAdherentes } from '../services/AdherentesService';
import { getAsociados } from '../services/AsociadosService';
import { createPreferencia, getMensualidadesUser, pagarManual } from '../services/MensualidadService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';
import { toZonedTime } from 'date-fns-tz';

export default function useMensualidades() {

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
    const [user, setUser] = useState({});
    const [pago, setPago] = useState({
        mensualidad_id: null,
        metodo_pago: null,
    });

    const [touched, setTouched] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [socios, setSocios] = useState([]);

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setLoading(false);
        setOpenModal(false);
        setPreferencia(null);
        setMensualidad(null);
        setFactura(null);
        setBusqueda('');
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
    }

    const crearPreferencia = async () => {
        setLoading(true);
        try {
            const response = await createPreferencia(mensualidad.id);
            if (response) {
                setOpenModal(true);
                setPreferencia(response);
            }
        } catch (error) {
            alertError(error.message);
        }
        setLoading(false);
    };

    /*=========== Pagar manual ==============================*/

    const handleChange = ({ target }) => {
        setPago({
            ...pago,
            [target.name]: target.value,
            mensualidad_id: mensualidad.id
        })
    }

    const pagoManual = async (documento) => {
        if (!pago.metodo_pago) {
            alertWarning("Debe llenar todos los campos");
            return;
        }
        setLoading(true);
        try {
            const response = await pagarManual(pago);
            if (response.status) {
                setOpenModal(false);
                await getMensualidadesUsuario(documento);
                alertSucces(response.message);
            } else {
                alertWarning("No se pudo realizar el pago");
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

    /*=========== Consultar socios ==============================*/

    const getSocios = async (rol) => {
        setTouched(true);
        setLoading(true);
        try {
            let data;
            if (rol === 2) {
                data = await getAsociados();
            } else if (rol === 3) {
                data = await getAdherentes();
            }
            setSocios(data);
        } catch (e) {
            console.log("Socios", e.message);
        }
        setLoading(false);
    };

    /*=========== Consultar socios ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterBusqueda = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreNormalizado = normalizeText(`${dato.Nombre} ${dato.Apellidos}`);
            const documentoNormalizado = normalizeText(dato.Documento);
            const cumpleBusqueda = palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || documentoNormalizado.includes(palabra)
            );
            return cumpleBusqueda;
        });
    };

    const lista = filterBusqueda(socios, busqueda);

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
        busquedaAño,
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

        touched,
        handleBusqueda,
        normalizeText,
        filterBusqueda,
        lista,
        getSocios
    }

}
