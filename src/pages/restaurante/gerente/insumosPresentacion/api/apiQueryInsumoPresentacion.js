import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { InsumoPresentacionService } from './insumoPresentacion.service';

export default function apiQueryInsumoPresentacion(id) {

    const queryClient = useAppQueryCliente();

    const { mutate: createInsumoPresentacionMutation, isPending: isCreating } = useAppMutation({
        mutationFn: InsumoPresentacionService.create, 
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['insumoPresentacion'] }); }
    });

    const { data: insumos, isLoading: isLoadingInsumos } = useAppQuery({
        queryKey: ['insumos-presentacion', id],
        queryFn: () => InsumoPresentacionService.getAll(),
    });
    
    const { data: insumoPresentacions, isLoading } = useAppQuery({
        queryKey: ['insumoPresentacion', id],
        queryFn: () => InsumoPresentacionService.get(id),
        enabled: !!id
    });

    const { mutate: updateInsumoPresentacionMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: InsumoPresentacionService.update,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['insumoPresentacion'] }); }
    });

    const { mutate: deleteInsumoPresentacionMutation } = useAppMutation({
        mutationFn: InsumoPresentacionService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['insumoPresentacion'] }); }
    });

    return {
        insumos,
        isLoadingInsumos,
        insumoPresentacions,
        isLoading,
        isCreating,
        isUpdating,
        createInsumoPresentacionMutation,
        updateInsumoPresentacionMutation,
        deleteInsumoPresentacionMutation
    }
}
