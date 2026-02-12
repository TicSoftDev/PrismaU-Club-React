import { useState } from 'react';
import { useAppNavigate } from '../../../../../hooks/useStore';
import { PrivateRoutes } from '../../../../../models/RutasModel';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryInventario from '../api/apiQueryInventario';

export default function useInventario() {

    const navigate = useAppNavigate();

    const { inventarios, isCreating, isLoading, abrirInventarioMutation } = apiQueryInventario();

    const [openModal, setOpenModal] = useState(false);
    const [inventario, setInventario] = useState(getInitialInventario());

    //============ RECARGAR ==================================================

    function getInitialInventario() {
        return {
            preinventario_id: null,
            fecha: "",
        }
    }

    function recargar() {
        setInventario(getInitialInventario());
    }

    //============ CREAR ======================================================

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setInventario({ ...inventario, [target.name]: target.value, });
    };

    const handleSubmit = () => {
        abrirInventarioMutation(inventario, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al abrir el inventario: ${error.message}`); },
        });
    };

    //============ NAVEGACION ===================================================

    const detalle = (inventario) => {
        navigate(PrivateRoutes.DETALLES_INVENTARIO, { state: { inventario } });
    }

    return {
        titulo: 'Inventarios',
        tituloModal: inventario.id ? 'Actualizar inventario' : 'Crear inventario',
        inventarios,
        isLoading,
        loading: isCreating,
        openModal,
        inventario,
        toggleModal,
        handleChange,
        handleSubmit,
        detalle
    }
}
