import { useAppMutation, useAppQuery, useAppQueryCliente, useAppSelector } from '../../../../../hooks/useStore';
import { PedidoService } from './pedido.service';

export default function apiQueryPedido() {

    const cocinaId = useAppSelector(state => state.credenciales.cocina_id); 
    const queryClient = useAppQueryCliente();

    const { data: pedidos, isLoading } = useAppQuery({
        queryKey: ['pedidosCocina', cocinaId],
        queryFn: () => PedidoService.getPedidos(cocinaId),
    });

    const { mutate: cambiarEstadoMutation, isPending } = useAppMutation({
        mutationFn: ({ id, estado }) => PedidoService.cambiarEstado(id, estado),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['pedidosCocina'] }); }
    });

    const { mutate: cambiarEstadoPlatoMutation, isPending: loadingPlato } = useAppMutation({
        mutationFn: ({ id, estado }) => PedidoService.cambiarEstadoPlato(id, estado),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['pedidosCocina'] }); }
    });

    return {
        pedidos,
        isLoading,
        loadingEstado: isPending,
        loadingPlato,
        cambiarEstadoMutation,
        cambiarEstadoPlatoMutation
    }
}
