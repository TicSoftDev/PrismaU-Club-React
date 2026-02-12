import { useEffect, useState } from "react";
import { useAppNavigate } from "../../../../../hooks/useStore";
import { fechaHoy, normalizeText } from "../../../../../models/FormateadorModel";
import { PrivateRoutes } from "../../../../../models/RutasModel";
import { alertError, alertSucces, alertWarning } from "../../../../../utilities/alerts/Alertas";
import apiQueryDetalleInventario from "../../../gerente/detalleInventarios/api/apiQueryDetalleInventario";
import apiQueryMesa from "../../../gerente/mesas/api/apiQueryMesa";
import apiQueryUbicacion from "../../../gerente/ubicaciones/api/apiQueryUbicacion";
import apiQueryCrearPedido from "../api/apiQueryCrearPedido";

export default function useCrearPedido() {

    const navigate = useAppNavigate();

    const { data: ubicaciones, isLoading: loadingUbicaciones } = apiQueryUbicacion();
    const { socios, loadingSocios, isCreating, getPedidoMesaQuery, createPedidoMutation } = apiQueryCrearPedido();
    const { productos, isLoading: loadingProductos } = apiQueryDetalleInventario(fechaHoy());

    const [ubicacion, setUbicacion] = useState({});
    const [pedido, setPedido] = useState(getInitialPedido());
    const [openModal, setOpenModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('');
    const [openModalObs, setOpenModalObs] = useState(false);
    const [itemSeleccionado, setItemSeleccionado] = useState({});
    const [observaciones, setObservaciones] = useState('');

    const { mesas, isLoading: loadingMesas } = apiQueryMesa(ubicacion?.id);

    //------------------ INICIALIZACION ---------------------

    function getInitialPedido() {
        return {
            inventario_id: null,
            user_id: null,
            mesa_id: null,
            total: 0,
            detalle_pedido: [],
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
                detalle_pedido: mapFromApi(pedidoServer.detalle_pedido || [])
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
                detalle_pedido: []
            }));
        }
    }, [mesaId, pedidoServer?.id, pedidoQuery.isLoading, pedidoQuery.isFetching, pedidoQuery.isFetched]);

    const handleChangeSelect = (name, value) => {
        setPedido(prev => ({ ...prev, [name]: value }));
    }

    const agregarItem = (producto, tipo, idDetalle, inventario_id) => {
        setPedido(prev => ({ ...prev, inventario_id }));
        setItemSeleccionado({ producto, tipo, idDetalle });
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
        const inventarioItemId = sel.idDetalle;

        if (sel.mode !== 'edit') {
            const { producto, tipo } = sel;
            if (!producto || !tipo) return;

            const id = producto.id;
            const key = makeKey(tipo, id, obs);
            const precio = safeNum(producto.precio, 0);
            const nombre = tipo === 'bebida' ? (producto.bebida ?? '') : (producto.comida ?? '');

            setPedido(prev => {
                const idx = prev.detalle_pedido.findIndex(x => x.key === key);

                if (idx !== -1) {
                    const copy = [...prev.detalle_pedido];
                    const row = copy[idx];

                    const cantidad = safeNum(row.cantidad, 0) + 1;
                    const price = safeNum(row.precio_unitario, precio);

                    copy[idx] = {
                        ...row,
                        inventario_item_id: row.inventario_item_id ?? inventarioItemId,
                        cantidad,
                        subtotal: cantidad * price,
                        observaciones: obs,
                        producto: { ...(row.producto || {}), id, nombre },
                    };

                    return { ...prev, detalle_pedido: copy };
                }

                const nuevo = {
                    id: null,
                    key,
                    itemable_type: tipo,
                    itemable_id: id,
                    inventario_item_id: inventarioItemId,
                    cantidad: 1,
                    precio_unitario: precio,
                    subtotal: precio,
                    observaciones: obs,
                    producto: { id, nombre },
                };

                return { ...prev, detalle_pedido: [...prev.detalle_pedido, nuevo] };
            });

            setOpenModalObs(false);
            setItemSeleccionado({});
            setObservaciones('');
            return;
        }

        const row = sel.row;
        const oldKey = sel.rowKey;
        if (!row || !oldKey) return;

        const type = String(row.itemable_type || '').toLowerCase();
        const id = row.itemable_id;

        const newKey = makeKey(type, id, obs);

        setPedido(prev => {
            const oldIdx = prev.detalle_pedido.findIndex(x => x.key === oldKey);
            if (oldIdx === -1) return prev;

            const existingIdx = prev.detalle_pedido.findIndex(x => x.key === newKey);

            const copy = [...prev.detalle_pedido];

            if (existingIdx !== -1 && existingIdx !== oldIdx) {
                const a = copy[existingIdx];
                const b = copy[oldIdx];

                const cantidad = safeNum(a.cantidad, 0) + safeNum(b.cantidad, 0);
                const price = safeNum(a.precio_unitario, 0);

                copy[existingIdx] = {
                    ...a,
                    inventario_item_id: a.inventario_item_id ?? b.inventario_item_id,
                    cantidad,
                    subtotal: cantidad * price,
                    observaciones: obs,
                    key: newKey,
                };

                copy.splice(oldIdx, 1);

                return { ...prev, detalle_pedido: copy };
            }

            const price = safeNum(copy[oldIdx].precio_unitario, 0);
            const cantidad = safeNum(copy[oldIdx].cantidad, 0);

            copy[oldIdx] = {
                ...copy[oldIdx],
                inventario_item_id: copy[oldIdx].inventario_item_id,
                key: newKey,
                observaciones: obs,
                subtotal: cantidad * price,
            };

            return { ...prev, detalle_pedido: copy };
        });

        setOpenModalObs(false);
        setItemSeleccionado({});
        setObservaciones('');
    };

    const editarObservacion = (row) => {
        setItemSeleccionado({ mode: 'edit', row, rowKey: row.key });
        setObservaciones(row.observaciones || '');
        setOpenModalObs(true);
    };

    //------------------ CANTIDADES ----------------------------

    const incrementar = (key) => {
        setPedido(prev => ({
            ...prev,
            detalle_pedido: prev.detalle_pedido.map(item =>
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
            detalle_pedido: prev.detalle_pedido
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
        setPedido(prev => ({ ...prev, detalle_pedido: prev.detalle_pedido.filter(item => item.key !== key) }));
    };

    useEffect(() => {
        setPedido(prev => {
            const total = (prev.detalle_pedido || []).reduce((acc, item) => acc + Number(item.subtotal || 0), 0);
            if (prev.total === total) return prev;
            return { ...prev, total };
        });
    }, [pedido?.detalle_pedido]);

    //------------------ BUSQUEDA PRODUCTOS --------------------

    const handleChangeBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const handleChangeFiltro = (input) => {
        const value = input?.target?.value || input;
        setTipoFiltro(value);
    };

    const filterProductos = (listado, busqueda, tipo) => {
        if (!Array.isArray(listado)) return [];

        const hasBusqueda = (busqueda ?? "").trim().length > 0;
        const nombre = normalizeText(busqueda ?? "");

        if (!hasBusqueda && (tipo === "Todos" || !tipo)) return listado;

        return listado.filter((dato) => {
            const item = dato?.itemable;
            const itemType = (dato?.itemable_type ?? "").toLowerCase();

            if (!item || !itemType) return false;

            let cumpleTipo = true;

            if (tipo && tipo !== "Todos") {
                const tipoLower = tipo.toLowerCase();

                if (tipoLower === "bebida") {
                    cumpleTipo = itemType === "bebida";
                } else {
                    const tipoComida = (item?.tipo ?? "").toString().toLowerCase();
                    cumpleTipo = itemType === "comida" && tipoComida === tipoLower;
                }
            }

            let cumpleBusqueda = true;
            if (hasBusqueda) {
                const nombreItem = itemType === "comida" ? (item?.comida ?? "") : (item?.bebida ?? "");
                cumpleBusqueda = normalizeText(nombreItem).includes(nombre);
            }

            return cumpleTipo && cumpleBusqueda;
        });
    };

    const listaProductos = filterProductos(productos, busqueda, tipoFiltro);

    //------------------ HELPERS --------------------------------

    const makeKey = (type, id, obs = '') => `${String(type).toLowerCase()}:${id}:${(obs || '').trim().toLowerCase()}`;

    const mapFromApi = (rows = []) =>
        rows.map(r => {
            const obs = (r.observaciones || '').trim();
            const type = String(r.itemable_type || '').toLowerCase();
            const id = r.itemable_id;

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
