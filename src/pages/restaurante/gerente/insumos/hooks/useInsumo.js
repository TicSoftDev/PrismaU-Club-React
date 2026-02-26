import { useState } from 'react';
import { useDebounce } from '../../../../../hooks/useDebounce';
import useModal from '../../../../../hooks/useModal';
import { useSearchPaginate } from '../../../../../hooks/useSearchPaginate';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryInsumo from '../api/apiQueryInsumo';
import { useAppNavigate } from '../../../../../hooks/useStore';
import { PrivateRoutes } from '../../../../../models/RutasModel';

export default function useInsumo() {

    const navigate = useAppNavigate();

    const { openModal, toggleModal } = useModal();

    const { isCreating, isUpdating, createInsumoMutation, getInsumosQuery, updateInsumoMutation,
        deleteInsumoMutation } = apiQueryInsumo();

    const { page, limit, filters, handleFilterChange, limpiarFiltros, onPageChange, onRowsPerPageChange
    } = useSearchPaginate(getInitialFilters());

    const [insumo, setInsumo] = useState(getInitialInsumo());

    //============ RECARGAR ==================================================

    function getInitialInsumo() {
        return {
            nombre: '',
            unidad: '',
        }
    }

    function getInitialFilters() {
        return {
            nombre: '',
        }
    }

    function recargar() {
        limpiarFiltros();
        setInsumo(getInitialInsumo());
    }

    //============ CREAR ======================================================

    const abrirModal = () => {
        toggleModal("CrearEditar");
        recargar();
    }

    const handleChange = ({ target }) => {
        setInsumo(prev => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = () => {
        createInsumoMutation(insumo, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    abrirModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al crear el insumo: ${error.message}`); },
        });
    };

    //============ BUSQUEDA ======================================================

    const nombreDebounce = useDebounce(insumo.nombre, 500);
    const filtersDebounce = { ...filters, nombre: nombreDebounce };

    const { data, isLoading } = getInsumosQuery(page, limit, filtersDebounce);

    const insumos = data?.data || [];
    const total = data?.total || 0;

    //============ ACTUALIZAR ======================================================

    const cargarInsumo = (insumo) => {
        toggleModal("CrearEditar");
        setInsumo(insumo);
    }

    const handleUpdate = () => {
        updateInsumoMutation(insumo, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    abrirModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar el insumo: ${error.message}`); },
        });
    };

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar este insumo?', 'Si, eliminar')) {
            deleteInsumoMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar el insumo: ${error.message}`); },
            })
        }
    }

    //============ GO PRESENTACIONES =============================================

    const goToPresentations = (insumo) => {
        navigate(PrivateRoutes.INSUMOS_PRESENTACION, { state: { insumo } });
    }

    return {
        titulo: 'Insumos',
        tituloModal: insumo.id ? 'Actualizar insumo' : 'Crear insumo',
        insumos,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        insumo,
        filters,
        page,
        limit,
        total,
        handleFilterChange,
        limpiarFiltros,
        onPageChange,
        onRowsPerPageChange,
        toggleModal: abrirModal,
        cargarInsumo,
        handleChange,
        handler: insumo.id ? handleUpdate : handleSubmit,
        handleDelete,
        goToPresentations
    }
}
