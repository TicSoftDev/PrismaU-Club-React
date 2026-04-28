import { useEffect, useState } from "react";
import { generarFactura, getPagos, getPagosCuotaBaile } from "../services/PagosService";
import { alertError, alertSucces, alertWarning } from "../utilities/alerts/Alertas";
import { formatearFecha, formatearFechaMes } from "../models/FormateadorModel";

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

    const handleChange = ({ target }) => {
        setProgramacion({
            ...programacion,
            [target.name]: target.value
        });
    }

    const handleChangeRubro = (rubro) => {
        setProgramacion({
            ...programacion,
            rubro_id: rubro.id,
            rubro: rubro.rubro
        });
    }

    const handleProgramar = async () => {
        setLoading(true);
        try {
            const response = await generarFactura(programacion);
            if (response.status) {
                recargar();
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

    const normalizeText = (text = "") => {
        return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const getNombreUsuarioMensualidad = (dato) => {
        const asociado = dato?.mensualidad?.user?.asociado;
        const adherente = dato?.mensualidad?.user?.adherente;
        if (asociado) return `${asociado.Nombre ?? ""} ${asociado.Apellidos ?? ""}`;
        if (adherente) return `${adherente.Nombre ?? ""} ${adherente.Apellidos ?? ""}`;
        return "";
    };

    const getNombreUsuarioCuotaBaile = (dato) => {
        const asociado = dato?.cuota?.user?.asociado;
        const adherente = dato?.cuota?.user?.adherente;
        if (asociado) return `${asociado.Nombre ?? ""} ${asociado.Apellidos ?? ""}`;
        if (adherente) return `${adherente.Nombre ?? ""} ${adherente.Apellidos ?? ""}`;
        return "";

    };

    const cumpleBusquedaTexto = (texto, busqueda) => {
        if (!busqueda) return true;
        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/).filter(Boolean);
        const textoNormalizado = normalizeText(texto);
        return palabrasBusqueda.every((palabra) =>
            textoNormalizado.includes(palabra)
        );
    };

    const filterBusqueda = (listado, busqueda) => {
        if (!busqueda) return listado;
        return listado.filter((dato) => {
            const nombreCompleto = getNombreUsuarioMensualidad(dato);
            const periodo = formatearFechaMes(dato?.mensualidad?.fecha);
            const fechaMensualidad = dato?.mensualidad?.fecha ?? "";
            const textoBusqueda = `
                ${nombreCompleto}
                ${periodo}
                ${fechaMensualidad}
            `;
            return cumpleBusquedaTexto(textoBusqueda, busqueda);
        });
    };

    const filterBusqueda2 = (listado, busqueda) => {
        if (!busqueda) return listado;
        return listado.filter((dato) => {
            const nombreCompleto = getNombreUsuarioCuotaBaile(dato);
            const periodo = dato?.cuota?.descripcion ?? "";
            const textoBusqueda = `
                ${nombreCompleto}
                ${periodo}
            `;
            return cumpleBusquedaTexto(textoBusqueda, busqueda);
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
        handleChange,
        handleChangeRubro,
        handleProgramar,
        handleBusqueda
    }
}
