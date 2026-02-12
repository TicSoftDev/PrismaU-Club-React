import { useState } from 'react';
import { useAppNavigate } from '../../../../../hooks/useStore';
import { PrivateRoutes } from '../../../../../models/RutasModel';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryPreinventario from '../api/apiQueryPreinventario';

export default function usePreinventario() {

    const navigate = useAppNavigate();

    const { preinventarios, isCreating, isLoading, isUpdating, createPreinventarioMutation, updatePreinventarioMutation,
        deletePreinventarioMutation } = apiQueryPreinventario();

    const [openModal, setOpenModal] = useState(false);
    const [preinventario, setPreinventario] = useState(getInitialPreinventario());

    //============ RECARGAR ==================================================

    function getInitialPreinventario() {
        return {
            nombre: "",
        }
    }

    function recargar() {
        setPreinventario(getInitialPreinventario());
    }

    //============ CREAR ======================================================

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setPreinventario({
            ...preinventario,
            [target.name]: target.value,
        });
    };

    const handleSubmit = () => {
        createPreinventarioMutation(preinventario, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al crear el preinventario: ${error.message}`); },
        });
    };

    //============ ACTUALIZAR ======================================================

    const cargarPreinventario = (preinventario) => {
        setOpenModal(!openModal);
        setPreinventario(preinventario);
    }

    const handleUpdate = () => {
        updatePreinventarioMutation(preinventario, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar el preinventario: ${error.message}`); },
        });
    };

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar este preinventario?', 'Si, eliminar')) {
            deletePreinventarioMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar el preinventario: ${error.message}`); },
            })
        }
    }

    //============ NAVEGACION ===================================================

    const detalle = (preinventario) => {
        navigate(PrivateRoutes.DETALLES_PREINVENTARIO, { state: { preinventario } });
    }

    return {
        titulo: 'Preinventarios',
        tituloModal: preinventario.id ? 'Actualizar preinventario' : 'Crear preinventario',
        preinventarios,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        preinventario,
        toggleModal,
        cargarPreinventario,
        handleChange,
        handler: preinventario.id ? handleUpdate : handleSubmit,
        handleDelete,
        detalle
    }
}
