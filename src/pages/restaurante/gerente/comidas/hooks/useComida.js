import { useState } from 'react';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryComida from '../api/apiQueryComida';

export default function useComida() {

    const { comidas, isCreating, isLoading, isUpdating, comidasDisponibles, isLoadingDisponibles,
        createComidaMutation, updateComidaMutation, deleteComidaMutation } = apiQueryComida();

    const [openModal, setOpenModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('Todos');
    const [comida, setComida] = useState(getInitialComida());

    //============ RECARGAR ==================================================

    function getInitialComida() {
        return {
            comida: '',
            imagen: null,
            descripcion: '',
            ingredientes: '',
            precio: '',
            tipo: '',
            cantidad: '',
            cocina_id: '',
            estado: 1
        }
    }

    function recargar() {
        setComida(getInitialComida());
    }

    //============ CREAR ======================================================

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setComida({
            ...comida,
            [target.name]: target.value,
        });
    };

    const handleChangeImage = ({ target }) => {
        const file = target.files[0];
        setComida({ ...comida, imagen: file })
    }

    const handleSubmit = () => {
        const data = new FormData();
        data.append("comida", comida.comida);
        data.append("ingredientes", comida.ingredientes);
        data.append("tipo", comida.tipo);
        data.append("precio", comida.precio);
        data.append("cantidad", comida.cantidad);
        data.append("cocina_id", comida.cocina_id);
        data.append("estado", comida.estado);
        data.append("imagen", comida.imagen);

        createComidaMutation(data, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { console.log(error); alertError(`Error al crear la comida: ${error.message}`); },
        });
    };

    //============ BUSQUEDA ======================================================

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const handleFiltro = (input) => {
        const value = input?.target?.value || input;
        setTipoFiltro(value);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterComidas = (listado, busqueda, tipo) => {
        if (!busqueda && tipo === 'Todos') return listado;

        const nombre = normalizeText(busqueda);

        return listado.filter((dato) => {
            const cumpleEstado = tipo === 'Todos' || dato.tipo.toString() === tipo;
            const cumpleBusqueda = normalizeText(dato.comida).includes(nombre)

            return cumpleBusqueda && cumpleEstado;
        })

    };

    const lista = filterComidas(comidas, busqueda, tipoFiltro);

    const listaDisponibles = filterComidas(comidasDisponibles, busqueda, tipoFiltro);

    //============ ACTUALIZAR ======================================================

    const cargarComida = (comida) => {
        setOpenModal(!openModal);
        setComida(comida);
    }

    const handleUpdate = () => {
        const formdata = new FormData();
        formdata.append("comida", comida.comida);
        formdata.append("ingredientes", comida.ingredientes);
        formdata.append("tipo", comida.tipo);
        formdata.append("precio", comida.precio);
        formdata.append("cantidad", comida.cantidad);
        formdata.append("cocina_id", comida.cocina_id);
        formdata.append("estado", comida.estado);
        if (comida.imagen) formdata.append("imagen", comida.imagen);

        updateComidaMutation({ id: comida.id, data: formdata }, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar la comida: ${error.message}`); console.log(error) },
        });
    };

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar esta comida?', 'Si, eliminar')) {
            deleteComidaMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar la comida: ${error.message}`); },
            })
        }
    }

    return {
        titulo: 'Comidas',
        tituloModal: comida.id ? 'Actualizar comida' : 'Crear comida',
        lista,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        comida,
        busqueda,
        tipoFiltro,
        isLoadingDisponibles,
        listaDisponibles,
        toggleModal,
        cargarComida,
        handleChange,
        handleChangeImage,
        handleBusqueda,
        handleFiltro,
        handler: comida.id ? handleUpdate : handleSubmit,
        handleDelete
    }
}
