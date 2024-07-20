import { useEffect, useState } from 'react';
import { getSolicitudes, responderSolicitud } from '../services/SolicitudesService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useSolicitudes() {

    let lista = [];
    const titulo = 'Solicitudes';
    const tituloModal = 'Solicitud';
    const [busqueda, setBusqueda] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState('Todos');
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [solicitud, setSolicitud] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setSolicitud(null);
        setOpenModal(false);
        setBusqueda('');
        setEstadoFiltro('Todos');
        setLoading(false);
    }

    /*=========== Consultar ==============================*/

    const consultarSolicitudes = async () => {
        try {
            setLoading(true);
            const res = await getSolicitudes();
            setSolicitudes(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alertError("cargar solicitudes", error.message);
        }
    }

    useEffect(() => {
        consultarSolicitudes();
    }, []);

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterBusqueda = (listado, busqueda, estadoFiltro) => {
        if (!busqueda && estadoFiltro === 'Todos') return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreCompleto = dato.user.asociado ?
                `${dato.user.asociado.Nombre} ${dato.user.asociado.Apellidos}` :
                `${dato.user.adherente.Nombre} ${dato.user.adherente.Apellidos}`;
            const nombreNormalizado = normalizeText(nombreCompleto);
            const cumpleBusqueda = palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra)
            );
            const cumpleEstado = estadoFiltro === 'Todos' || dato.Estado.toString() === estadoFiltro;

            return cumpleBusqueda && cumpleEstado;
        });
    };

    if (!busqueda && estadoFiltro === 'Todos') {
        lista = solicitudes;
    } else {
        lista = filterBusqueda(solicitudes, busqueda, estadoFiltro);
    }

    /*=========== Responder ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
    }

    const cargarSolicitud = async (solicitud) => {
        setSolicitud(solicitud);
        toggleModal();
    }

    const handleChange = ({ target }) => {
        setSolicitud({
            ...solicitud,
            [target.name]: target.value
        });
    }

    const responder = async () => {
        try {
            if (solicitud.Respuesta === '') {
                return alertWarning("Por favor, ingrese una respuesta");
            }
            setLoading(true);
            const res = await responderSolicitud(solicitud.id, solicitud);
            setLoading(false);
            if (res.status) {
                consultarSolicitudes();
                recargar();
                alertSucces("Solicitud respondida");
            } else {
                alertError("No se pudo responder la solicitud");
            }
        } catch (error) {
            setLoading(false);
            alertError("responder solicitudes", error.message);
        }
    }

    return {
        titulo, lista, loading, busqueda, openModal, tituloModal, solicitud,
        toggleModal, handleBusqueda, setEstadoFiltro, cargarSolicitud, handleChange, responder
    };
}

export default useSolicitudes