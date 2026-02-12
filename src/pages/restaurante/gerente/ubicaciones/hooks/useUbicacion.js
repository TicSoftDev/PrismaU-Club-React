import { useState } from 'react';
import { useAppNavigate } from '../../../../../hooks/useStore';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryUbicacion from '../api/apiQueryUbicacion';
import { PrivateRoutes } from '../../../../../models/RutasModel';

export default function useUbicacion() {

    const navigate = useAppNavigate();

    const { ubicaciones, isCreating, isLoading, isUpdating,
        createUbicacionMutation, updateUbicacionMutation, deleteUbicacionMutation } = apiQueryUbicacion();

    const [openModal, setOpenModal] = useState(false);
    const [ubicacion, setUbicacion] = useState(getInitialUbicacion());

    //============ RECARGAR ==================================================

    function getInitialUbicacion() {
        return {
            ubicacion: "",
        }
    }

    function recargar() {
        setUbicacion(getInitialUbicacion());
    }

    //============ CREAR ======================================================

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setUbicacion({
            ...ubicacion,
            [target.name]: target.value,
        });
    };

    const handleSubmit = () => {
        createUbicacionMutation(ubicacion, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al crear el ubicacion: ${error.message}`); },
        });
    };

    //============ ACTUALIZAR ======================================================

    const cargarUbicacion = (ubicacion) => {
        setOpenModal(!openModal);
        setUbicacion(ubicacion);
    }

    const handleUpdate = () => {
        updateUbicacionMutation(ubicacion, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar el ubicacion: ${error.message}`); },
        });
    };

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar el ubicacion?', 'Si, eliminar')) {
            deleteUbicacionMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar el ubicacion: ${error.message}`); },
            })
        }
    }

    //============ MESAS ======================================================

    const goToMesas = (ubicacion) => {
        navigate(PrivateRoutes.MESA, { state: { ubicacion } });
    }

    return {
        titulo: 'Ubicaciones',
        tituloModal: ubicacion.id ? 'Actualizar ubicacion' : 'Crear ubicacion',
        ubicaciones,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        ubicacion,
        toggleModal,
        cargarUbicacion,
        handleChange,
        handler: ubicacion.id ? handleUpdate : handleSubmit,
        handleDelete,
        goToMesas
    }
}
