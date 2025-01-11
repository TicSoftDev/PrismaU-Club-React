import { useState } from "react";
import apiQuerySolicitudes from "../api/apiQuerySolicitudes";
import { normalizeText } from "../models/FormateadorModel";
import { alertSucces, alertWarning } from "../utilities/alerts/Alertas";

function useSolicitudes() {

    let lista = [];
    const titulo = "Solicitudes";
    const tituloModal = "Solicitud";
    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todos");
    const [solicitud, setSolicitud] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const { isLoading, isResponding, solicitudes, responderMutation } = apiQuerySolicitudes();

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setSolicitud(null);
        setOpenModal(false);
        setBusqueda("");
        setEstadoFiltro("Todos");
    };

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const filterBusqueda = (listado, busqueda, estadoFiltro) => {
        if (!busqueda && estadoFiltro === "Todos") return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreCompleto = dato.user.asociado
                ? `${dato.user.asociado.Nombre} ${dato.user.asociado.Apellidos}`
                : `${dato.user.adherente.Nombre} ${dato.user.adherente.Apellidos}`;
            const nombreNormalizado = normalizeText(nombreCompleto);
            const cumpleBusqueda = palabrasBusqueda.every((palabra) =>
                nombreNormalizado.includes(palabra)
            );
            const cumpleEstado =
                estadoFiltro === "Todos" || dato.Estado.toString() === estadoFiltro;

            return cumpleBusqueda && cumpleEstado;
        });
    };

    if (!busqueda && estadoFiltro === "Todos") {
        lista = solicitudes;
    } else {
        lista = filterBusqueda(solicitudes, busqueda, estadoFiltro);
    }

    /*=========== Responder ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    };

    const cargarSolicitud = (solicitud) => {
        setSolicitud(solicitud);
        setOpenModal(true);
    };

    const handleChange = ({ target }) => {
        setSolicitud({
            ...solicitud,
            [target.name]: target.value,
        });
    };

    const responder = () => {
        if (!solicitud.Respuesta) {
            return alertWarning("Por favor, ingrese una respuesta");
        }        
        responderMutation(solicitud, {
            onSuccess: (data) => {
                if (data.status) {
                    toggleModal();
                    alertSucces("Respondido correctamente");
                } else {
                    data.errors.map((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al responder la solicitud: ${error.message}`); },
        });
    };

    return {
        titulo,
        lista,
        busqueda,
        openModal,
        tituloModal,
        solicitud,
        isLoading,
        isResponding,
        toggleModal,
        handleBusqueda,
        setEstadoFiltro,
        cargarSolicitud,
        handleChange,
        responder,
    };
}

export default useSolicitudes;
