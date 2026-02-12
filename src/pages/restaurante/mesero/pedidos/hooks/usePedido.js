import { useState } from 'react';
import { useAppNavigate, useAppSelector } from '../../../../../hooks/useStore';
import { PrivateRoutes } from '../../../../../models/RutasModel';
import { alertConfirm, alertError, alertSucces, alertWarning } from '../../../../../utilities/alerts/Alertas';
import apiQueryMesa from '../../../gerente/mesas/api/apiQueryMesa';
import apiQueryUbicacion from '../../../gerente/ubicaciones/api/apiQueryUbicacion';
import apiQueryPedido from '../api/apiQueryPedido';

export default function usePedido() {

    const navigate = useAppNavigate();
    const empleado_id = useAppSelector(state => state.user.id);

    const { data: ubicaciones, loading: loadingUbicaciones } = apiQueryUbicacion();

    const { isLoading, pedidosAbiertos, isPending, isChanging, pagarPedidoMutation, cambiarEstadoMutation,
        cambiarMesaMutation } = apiQueryPedido();

    const [pedido, setPedido] = useState(null);
    const [openModalPagar, setOpenModalPagar] = useState(false);
    const [openModalMesa, setOpenModalMesa] = useState(false);
    const [ubicacion, setUbicacion] = useState({});
    const [venta, setVenta] = useState(getInitialVenta());

    const { mesas, isLoading: loadingMesas } = apiQueryMesa(ubicacion?.id);

    const recargar = () => {
        setPedido(null);
        setOpenModalMesa(false);
        setUbicacion({});
    }

    function getInitialVenta() {
        return {
            pedido_id: null,
            empleado_id,
            metodo_pago: null,
            referencia_pago: null,
            observacion: null
        };
    }

    //============= Cambiar estado =====================

    const cambiarEstado = async (id, estado) => {
        if (await alertConfirm('¿Estás seguro de cambiar el estado de este pedido?', 'Sí, cambiar')) {
            cambiarEstadoMutation({ id, estado }, {
                onSuccess: (data) => {
                    alertSucces(data.message);
                    navigate(PrivateRoutes.PEDIDOS_CERRADOS);
                },
                onError: (error) => { alertError(`Error: ${error.message}`); }
            });
        }
    };

    //============= Cambiar mesa ===========================

    const selectLocation = (ubicacion) => {
        setUbicacion(ubicacion);
    }

    const toggleModalMesa = () => setOpenModalMesa(!openModalMesa);

    const cargarPedidoMesa = (pedido) => {
        setPedido(pedido);
        setOpenModalMesa(true);
    }

    const handleChangeMesa = (idMesa) => {
        setPedido({ ...pedido, mesa_id: idMesa });
    }

    const handleCambiarMesa = async () => {
        if (await alertConfirm('¿Estás seguro de cambiar la mesa de este pedido?', 'Sí, cambiar')) {
            cambiarMesaMutation(pedido, {
                onSuccess: (data) => {
                    if (data.status) {
                        alertSucces(data.message);
                        recargar();
                    }
                },
                onError: (error) => { console.log(error); alertError(`Error: ${error.message}`); }
            });
        }
    }

    /*============= Pagar pedido =============================*/

    const toggleModalPagar = () => setOpenModalPagar(!openModalPagar);

    const pagarPedido = async (pedido_id) => {
        if (await alertConfirm('¿Estás seguro de cerrar este pedido?', 'Sí, pagar')) {
            setVenta(prev => ({ ...prev, pedido_id }));
            setOpenModalPagar(true);
        }
    }

    const handleChangePagar = (e) => {
        setVenta(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handlePagarPedido = async () => {
        pagarPedidoMutation(venta, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    navigate(PrivateRoutes.PEDIDOS_CERRADOS);
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => {console.log(error); alertError(`Error: ${error.message}`); }
        });
    };

    /*============= Go Detalle =============================*/

    const goDetalle = (pedido) => {
        navigate(PrivateRoutes.DETALLE_PEDIDO, { state: { pedido } });
    }

    return {
        titulo: 'Pedidos abiertos',
        tituloModalMesa: 'Cambiar mesa del pedido',
        openModalPagar,
        tituloModalPagar: 'Pagar pedido',
        ubicaciones,
        loadingUbicaciones,
        isLoading,
        pedidosAbiertos,
        pedido,
        openModalMesa,
        ubicacion,
        loadingMesas,
        mesas,
        isChanging,
        isPending,
        venta,
        pagarPedido,
        cambiarEstado,
        toggleModalMesa,
        cargarPedidoMesa,
        selectLocation,
        handleChangeMesa,
        handleCambiarMesa,
        goDetalle,
        toggleModalPagar,
        handlePagarPedido,
        handleChangePagar
    }

}
