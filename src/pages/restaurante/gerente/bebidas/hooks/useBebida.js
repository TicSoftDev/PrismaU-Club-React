import { useState } from 'react';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryBebida from '../api/apiQueryBebida';

export default function useBebida() {

    const { bebidas, isCreating, isLoading, isUpdating,
        createBebidaMutation, updateBebidaMutation, deleteBebidaMutation } = apiQueryBebida();

    const [openModal, setOpenModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [bebida, setBebida] = useState(getInitialBebida());

    //============ RECARGAR ==================================================

    function getInitialBebida() {
        return {
            bebida: '',
            imagen: '',
            precio: '',
            stock: '',
            cantidad: '',
            ubicacion_id: '',
            estado: 1
        }
    }

    function recargar() {
        setBebida(getInitialBebida());
    }

    //============ CREAR ======================================================

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setBebida({
            ...bebida,
            [target.name]: target.value,
        });
    };

    const handleChangeFile = ({ target }) => {
        const file = target.files[0];
        setBebida({ ...bebida, imagen: file })
    }

    const handleSubmit = () => {
        const data = new FormData();
        data.append("bebida", bebida.bebida);
        data.append("imagen", bebida.imagen);
        data.append("precio", bebida.precio);
        data.append("stock", bebida.stock);
        data.append("cantidad", bebida.cantidad);
        data.append("ubicacion_id", bebida.ubicacion_id);
        data.append("estado", bebida.estado);

        createBebidaMutation(data, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => {console.log(error); alertError(`Error al crear la bebida: ${error.message}`); },
        });
    };

    //============ BUSQUEDA ======================================================

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterBebidas = (listado, busqueda) => {
        if (!busqueda) return listado;

        const nombre = normalizeText(busqueda);

        return listado.filter((dato) => {
            return normalizeText(dato.bebida).includes(nombre)
        })

    };

    const lista = filterBebidas(bebidas, busqueda);

    //============ ACTUALIZAR ======================================================

    const cargarBebida = (bebida) => {
        setOpenModal(!openModal);
        setBebida(bebida);
    }

    const handleUpdate = () => {
        const data = new FormData();
        data.append("bebida", bebida.bebida);
        data.append("precio", bebida.precio);
        data.append("stock", bebida.stock);
        data.append("cantidad", bebida.cantidad);
        data.append("ubicacion_id", bebida.ubicacion_id);
        data.append("estado", bebida.estado);
        if (bebida.imagen) data.append("imagen", bebida.imagen);

        updateBebidaMutation({ id: bebida.id, data }, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar la bebida: ${error.message}`); },
        });
    };

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar esta bebida?', 'Si, eliminar')) {
            deleteBebidaMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar la bebida: ${error.message}`); },
            })
        }
    }

    return {
        titulo: 'Bebidas',
        tituloModal: bebida.id ? 'Actualizar bebida' : 'Crear bebida',
        lista,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        bebida,
        busqueda,
        toggleModal,
        cargarBebida,
        handleChange,
        handleChangeFile,
        handleBusqueda,
        handler: bebida.id ? handleUpdate : handleSubmit,
        handleDelete
    }
}
