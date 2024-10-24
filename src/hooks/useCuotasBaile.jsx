import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../models/RutasModel";
import { createPreferencia, getCuotasUser, pagarCuota } from "../services/CuotasBaileService";
import { alertError, alertSucces, alertWarning } from "../utilities/alerts/Alertas";

export default function useCuotasBaile() {

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
    });

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setLoading(false);
        setOpenModal(false);
        setCuota({});
        setPago({
            cuotas_baile_id: "",
            valor: "",
            metodo_pago: "",
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

    const pagoManual = async (documento) => {
        if (!pago.metodo_pago || !pago.valor) {
            alertWarning("Debe llenar todos los campos");
            return;
        }
        if (pago.valor > cuota.restante) {
            alertWarning("El valor no puede ser mayor al restante");
            return;
        }
        setLoading(true);
        try {
            const response = await pagarCuota(pago);
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
        handleBusqueda,
        toggleModal,
        getCuotasBaile,
        goCuotasBaile,
        cargar,
        handleChange,
        pagoManual,
        crearPreferencia,
        toggleModalFactura,
        cargarFactura,
    }
}
