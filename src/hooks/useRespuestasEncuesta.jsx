import React from 'react';
import Swal from 'sweetalert2';
import { createEncuesta, deleteEncuesta, getEncuestas, updateEncuesta } from '../services/EncuestasService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';
import { createRespuesta, deleteRespuesta, getRespuestas, updateRespuesta } from '../services/RespuestasService';

function useRespuestasEncuesta(id) {

    const titulo = 'Respuestas';
    const [openModal, setOpenModal] = React.useState(false);
    const [busqueda, setBusqueda] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [respuestas, setRespuestas] = React.useState([]);
    const [respuesta, setRespuesta] = React.useState({
        Respuesta: '',
        pregunta_id: id
    });
    const tituloModal = respuesta.id ? 'Actualizar respuesta' : 'Crear respuesta';

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setRespuesta({
            Respuesta: '',
            pregunta_id: id
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
        setRespuesta({
            ...respuesta,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!respuesta.Respuesta) {
            alertWarning("Por favor, ingrese todos los campos.");
            return;
        }
        setLoading(true);
        try {
            const data = await createRespuesta(respuesta);
            if (data.status) {
                toggleModal();
                await consultarRespuestas();
                alertSucces("Creado correctamente");
            } else {
                alertWarning("No se pudo crear la respuesta");
            }
        } catch (error) {
            console.log("Respuesta", error.message);
            alertError("Crear respuesta: " + error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==============================*/

    const consultarRespuestas = async () => {
        setLoading(true);
        try {
            const data = await getRespuestas(id);
            setRespuestas(data);
        } catch (error) {
            console.log("Reservas", error.message);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        consultarRespuestas();
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
            const preguntaNormalizada = normalizeText(dato.Respuesta);
            return palabrasBusqueda.every(palabra =>
                preguntaNormalizada.includes(palabra)
            );
        });
    };

    const lista = filterBusqueda(respuestas, busqueda);

    /*=========== Actualizar ==============================*/

    const cargarRespuesta = (respuesta) => {
        setRespuesta(respuesta);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            if (!respuesta.Respuesta) {
                alertWarning("Por favor, ingrese todos los campos.");
                return;
            }
            setLoading(true);
            const resultado = await updateRespuesta(respuesta.id, respuesta);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await consultarRespuestas();
            } else {
                alertWarning("No se pudo actualizar la respuesta");
            }
        } catch (error) {
            console.log("Respuesta", error.message);
            alertError("Actualizar respuesta: " + error.message);
        }
    }

    /*=========== Eliminar ==============================*/

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta respuesta?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteRespuesta(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await consultarRespuestas();
                    } else {
                        alertWarning("No se pudo eliminar la respuesta");
                    }
                }
            });

        } catch (error) {
            console.log("Respuesta", error.message);
            alertError("Eliminar respuesta: " + error.message);
        }
    }

    return {
        loading,
        titulo,
        lista,
        busqueda,
        openModal,
        respuesta,
        tituloModal,
        handleBusqueda,
        toggleModal,
        handleChange,
        handleSubmit,
        cargarRespuesta,
        handleUpdate,
        handleDelete
    }
}

export default useRespuestasEncuesta