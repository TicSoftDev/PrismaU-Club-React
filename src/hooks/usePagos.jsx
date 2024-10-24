import { useEffect, useState } from "react";
import { generarFactura, getPagos, getPagosCuotaBaile } from "../services/PagosService";
import { alertError, alertSucces, alertWarning } from "../utilities/alerts/Alertas";

export default function usePagos() {

    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [listadoPagos, setListadoPagos] = useState([]);
    const [listadoPagosCuotasBaile, setListadoPagosCuotasBaile] = useState([]);
    const [programacion, setProgramacion] = useState({
        rubro_id: "",
        año: "",
    });

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setProgramacion({
            rubro_id: "",
            año: "",
        });
    }

    /*=========== Programar mensualidad ==============================*/

    const handleChangeProgramacion = ({ target }) => {
        setProgramacion({
            ...programacion,
            [target.name]: target.value
        });
    }

    const handleProgramar = async () => {
        setLoading(true);
        try {
            const response = await generarFactura(programacion);
            if (response.status) {
                alertSucces(response.message);
            } else {
                alertWarning(response.message);
            }
            recargar();
        } catch (e) {
            console.log(e.response.data.message);
            alertError("Error al generar las facturas");
        }
        setLoading(false);
    }

    /*=========== Consultar pagos ==============================*/

    const consultarPagos = async () => {
        setLoading(true);
        try {
            const data = await getPagos();
            setListadoPagos(data);
        } catch (error) {
            alertError(error.message);
        }
        setLoading(false);
    };

    const consultarPagosCuotasBaile = async () => {
        setLoading(true);
        try {
            const data = await getPagosCuotaBaile();
            setListadoPagosCuotasBaile(data);
        } catch (error) {
            alertError(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        setBusqueda('');
        consultarPagos();
        consultarPagosCuotasBaile();
    }, []);

    /*=========== Busqueda ==============================*/

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
            const nombreCompleto = dato.mensualidad.user.asociado ?
                `${dato.mensualidad.user.asociado.Nombre} ${dato.mensualidad.user.asociado.Apellidos}` :
                `${dato.user.mensualidad.user.adherente.Nombre} ${dato.user.mensualidad.user.adherente.Apellidos}`;
            const nombreNormalizado = normalizeText(nombreCompleto);
            const cumpleBusqueda = palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra)
            );
            return cumpleBusqueda;
        });
    };

    const filterBusqueda2 = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreCompleto = dato.cuota.user.asociado ?
                `${dato.cuota.user.asociado.Nombre} ${dato.cuota.user.asociado.Apellidos}` :
                `${dato.user.cuota.user.adherente.Nombre} ${dato.user.cuota.user.adherente.Apellidos}`;
            const nombreNormalizado = normalizeText(nombreCompleto);
            const cumpleBusqueda = palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra)
            );
            return cumpleBusqueda;
        });
    };

    const mensualidades = filterBusqueda(listadoPagos, busqueda);
    const cuotasBaile = filterBusqueda2(listadoPagosCuotasBaile, busqueda);

    return {
        mensualidades,
        cuotasBaile,
        loading,
        programacion,
        busqueda,
        handleChangeProgramacion,
        handleProgramar,
        handleBusqueda
    }
}
