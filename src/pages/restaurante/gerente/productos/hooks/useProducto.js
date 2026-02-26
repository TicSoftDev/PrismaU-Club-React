import { useState } from 'react';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryProducto from '../api/apiQueryProducto';

export default function useProducto() {

    const { productos, isCreating, isLoading, isUpdating, productosDisponibles, isLoadingDisponibles,
        createProductoMutation, updateProductoMutation, deleteProductoMutation } = apiQueryProducto();

    const [openModal, setOpenModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('Todos');
    const [producto, setProducto] = useState(getInitialProducto());

    //============ RECARGAR ==================================================

    function getInitialProducto() {
        return {
            nombre: '',
            imagen: null,
            descripcion: '',
            tipo: '',
            categoria: '',
            precio: '',
            cocina_id: null,
            insumo_presentacion_id: null
        }
    }

    function recargar() {
        setProducto(getInitialProducto());
    }

    //============ CREAR ======================================================

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setProducto(prev => {
            const next = { ...prev, [name]: value };

            if (name === "tipo" && value === "BEBIDA") {
                next.categoria = "Bebida";
                next.cocina_id = null;
                next.insumo_presentacion_id = null;
            }

            if (name === "tipo" && value === "COMIDA") {
                next.categoria = "";
            }

            return next;
        });
    };

    const handleChangeImage = ({ target }) => {
        const file = target.files[0];
        setProducto({ ...producto, imagen: file })
    }

    const handleSubmit = () => {
        const data = new FormData();
        data.append("nombre", producto.nombre);
        data.append("imagen", producto.imagen);
        data.append("tipo", producto.tipo);
        data.append("categoria", producto.categoria);
        data.append("precio", producto.precio);
        if (producto.tipo === "COMIDA") {
            data.append("cocina_id", producto.cocina_id);
            data.append("insumo_presentacion_id", producto.insumo_presentacion_id);
            data.append("descripcion", producto.descripcion);
        }
        createProductoMutation(data, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { console.log(error); alertError(`Error al crear la producto: ${error.message}`); },
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

    const filterProductos = (listado = [], busqueda, tipo) => {
        if (!busqueda && tipo === 'Todos') return listado;

        const busquedaNormalizada = normalizeText(busqueda).split(' ').filter(Boolean);

        return listado?.filter((dato) => {
            const nombreNormalizado = normalizeText(dato.nombre);
            const categoriaNormalizada = normalizeText(dato.categoria);

            const cumpleEstado = tipo === 'Todos' || dato.categoria?.toString() === tipo;

            const cumpleBusqueda = busquedaNormalizada.every(palabra =>
                nombreNormalizado.includes(palabra) ||
                categoriaNormalizada.includes(palabra)
            );

            return cumpleBusqueda && cumpleEstado;
        });
    };

    const lista = filterProductos(productos, busqueda, tipoFiltro);

    //============ ACTUALIZAR ======================================================

    const cargarProducto = (producto) => {
        setOpenModal(!openModal);
        setProducto(producto);
    }

    const handleUpdate = () => {
        const formdata = new FormData();
        formdata.append("nombre", producto.nombre);
        formdata.append("tipo", producto.tipo);
        formdata.append("categoria", producto.categoria);
        formdata.append("precio", producto.precio);
        if (producto.tipo === "COMIDA") {
            formdata.append("descripcion", producto.descripcion);
            formdata.append("cocina_id", producto.cocina_id);
            formdata.append("insumo_presentacion_id", producto.insumo_presentacion_id);
        }
        if (producto.imagen) formdata.append("imagen", producto.imagen);

        updateProductoMutation({ id: producto.id, data: formdata }, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al actualizar la producto: ${error.message}`) },
        });
    };

    //============ ELIMINAR ======================================================

    const handleDelete = async (id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar este producto?', 'Si, eliminar')) {
            deleteProductoMutation(id, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (error) => { alertError(`Error al eliminar la producto: ${error.message}`); },
            })
        }
    }

    return {
        titulo: 'Productos',
        tituloModal: producto.id ? 'Actualizar producto' : 'Crear producto',
        lista,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        producto,
        busqueda,
        tipoFiltro,
        isLoadingDisponibles,
        // listaDisponibles,
        toggleModal,
        cargarProducto,
        handleChange,
        handleChangeImage,
        handleBusqueda,
        handleFiltro,
        handler: producto.id ? handleUpdate : handleSubmit,
        handleDelete
    }
}
