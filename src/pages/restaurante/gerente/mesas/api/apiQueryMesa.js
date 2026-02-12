import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { MesaService } from './mesa.service';

export default function apiQueryMesa(id) {

    const queryClient = useAppQueryCliente();

    const { mutate: createMesaMutation, isPending: isCreating } = useAppMutation({
        mutationFn: MesaService.create, 
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['mesa'] }); }
    });

    const { data: mesas, isLoading } = useAppQuery({
        queryKey: ['mesa', id],
        queryFn: () => MesaService.get(id),
        enabled: !!id
    });

    const { mutate: updateMesaMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: MesaService.update,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['mesa'] }); }
    });

    const { mutate: deleteMesaMutation } = useAppMutation({
        mutationFn: MesaService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['mesa'] }); }
    });

    return {
        mesas,
        isLoading,
        isCreating,
        isUpdating,
        createMesaMutation,
        updateMesaMutation,
        deleteMesaMutation
    }
}
