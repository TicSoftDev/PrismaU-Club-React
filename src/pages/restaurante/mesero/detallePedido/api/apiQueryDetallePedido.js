import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { DetallePedidoService } from './detallePedido.service';

export default function apiQueryDetallePedido() {

    const queryClient = useAppQueryCliente();

    const { mutate: createDetalleMutation, isPending: isCreating } = useAppMutation({
        mutationFn: DetallePedidoService.crear,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['detalle-pedido'] }); }
    });

    const getPedidoQuery = (mesa_id) => {
        return useAppQuery({
            queryKey: ['detalle-pedido', mesa_id],
            queryFn: () => DetallePedidoService.getPedido(mesa_id),
            enabled: !!mesa_id,
        });
    }

    const { mutate: actualizarDetalleMutation, isPending } = useAppMutation({
        mutationFn: DetallePedidoService.update,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['detalle-pedido'] }); }
    });

    const { mutate: cambiarEstadoPlatoMutation, isPending: loadingPlato } = useAppMutation({
        mutationFn: ({ id, estado }) => DetallePedidoService.cambiarEstadoPlato(id, estado),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['detalle-pedido'] }); }
    });

    const { mutate: cambiarEstadoMutation, isPending: loadingPedido } = useAppMutation({
        mutationFn: ({ id, estado }) => DetallePedidoService.cambiarEstado(id, estado),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['pedidosCocina'] }); }
    });

    const { mutate: eliminarDetalleMutation } = useAppMutation({
        mutationFn: DetallePedidoService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['detalle-pedido'] }); }
    });

    return {
        isPending,
        loadingPlato,
        loadingPedido,
        isCreating,
        createDetalleMutation,
        getPedidoQuery,
        actualizarDetalleMutation,
        cambiarEstadoPlatoMutation,
        cambiarEstadoMutation,
        eliminarDetalleMutation
    }
}
