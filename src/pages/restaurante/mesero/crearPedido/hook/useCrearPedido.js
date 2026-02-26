import { useEffect, useState } from "react";
import { useAppNavigate } from "../../../../../hooks/useStore";
import { fechaHoy, normalizeText } from "../../../../../models/FormateadorModel";
import { PrivateRoutes } from "../../../../../models/RutasModel";
import { alertError, alertSucces, alertWarning } from "../../../../../utilities/alerts/Alertas";
import apiQueryDetalleInventario from "../../../gerente/detalleInventarios/api/apiQueryDetalleInventario";
import apiQueryMesa from "../../../gerente/mesas/api/apiQueryMesa";
import apiQueryUbicacion from "../../../gerente/ubicaciones/api/apiQueryUbicacion";
import apiQueryCrearPedido from "../api/apiQueryCrearPedido";
import apiQueryProducto from "../../../gerente/productos/api/apiQueryProducto";

export default function useCrearPedido() {

    const navigate = useAppNavigate();

    const { data: ubicaciones, isLoading: loadingUbicaciones } = apiQueryUbicacion();
    const { socios, loadingSocios, isCreating, getPedidoMesaQuery, createPedidoMutation } = apiQueryCrearPedido();
    const { productosDisponibles: productos, isLoadingDisponibles: loadingProductos } = apiQueryProducto();

    const [ubicacion, setUbicacion] = useState({});
    const [pedido, setPedido] = useState(getInitialPedido());
    const [openModal, setOpenModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('Todos');
    const [openModalObs, setOpenModalObs] = useState(false);
    const [itemSeleccionado, setItemSeleccionado] = useState({});
    const [observaciones, setObservaciones] = useState('');

    const { mesas, isLoading: loadingMesas } = apiQueryMesa(ubicacion?.id);

    //------------------ INICIALIZACION ---------------------

    function getInitialPedido() {
        return {
            user_id: null,
            mesa_id: null,
            total: 0,
            pedido_detalle: [],
        };
    }

    //------------------ UBICACION --------------------------

    const selectLocation = (ubicacion) => {
        setUbicacion(ubicacion);
    }

    //------------------ INICIAR PEDIDO ----------------------

    const toggleModal = () => setOpenModal(prev => !prev);

    const iniciarPedido = (mesa_id) => {
        setPedido((prev) => ({ ...getInitialPedido(), mesa_id }));
        setOpenModal(prev => !prev);
    }

    const mesaId = pedido?.mesa_id;
    const pedidoQuery = getPedidoMesaQuery(pedido?.mesa_id);
    const pedidoServer = pedidoQuery.data;
    const pedidoCargado = !!pedido?.mesa_id && (pedidoQuery?.isLoading || pedidoQuery?.isFetching);
    const hayPedido = !!pedidoServer?.id;

    useEffect(() => {
        if (!mesaId) return;
        if (pedidoQuery.isLoading || pedidoQuery.isFetching) return;
        if (pedidoServer?.id) {
            setPedido(prev => ({
                ...prev,
                ...pedidoServer,
                mesa_id: mesaId,
                pedido_detalle: mapFromApi(pedidoServer.pedido_detalle || [])
            }));
            return;
        }
        if (pedidoQuery.isFetched && !pedidoServer) {
            setPedido(prev => ({
                ...prev,
                user_id: null,
                inventario_id: null,
                mesa_id: mesaId,
                total: 0,
                pedido_detalle: []
            }));
        }
    }, [mesaId, pedidoServer?.id, pedidoQuery.isLoading, pedidoQuery.isFetching, pedidoQuery.isFetched]);

    //------------------ CREAR PEDIDO ---------------------

    const handleChangeSelect = (name, value) => {
        setPedido(prev => ({ ...prev, [name]: value }));
    }

    const agregarItem = (producto) => {
        setItemSeleccionado({ producto });
        setObservaciones('');
        setOpenModalObs(true);
    }

    const handleSubmit = () => {
        createPedidoMutation(pedido, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    navigate(PrivateRoutes.PEDIDOS_ABIERTOS);
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { console.log(error); alertError(`Error al crear el pedido: ${error.message}`); },
        });
    }

    //------------------ OBSERVACIONES ----------------------

    const toggleModalObs = () => setOpenModalObs(prev => !prev);

    const handleChangeObs = (e) => setObservaciones(e.target.value);

    const guardarObservacion = () => {
        const sel = itemSeleccionado || {};
        const obs = (observaciones || '').trim();

        if (sel.mode !== 'edit') {
            const { producto } = sel;
            if (!producto) return;

            const id = producto.id;
            const nombre = producto.nombre;
            const tipo = producto.tipo;
            const insumoPresentacionId = tipo === 'COMIDA' ? producto.insumo_presentacion.id : null;
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

    const editarObservacion = (producto) => {
        setItemSeleccionado({ mode: 'edit', producto });
        setObservaciones(producto.observaciones || '');
        setOpenModalObs(true);
    };

    //------------------ CANTIDADES ----------------------------

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

    useEffect(() => {
        setPedido(prev => {
            const total = (prev.pedido_detalle || []).reduce((acc, item) => acc + Number(item.subtotal || 0), 0);
            if (prev.total === total) return prev;
            return { ...prev, total };
        });
    }, [pedido?.pedido_detalle]);

    //------------------ BUSQUEDA PRODUCTOS --------------------

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

    //------------------ HELPERS --------------------------------

    const makeKey = (type, id, obs = '') => `${String(type).toLowerCase()}:${id}:${(obs || '').trim().toLowerCase()}`;

    const mapFromApi = (rows = []) =>
        rows.map(r => {
            const obs = (r.observaciones || '').trim();
            const type = String(r.producto.tipo || '').toLowerCase();
            const id = r.producto.id;

            return { ...r, key: makeKey(type, id, obs), };
        });

    const safeNum = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    return {
        ubicaciones,
        loadingUbicaciones,
        ubicacion,
        mesas,
        loadingMesas,
        tituloModal: "Detalle del Pedido",
        openModal,
        pedido,
        pedidoCargado,
        hayPedido,
        socios,
        loadingSocios,
        listaProductos,
        loadingProductos,
        openModalObs,
        observaciones,
        tituloModalObs: "Observaciones del producto",
        busqueda,
        tipoFiltro,
        loading: isCreating,
        selectLocation,
        iniciarPedido,
        toggleModal,
        handleChangeSelect,
        handleChangeBusqueda,
        handleChangeFiltro,
        agregarItem,
        toggleModalObs,
        handleChangeObs,
        guardarObservacion,
        editarObservacion,
        incrementar,
        disminuir,
        eliminar,
        handleSubmit
    }
}
