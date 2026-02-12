import { useState } from 'react';
import { useAppLocation } from '../../../../../hooks/useStore';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryDetallePedido from '../api/apiQueryDetallePedido';
import { fechaHoy, normalizeText } from '../../../../../models/FormateadorModel';
import apiQueryDetalleInventario from '../../../gerente/detalleInventarios/api/apiQueryDetalleInventario';
import { id } from 'date-fns/locale';

export default function useDetallePedido() {

    const ped = useAppLocation()?.state?.pedido;

    const { isPending, loadingPlato, loadingPedido, isCreating, getPedidoQuery, actualizarDetalleMutation,
        createDetalleMutation, cambiarEstadoPlatoMutation, cambiarEstadoMutation, eliminarDetalleMutation } = apiQueryDetallePedido();

    const { productos, isLoading: loadingProductos } = apiQueryDetalleInventario(fechaHoy());

    const [openModal, setOpenModal] = useState(false);
    const [openModalAgregar, setOpenModalAgregar] = useState(false);
    const [item, setItem] = useState({});
    const [pedido, setPedido] = useState(getInitialPedido());
    const [busqueda, setBusqueda] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('');
    const [openModalObs, setOpenModalObs] = useState(false);
    const [itemSeleccionado, setItemSeleccionado] = useState({});
    const [observaciones, setObservaciones] = useState('');

    //------------------ Recargar ------------------------------------

    function getInitialPedido() {
        return {
            id: null,
            detalle_pedido: [],
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
        setTipoFiltro('');
    }

    //------------------ Obtener pedido ------------------------------

    const { data, isLoading } = getPedidoQuery(ped?.mesa_id);

    const usuario = data?.usuario ?? {};
    const detalle = data?.detalle_pedido ?? [];
    const itemsCount = detalle.reduce((acc, d) => acc + (Number(d?.cantidad) || 0), 0);
    const subtotalCalc = detalle.reduce((acc, d) => acc + (Number(d?.precio) || 0) * (Number(d?.cantidad) || 0), 0);

    const countsByState = detalle.reduce((acc, d) => {
        const e = d?.estado || "N/A";
        acc[e] = (acc[e] || 0) + 1;
        return acc;
    }, {});

    //------------------ Actualizar detalle -----------------------------

    const cargarDetalle = (detalle, inventario_id) => {
        setItem({ ...detalle, inventario_id });
        setOpenModal(true);
    }

    const toggleModal = () => setOpenModal(!openModal);

    const handleChange = ({ target }) => {
        setItem(prev => ({ ...prev, [target.name]: target.value }));
    }

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

    const toggleModalAgregar = () => setOpenModalAgregar(!openModalAgregar);

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

    const agregarItem = (producto, tipo, idDetalle) => {
        setItemSeleccionado({ producto, tipo, idDetalle });
        setObservaciones('');
        setOpenModalObs(true);
    }

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

    const toggleModalObs = () => setOpenModalObs(prev => !prev);

    const handleChangeObs = (e) => setObservaciones(e.target.value);

    const editarObservacion = (row) => {
        setItemSeleccionado({ mode: 'edit', row, rowKey: row.key });
        setObservaciones(row.observaciones || '');
        setOpenModalObs(true);
    };

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

    const handleDelete = async (id, inventario_id) => {
        if (await alertConfirm('¿Seguro que quiere eliminar este detalle?', 'Si, eliminar')) {
            eliminarDetalleMutation({ id, inventario_id }, {
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
        tituloModalAgregar: "Agregar Plato",
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
