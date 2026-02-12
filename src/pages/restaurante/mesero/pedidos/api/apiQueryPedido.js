import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { PedidoService } from './pedido.service';

export default function apiQueryPedido() {

    const queryClient = useAppQueryCliente();

    const { data: pedidosAbiertos, isLoading } = useAppQuery({
        queryKey: ['pedidosAbiertos'],
        queryFn: () => PedidoService.getAbiertos(),
    });

    const { mutate: cambiarEstadoMutation } = useAppMutation({
        mutationFn: ({ id, estado }) => PedidoService.cambiarEstado(id, estado),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['pedidosCerrados'] }); }
    });

    const { mutate: cambiarMesaMutation, isPending: isChanging } = useAppMutation({
        mutationFn: PedidoService.cambiarMesa,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['pedidosAbiertos'] }); }
    });

    const { mutate: pagarPedidoMutation, isPending } = useAppMutation({
        mutationFn: PedidoService.pagar,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['pedidosCerrados'] }); }
    });

    return {
        pedidosAbiertos,
        isLoading,
        isPending,
        isChanging,
        pagarPedidoMutation,
        cambiarEstadoMutation,
        cambiarMesaMutation
    }
}
