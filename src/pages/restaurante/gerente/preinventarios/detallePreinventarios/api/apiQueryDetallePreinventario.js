import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { DetallePreinventarioService } from './detallePreinventario.service';

export default function apiQueryDetallePreinventario(preinventarioId) {

    const queryClient = useAppQueryCliente();

    const { data: productos, isLoading } = useAppQuery({
        queryKey: ["productos", preinventarioId],
        enabled: !!preinventarioId,
        queryFn: () => DetallePreinventarioService.getProductos(preinventarioId),
    });

    const { mutate: guardarDetalleMutation, isPending } = useAppMutation({
        mutationFn: ({ id, data }) => DetallePreinventarioService.guardarDetalle(id, data),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ["productos", preinventarioId] }); }
    });

    return {
        productos,
        isLoading,
        isPending,
        guardarDetalleMutation,
    }
}
