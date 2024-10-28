import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../models/RutasModel";
import { createPreferencia, getCuotasUser, pagarCuota, updateValorCuotasUser } from "../services/CuotasBaileService";
import { alertError, alertSucces, alertWarning } from "../utilities/alerts/Alertas";

export default function useCuotasBaile(consultarSocios) {

    const navigate = useNavigate();
    const titulo = 'Cuotas baile';
    const [openModal, setOpenModal] = useState(false);
    const [openFactura, setOpenFactura] = useState(false);
    const [cuotasBaile, setCuotasBaile] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [cuota, setCuota] = useState({});
    const [preferencia, setPreferencia] = useState(null);
    const [factura, setFactura] = useState(null);
    const [pago, setPago] = useState({
        cuotas_baile_id: "",
        valor: "",
        metodo_pago: "",
        soporte: null,
        referencia_pago: "",
    });
    const [valorCuota, setValorCuota] = useState('');
    const [editingCuotaBaile, setEditingCuotaBaile] = useState(null);

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setLoading(false);
        setOpenModal(false);
        setCuota({});
        setPago({
            cuotas_baile_id: "",
            valor: "",
            metodo_pago: "",
            soporte: null,
            referencia_pago: "",
        });
    }

    /*=========== Navegación ==============================*/

    const goCuotasBaile = (documento) => {
        navigate(PrivateRoutes.PAGOS_CUOTAS_BAILE, { state: { documento } });
    }

    /*=========== Crear Preferencia ==============================*/

    const crearPreferencia = async () => {
        if (!pago.valor) {
            alertWarning("Debe ingresar un valor");
            return;
        }
        if (pago.valor > cuota.restante) {
            alertWarning("El valor no puede ser mayor al restante");
            return;
        }
        setLoading(true);
        try {
            const response = await createPreferencia(pago);
            if (response) {
                setOpenModal(true);
                setPreferencia(response);
            }
        } catch (error) {
            alertError(error.message);
        }
        setLoading(false);
    };

    /*=========== Pagar ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const cargar = (cuota) => {
        setOpenModal(true);
        setCuota(cuota);
    }

    const handleChange = ({ target }) => {
        setPago({
            ...pago,
            [target.name]: target.value,
            cuotas_baile_id: cuota.id
        })
    }

    const handleChangeImagen = (event) => {
        const file = event.target.files[0];
        setPago({ ...pago, soporte: file });
    };

    const pagoManual = async (documento) => {
        if (!pago.metodo_pago || !pago.valor || !pago.referencia_pago || !pago.soporte) {
            alertWarning("Debe llenar todos los campos");
            return;
        }
        if (pago.valor > cuota.restante) {
            alertWarning("El valor no puede ser mayor al restante");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("soporte", pago.soporte);
            formData.append("referencia_pago", pago.referencia_pago);
            formData.append("metodo_pago", pago.metodo_pago);
            formData.append("valor", pago.valor);
            formData.append("cuotas_baile_id", pago.cuotas_baile_id);
            const response = await pagarCuota(formData);
            if (response.status) {
                setOpenModal(false);
                await getCuotasBaile(documento);
                alertSucces(response.message);
            } else {
                alertWarning("No se pudo realizar el pago");
            }
        } catch (error) {
            alertError(error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==============================*/

    const getCuotasBaile = async (documento) => {
        setLoading(true);
        try {
            const data = await getCuotasUser(documento);
            setCuotasBaile(data.cuotas);
            const socio = data.asociado ? data.asociado : data.adherente;
            setUser(socio);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    }

    const filtroBusqueda = () => {
        return cuotasBaile.filter((cuota) => cuota.año.toLowerCase().includes(busqueda.toLowerCase()));
    }

    const listado = filtroBusqueda();

    /*=========== Cargar factura ==============================*/

    const toggleModalFactura = () => {
        setOpenFactura(!openFactura);
    }

    const cargarFactura = (factura) => {
        setOpenFactura(true);
        setFactura(factura);
    }

    /*=========== Editar valor mensualidad =======================*/

    const handleEditCuotaBaile = (row) => {
        setEditingCuotaBaile(row.documento);
        setValorCuota(row.cuota_baile);
    };

    const handleSaveCuotaBaile = async (documento) => {
        console.log(documento, valorCuota);
        setLoading(true);
        try {
            const response = await updateValorCuotasUser(documento, valorCuota);
            console.log(response);
            if (response.status) {
                alertSucces(response.message);
                await consultarSocios();
                setEditingCuotaBaile(null);
            } else {
                alertWarning(response.message);
                setEditingCuotaBaile(null);
            }
        } catch (error) {
            alertError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelCuotaBaile = () => {
        setEditingCuotaBaile(null);
    };

    return {
        titulo,
        loading,
        listado,
        busqueda,
        user,
        openModal,
        cuota,
        preferencia,
        openFactura,
        factura,
        valorCuota,
        editingCuotaBaile,
        handleBusqueda,
        toggleModal,
        getCuotasBaile,
        goCuotasBaile,
        cargar,
        handleChange,
        handleChangeImagen,
        pagoManual,
        crearPreferencia,
        toggleModalFactura,
        cargarFactura,
        handleEditCuotaBaile,
        handleSaveCuotaBaile,
        handleCancelCuotaBaile,
        setValorCuota,
    }
}
