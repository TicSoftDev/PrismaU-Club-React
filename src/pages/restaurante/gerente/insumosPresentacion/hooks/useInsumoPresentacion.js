import { useState } from 'react';
import useModal from '../../../../../hooks/useModal';
import { useAppLocation } from '../../../../../hooks/useStore';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryInsumoPresentacion from '../api/apiQueryInsumoPresentacion';

export default function useInsumoPresentacion() {

    const insumo = useAppLocation()?.state?.insumo || {};

    const { openModal, toggleModal } = useModal();

    const { insumoPresentacions, isCreating, isLoading, isUpdating, createInsumoPresentacionMutation,
        updateInsumoPresentacionMutation, deleteInsumoPresentacionMutation } = apiQueryInsumoPresentacion(insumo?.id);

    const [insumoPresentacion, setInsumoPresentacion] = useState(getInitialInsumoPresentacion());

    //============ RECARGAR ==================================================

    function getInitialInsumoPresentacion() {
        return {
            nombre: '',
            stock: 0,
            insumo_id: insumo?.id,
        }
    }

    function recargar() {
        setInsumoPresentacion(getInitialInsumoPresentacion());
    }

    //============ CREAR ======================================================

    const abrirModal = () => {
        toggleModal("CrearEditar");
        recargar();
    }

    const handleChange = ({ target }) => {
        setInsumoPresentacion(prev => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = () => {
        createInsumoPresentacionMutation(insumoPresentacion, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    abrirModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { console.log(error); alertError(`Error al crear la insumoPresentacion: ${error.message}`); },
        });
    };

    //============ ACTUALIZAR ======================================================

    const cargarInsumoPresentacion = (insumoPresentacion) => {
        toggleModal("CrearEditar");
        setInsumoPresentacion(insumoPresentacion);
    }

    const handleUpdate = () => {
        updateInsumoPresentacionMutation(insumoPresentacion, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar la insumoPresentacion: ${error.message}`); },
        });
    };

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar este insumo?', 'Si, eliminar')) {
            deleteInsumoPresentacionMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar la insumoPresentacion: ${error.message}`); },
            })
        }
    }

    return {
        titulo: 'Presentaciones del insumo ' + insumo?.nombre,
        tituloModal: insumoPresentacion.id ? 'Actualizar insumo' : 'Crear insumo',
        insumoPresentacions,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        insumoPresentacion,
        toggleModal: abrirModal,
        cargarInsumoPresentacion,
        handleChange,
        handler: insumoPresentacion.id ? handleUpdate : handleSubmit,
        handleDelete
    }
}
