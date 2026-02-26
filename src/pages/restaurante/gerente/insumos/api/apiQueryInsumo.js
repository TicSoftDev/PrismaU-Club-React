import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { InsumoService } from './insumo.service';

export default function apiQueryInsumo() {

    const queryClient = useAppQueryCliente();

    const { mutate: createInsumoMutation, isPending: isCreating } = useAppMutation({
        mutationFn: InsumoService.create,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['insumo'] }); }
    });

    const getInsumosQuery = (page, limit, filters) => useAppQuery({
        queryKey: ['insumo', page, limit, filters.nombre || ''],
        queryFn: () => InsumoService.get(page, limit, filters),
    });

    const { mutate: updateInsumoMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: InsumoService.update,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['insumo'] }); }
    });

    const { mutate: deleteInsumoMutation } = useAppMutation({
        mutationFn: InsumoService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['insumo'] }); }
    });

    return {
        isCreating,
        isUpdating,
        getInsumosQuery,
        createInsumoMutation,
        updateInsumoMutation,
        deleteInsumoMutation
    }
}
