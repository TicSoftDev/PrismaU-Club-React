import React from 'react';
import Swal from 'sweetalert2';
import { createPregunta, deletePregunta, getPreguntas, updatePregunta } from '../services/PreguntasService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function usePreguntasEncuesta(id) {

    const titulo = 'Preguntas';
    const [openModal, setOpenModal] = React.useState(false);
    const [busqueda, setBusqueda] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [preguntas, setPreguntas] = React.useState([]);
    const [pregunta, setPregunta] = React.useState({
        encuesta_id: id,
        Pregunta: ''
    });
    const tituloModal = pregunta.id ? 'Actualizar pregunta' : 'Crear pregunta';

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setPregunta({
            encuesta_id: id,
            Pregunta: ''
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
        setPregunta({
            ...pregunta,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pregunta.Pregunta) {
            alertWarning("Por favor, ingrese todos los campos.");
            return;
        }
        setLoading(true);
        try {
            const data = await createPregunta(pregunta);
            if (data.status) {
                toggleModal();
                await consultarPreguntas();
                alertSucces("Creado correctamente");
            } else {
                alertWarning("No se pudo crear la pregunta");
            }
        } catch (error) {
            console.log("Encuesta", error.message);
            alertError("Crear pregunta: " + error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==============================*/

    const consultarPreguntas = async () => {
        setLoading(true);
        try {
            const data = await getPreguntas(id);
            setPreguntas(data);
        } catch (error) {
            console.log("preguntas", error.message);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        consultarPreguntas();
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
            const preguntaNormalizada = normalizeText(dato.Pregunta);
            return palabrasBusqueda.every(palabra =>
                preguntaNormalizada.includes(palabra)
            );
        });
    };

    const lista = filterBusqueda(preguntas, busqueda);

    /*=========== Actualizar ==============================*/

    const cargarPregunta = (pregunta) => {
        setPregunta(pregunta);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            if (!pregunta.Pregunta) {
                alertWarning("Por favor, ingrese todos los campos.");
                return;
            }
            setLoading(true);
            const resultado = await updatePregunta(pregunta.id, pregunta);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await consultarPreguntas();
            } else {
                alertWarning("No se pudo actualizar la pregunta");
            }
        } catch (error) {
            console.log("Pregunta", error.message);
            alertError("Actualizar pregunta: " + error.message);
        }
    }

    /*=========== Eliminar ==============================*/

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta pregunta?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deletePregunta(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await consultarPreguntas();
                    } else {
                        alertWarning("No se pudo eliminar la pregunta");
                    }
                }
            });

        } catch (error) {
            console.log("Pregunta", error.message);
            alertError("Eliminar pregunta: " + error.message);
        }
    }

    return {
        loading,
        titulo,
        lista,
        busqueda,
        openModal,
        pregunta,
        tituloModal,
        handleBusqueda,
        toggleModal,
        handleChange,
        handleSubmit,
        cargarPregunta,
        handleUpdate,
        handleDelete
    }
}

export default usePreguntasEncuesta