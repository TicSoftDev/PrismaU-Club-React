import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { BebidaService } from './bebida.service';

export default function apiQueryBebida() {

    const queryClient = useAppQueryCliente();

    const { mutate: createBebidaMutation, isPending: isCreating } = useAppMutation({
        mutationFn: BebidaService.create,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['bebida'] }); }
    });

    const { data: bebidas, isLoading } = useAppQuery({
        queryKey: ['bebida'],
        queryFn: () => BebidaService.get(),
    });

    const { data: bebidasDisponibles, isLoading: isLoadingDisponibles } = useAppQuery({
        queryKey: ['bebidasDisponibles'],
        queryFn: () => BebidaService.getDisponibles(),
    });

    const { mutate: updateBebidaMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: ({ id, data }) => BebidaService.update(id, data),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['bebida'] }); }
    });

    const { mutate: deleteBebidaMutation } = useAppMutation({
        mutationFn: BebidaService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['bebida'] }); }
    });

    return {
        bebidas,
        bebidasDisponibles,
        isLoadingDisponibles,
        isLoading,
        isCreating,
        isUpdating,
        createBebidaMutation,
        updateBebidaMutation,
        deleteBebidaMutation
    }
}
