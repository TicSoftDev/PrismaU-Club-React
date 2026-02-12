import { useState } from 'react';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryMesa from '../api/apiQueryMesa';

export default function useMesa(id) {

    const { mesas, isCreating, isLoading, isUpdating,
        createMesaMutation, updateMesaMutation, deleteMesaMutation } = apiQueryMesa(id);

    const [openModal, setOpenModal] = useState(false);
    const [mesa, setMesa] = useState(getInitialMesa());

    //============ RECARGAR ==================================================

    function getInitialMesa() {
        return {
            descripcion: '',
            ubicacion_id: id,
        }
    }

    function recargar() {
        setMesa(getInitialMesa());
    }

    //============ CREAR ======================================================

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setMesa({
            ...mesa,
            [target.name]: target.value,
        });
    };

    const handleSubmit = () => {
        createMesaMutation(mesa, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al crear la mesa: ${error.message}`); },
        });
    };

    //============ ACTUALIZAR ======================================================

    const cargarMesa = (mesa) => {
        setOpenModal(!openModal);
        setMesa(mesa);
    }

    const handleUpdate = () => {
        updateMesaMutation(mesa, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar la mesa: ${error.message}`); },
        });
    };

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar esta mesa?', 'Si, eliminar')) {
            deleteMesaMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar la mesa: ${error.message}`); },
            })
        }
    }

    return {
        titulo: 'Mesas',
        tituloModal: mesa.id ? 'Actualizar mesa' : 'Crear mesa',
        mesas,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        mesa,
        toggleModal,
        cargarMesa,
        handleChange,
        handler: mesa.id ? handleUpdate : handleSubmit,
        handleDelete
    }
}
