import { useState } from 'react';
import { useAppLocation } from '../../../../../hooks/useStore';
import { normalizeText } from '../../../../../models/FormateadorModel';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryProducto from '../../../gerente/productos/api/apiQueryProducto';
import apiQueryDetallePedido from '../api/apiQueryDetallePedido';

export default function useDetallePedido() {

    const ped = useAppLocation()?.state?.pedido;

    const { isPending, loadingPlato, loadingPedido, isCreating, getPedidoQuery, actualizarDetalleMutation,
        createDetalleMutation, cambiarEstadoPlatoMutation, cambiarEstadoMutation, eliminarDetalleMutation } = apiQueryDetallePedido();

    const { productosDisponibles: productos, isLoadingDisponibles: loadingProductos } = apiQueryProducto();

    const [openModal, setOpenModal] = useState(false);
    const [openModalAgregar, setOpenModalAgregar] = useState(false);
    const [item, setItem] = useState({});
    const [pedido, setPedido] = useState(getInitialPedido());
    const [busqueda, setBusqueda] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('Todos');
    const [openModalObs, setOpenModalObs] = useState(false);
    const [itemSeleccionado, setItemSeleccionado] = useState({});
    const [observaciones, setObservaciones] = useState('');

    //------------------ Recargar ------------------------------------

    function getInitialPedido() {
        return {
            id: null,
            pedido_detalle: [],
        };
    }

    const recargar = () => {
        setPedido(getInitialPedido());
        setOpenModal(false);
        setOpenModalAgregar(false);
        setOpenModalObs(false);
        setItemSeleccionado({});
        setObservaciones('');
        setItem({});
        setBusqueda('');
        setTipoFiltro('Todos');
    }

    //------------------ Obtener pedido ------------------------------

    const { data, isLoading } = getPedidoQuery(ped?.mesa_id);

    const usuario = data?.usuario ?? {};
    const detalle = data?.pedido_detalle ?? [];
    const itemsCount = detalle.reduce((acc, d) => acc + (Number(d?.cantidad) || 0), 0);
    const subtotalCalc = detalle.reduce((acc, d) => acc + (Number(d?.precio) || 0) * (Number(d?.cantidad) || 0), 0);

    const countsByState = detalle.reduce((acc, d) => {
        const e = d?.estado || "N/A";
        acc[e] = (acc[e] || 0) + 1;
        return acc;
    }, {});

    //------------------ Actualizar Estado ----------------------------

    const cambiarEstadoPlato = async (id, estado) => {
        if (await alertConfirm('¿Estás seguro de cambiar el estado de este plato?', 'Sí, cambiar')) {
            cambiarEstadoPlatoMutation({ id, estado }, {
                onSuccess: (data) => {
                    alertSucces(data.message);
                },
                onError: (error) => { alertError(`Error: ${error.message}`); },
            });
        }
    };

    const cambiarEstadoPedido = async (id, estado) => {
        if (await alertConfirm('¿Estás seguro de cambiar el estado de este pedido?', 'Sí, cambiar')) {
            cambiarEstadoMutation({ id, estado }, {
                onSuccess: (data) => {
                    alertSucces(data.message);
                },
                onError: (error) => { alertError(`Error: ${error.message}`); },
            });
        }
    };

    //------------------ Agregar detalle --------------------------------

    const agregar = (id) => {
        setPedido(prev => ({ ...prev, id }));
        setOpenModalAgregar(true);
    }

    const toggleModalAgregar = () => {
        setOpenModalAgregar(prev => !prev);
        recargar();
    };

    const handleChangeBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const handleChangeFiltro = (input) => {
        const value = input?.target?.value || input;
        setTipoFiltro(value);
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

    const listaProductos = filterProductos(productos, busqueda, tipoFiltro);

    const agregarItem = (producto) => {
        setItemSeleccionado({ producto });
        setObservaciones('');
        setOpenModalObs(true);
    }

    const guardarObservacion = () => {
        const sel = itemSeleccionado || {};
        const obs = (observaciones || '').trim();

        if (sel.mode !== 'edit') {
            const { producto } = sel;
            if (!producto) return;
            const insumoPresentacionId = producto.insumo_presentacion.id;

            const id = producto.id;
            const nombre = producto.nombre;
            const tipo = producto.tipo;
            const key = makeKey(tipo, id, obs);
            const precio = safeNum(producto.precio, 0);

            setPedido(prev => {
                const idx = prev.pedido_detalle.findIndex(x => x.key === key);

                if (idx !== -1) {
                    const copy = [...prev.pedido_detalle];
                    const row = copy[idx];

                    const cantidad = safeNum(row.cantidad, 0) + 1;
                    const price = safeNum(row.precio_unitario, precio);

                    copy[idx] = {
                        ...row,
                        insumo_presentacion_id: row.insumo_presentacion_id ?? insumoPresentacionId,
                        cantidad,
                        subtotal: cantidad * price,
                        observaciones: obs,
                        producto: { ...(row.producto || {}), id, nombre, tipo },
                    };

                    return { ...prev, pedido_detalle: copy };
                }

                const nuevo = {
                    id: null,
                    key,
                    producto_id: id,
                    insumo_presentacion_id: insumoPresentacionId,
                    cantidad: 1,
                    precio_unitario: precio,
                    subtotal: precio,
                    observaciones: obs,
                    producto: { id, nombre, tipo },
                };

                return { ...prev, pedido_detalle: [...prev.pedido_detalle, nuevo] };
            });

            setOpenModalObs(false);
            setItemSeleccionado({});
            setObservaciones('');
            return;
        }

        const row = sel.producto;
        const oldKey = row.key;
        if (!row || !oldKey) return;

        const type = String(row.producto.tipo || '').toLowerCase();
        const id = row.producto.id;

        const newKey = makeKey(type, id, obs);

        setPedido(prev => {
            const oldIdx = prev.pedido_detalle.findIndex(x => x.key === oldKey);
            if (oldIdx === -1) return prev;

            const existingIdx = prev.pedido_detalle.findIndex(x => x.key === newKey);

            const copy = [...prev.pedido_detalle];

            if (existingIdx !== -1 && existingIdx !== oldIdx) {
                const a = copy[existingIdx];
                const b = copy[oldIdx];

                const cantidad = safeNum(a.cantidad, 0) + safeNum(b.cantidad, 0);
                const price = safeNum(a.precio_unitario, 0);

                copy[existingIdx] = {
                    ...a,
                    insumo_presentacion_id: a.insumo_presentacion_id ?? b.insumo_presentacion_id,
                    cantidad,
                    subtotal: cantidad * price,
                    observaciones: obs,
                    key: newKey,
                };

                copy.splice(oldIdx, 1);

                return { ...prev, pedido_detalle: copy };
            }

            const price = safeNum(copy[oldIdx].precio_unitario, 0);
            const cantidad = safeNum(copy[oldIdx].cantidad, 0);

            copy[oldIdx] = {
                ...copy[oldIdx],
                insumo_presentacion_id: copy[oldIdx].insumo_presentacion_id,
                key: newKey,
                observaciones: obs,
                subtotal: cantidad * price,
            };

            return { ...prev, pedido_detalle: copy };
        });

        setOpenModalObs(false);
        setItemSeleccionado({});
        setObservaciones('');
    };

    const toggleModalObs = () => setOpenModalObs(prev => !prev);

    const handleChangeObs = (e) => setObservaciones(e.target.value);

     const editarObservacion = (producto) => {
        setItemSeleccionado({ mode: 'edit', producto });
        setObservaciones(producto.observaciones || '');
        setOpenModalObs(true);
    };

    const incrementar = (key) => {
        setPedido(prev => ({
            ...prev,
            pedido_detalle: prev.pedido_detalle.map(item =>
                item.key === key ? {
                    ...item,
                    cantidad: item.cantidad + 1,
                    subtotal: (item.cantidad + 1) * Number(item.precio_unitario)
                } : item
            )
        }));
    };

    const disminuir = (key) => {
        setPedido(prev => ({
            ...prev,
            pedido_detalle: prev.pedido_detalle
                .map(item =>
                    item.key === key ? {
                        ...item,
                        cantidad: item.cantidad - 1,
                        subtotal: (item.cantidad - 1) * Number(item.precio_unitario)
                    } : item
                ).filter(item => item.cantidad > 0)
        }));
    };

    const eliminar = (key) => {
        setPedido(prev => ({ ...prev, pedido_detalle: prev.pedido_detalle.filter(item => item.key !== key) }));
    };

    const handleSubmit = () => {
        createDetalleMutation(pedido, {
            onSuccess: (data) => { 
                if (data.status) {
                    alertSucces(data.message);
                    recargar();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al crear el pedido: ${error.message}`); },
        });
    }

    //------------------ Actualizar detalle -----------------------------

    const cargarDetalle = (detalle) => {
        setItem(detalle);
        setOpenModal(true);
    }

    const toggleModal = () => setOpenModal(!openModal);

    const handleChange = ({ target }) => {
        setItem(prev => ({ ...prev, [target.name]: target.value }));
    }

    const handleUpdate = () => {
        actualizarDetalleMutation(item, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    recargar();
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (err) => { alertError(err); }
        });
    }

    //------------------ Eliminar detalle -------------------------------

    const handleDelete = async (id, presentacion_id) => { 
        if (await alertConfirm('¿Seguro que quiere eliminar este detalle?', 'Si, eliminar')) {
            eliminarDetalleMutation({ id, presentacion_id }, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                    } else {
                        data.errors.forEach((err) => alertWarning(err));
                    }
                },
                onError: (err) => { alertError(err); }
            });
        }
    }

    //------------------ HELPERS ----------------------------------------

    const makeKey = (type, id, obs = '') => `${String(type).toLowerCase()}:${id}:${(obs || '').trim().toLowerCase()}`;

    const safeNum = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    return {
        data,
        isLoading,
        usuario,
        detalle,
        itemsCount,
        subtotalCalc,
        countsByState,
        isPending,
        openModal,
        item,
        tituloModal: "Detalle Pedido",
        loadingPlato,
        loadingPedido,
        openModalAgregar,
        pedido,
        tituloModalAgregar: "Agregar Producto",
        busqueda,
        tipoFiltro,
        listaProductos,
        loadingProductos,
        openModalObs,
        tituloModalObs: "Observaciones",
        observaciones,
        isCreating,
        toggleModal,
        cargarDetalle,
        handleChange,
        handleUpdate,
        cambiarEstadoPlato,
        cambiarEstadoPedido,
        handleDelete,
        agregar,
        toggleModalAgregar,
        handleChangeBusqueda,
        handleChangeFiltro,
        incrementar,
        disminuir,
        eliminar,
        agregarItem,
        editarObservacion,
        handleChangeObs,
        toggleModalObs,
        guardarObservacion,
        handleSubmit
    }
}
