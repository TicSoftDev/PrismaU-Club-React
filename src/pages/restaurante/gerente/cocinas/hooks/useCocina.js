import { useState } from 'react';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryCocina from '../api/apiQueryCocina';

export default function useCocina() {

    const { cocinas, isCreating, isLoading, isUpdating, cocineros, loading: loadingCocineros, isAsigning,
        createCocinaMutation, updateCocinaMutation, deleteCocinaMutation, asignCocineroMutation } = apiQueryCocina();

    const [openModal, setOpenModal] = useState(false);
    const [openModalCocinero, setOpenModalCocinero] = useState(false);
    const [cocina, setCocina] = useState(getInitialCocina());

    //============ RECARGAR ==================================================

    function getInitialCocina() {
        return {
            nombre: "",
            estado: true
        }
    }

    function recargar() {
        setCocina(getInitialCocina());
    }

    //============ CREAR ======================================================

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setCocina({
            ...cocina,
            [target.name]: target.value,
        });
    };

    const handleSubmit = () => {
        createCocinaMutation(cocina, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al crear la cocina: ${error.message}`); },
        });
    };

    //============ ACTUALIZAR ======================================================

    const cargarCocina = (cocina) => {
        setOpenModal(!openModal);
        setCocina(cocina);
    }

    const handleUpdate = () => {
        updateCocinaMutation(cocina, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar la cocina: ${error.message}`); },
        });
    };

    //============ COCINERO ======================================================

    const toggleModalCocinero = () => {
        setOpenModalCocinero(!openModalCocinero);
        recargar();
    }

    const asignCocinero = (user) => {
        setCocina(user);
        setOpenModalCocinero(true);
    }

    const handleAsign = () => {
        asignCocineroMutation(cocina, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModalCocinero();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al asignar el cocinero: ${error.message}`); },
        });
    }

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar esta cocina?', 'Si, eliminar')) {
            deleteCocinaMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar la cocina: ${error.message}`); },
            })
        }
    }

    return {
        titulo: 'Cocinas',
        tituloModal: cocina.id ? 'Actualizar cocina' : 'Crear cocina',
        tituloModalCocinero: 'Asignar cocinero',
        cocinas,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        cocina,
        cocineros,
        loadingCocineros,
        openModalCocinero,
        isAsigning,
        toggleModal,
        cargarCocina,
        handleChange,
        handler: cocina.id ? handleUpdate : handleSubmit,
        handleDelete,
        asignCocinero,
        toggleModalCocinero,
        handleAsign
    }
}
