import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { CrearPedidoService } from './crearPedido.service';

export default function apiQueryCrearPedido() {

    const queryClient = useAppQueryCliente();

    const { mutate: createPedidoMutation, isPending: isCreating } = useAppMutation({
        mutationFn: CrearPedidoService.crear,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['pedidos'] }); }
    });

    const { data: socios, isLoading: loadingSocios } = useAppQuery({
        queryKey: ['socios'],
        queryFn: () => CrearPedidoService.getSocios(),
    });

    const getPedidoMesaQuery = (mesa_id) => {
        return useAppQuery({
            queryKey: ['pedido-mesa', mesa_id],
            queryFn: () => CrearPedidoService.getPedidoMesa(mesa_id),
            enabled: !!mesa_id,
            staleTime: 0,
            refetchOnMount: "always",
            refetchOnWindowFocus: false,
        });
    }

    const { mutate: actualizarPedidoMutation, isPending } = useAppMutation({
        mutationFn: CrearPedidoService.update,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['pedidos'] }); }
    });

    return {
        socios,
        loadingSocios,
        isCreating,
        isPending,
        createPedidoMutation,
        getPedidoMesaQuery,
        actualizarPedidoMutation,
    }
}
