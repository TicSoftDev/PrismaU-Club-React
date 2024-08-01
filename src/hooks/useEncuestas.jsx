import React from 'react';
import Swal from 'sweetalert2';
import { createEncuesta, deleteEncuesta, getEncuesta, getEncuestas, updateEncuesta } from '../services/EncuestasService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useEncuestas() {

    const titulo = 'Encuestas';
    const [openModal, setOpenModal] = React.useState(false);
    const [busqueda, setBusqueda] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [encuestas, setEncuestas] = React.useState([]);
    const [resultadoEncuesta, setResultadoEncuesta] = React.useState([]);
    const [encuesta, setEncuesta] = React.useState({
        Titulo: '',
        Descripcion: '',
        Estado: 1
    });
    const tituloModal = encuesta.id ? 'Actualizar encuesta' : 'Crear encuesta';

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setEncuesta({
            Titulo: '',
            Descripcion: '',
            Estado: 1
        })
        setBusqueda('');
        setLoading(false);
    }

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setEncuesta({
            ...encuesta,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!encuesta.Titulo || !encuesta.Descripcion) {
            alertWarning("Por favor, ingrese todos los campos.");
            return;
        }
        setLoading(true);
        try {
            const data = await createEncuesta(encuesta);
            if (data.status) {
                toggleModal();
                await consultarEncuestas();
                alertSucces("Creado correctamente");
            } else {
                alertWarning("No se pudo crear la encuesta");
            }
        } catch (error) {
            console.log("Encuesta", error.message);
            alertError("Crear encuesta: " + error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==============================*/

    const consultarEncuestas = async () => {
        setLoading(true);
        try {
            const data = await getEncuestas();
            setEncuestas(data);
        } catch (error) {
            console.log("Reservas", error.message);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        consultarEncuestas();
    }, []);

    /*=========== Buscar ==============================*/

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
            const nombreCompleto = dato.user.asociado ?
                `${dato.user.asociado.Nombre} ${dato.user.asociado.Apellidos}` :
                `${dato.user.adherente.Nombre} ${dato.user.adherente.Apellidos}`;
            const nombreNormalizado = normalizeText(nombreCompleto);
            const fechaNormalizada = normalizeText(dato.Fecha);
            const espacioNormalizado = normalizeText(dato.espacio.Descripcion);

            return palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || fechaNormalizada.includes(palabra) || espacioNormalizado.includes(palabra)
            );
        });
    };

    const lista = filterBusqueda(encuestas, busqueda);

    /*=========== Actualizar ==============================*/

    const cargarEncuesta = (encuesta) => {
        setEncuesta(encuesta);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            if (!encuesta.Titulo || !encuesta.Descripcion) {
                alertWarning("Por favor, ingrese todos los campos.");
                return;
            }
            setLoading(true);
            const resultado = await updateEncuesta(encuesta.id, encuesta);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await consultarEncuestas();
            } else {
                alertWarning("No se pudo actualizar la encuesta");
            }
        } catch (error) {
            console.log("Encuesta", error.message);
            alertError("Actualizar encuesta: " + error.message);
        }
    }

    /*=========== Eliminar ==============================*/

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta encuesta?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteEncuesta(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await consultarEncuestas();
                    } else {
                        alertWarning("No se pudo eliminar la encuesta");
                    }
                }
            });

        } catch (error) {
            console.log("Encuesta", error.message);
            alertError("Eliminar encuesta: " + error.message);
        }
    }

    /*=========== Resultados ==============================*/

    const getRespuestasEncuesta = async (id) => {
        setLoading(true);
        try {
            const data = await getEncuesta(id);
            setResultadoEncuesta(data);
        } catch (error) {
            alertError("Consultar encuesta: " + error.message);
        }
        setLoading(false);
    }

    return {
        loading,
        titulo,
        lista,
        busqueda,
        openModal,
        encuesta,
        tituloModal,
        resultadoEncuesta,
        handleBusqueda,
        toggleModal,
        handleChange,
        handleSubmit,
        cargarEncuesta,
        handleUpdate,
        handleDelete,
        getRespuestasEncuesta
    }
}

export default useEncuestas