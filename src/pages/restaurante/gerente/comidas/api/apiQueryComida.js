import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { ComidaService } from './comida.service';

export default function apiQueryComida() {

    const queryClient = useAppQueryCliente();

    const { mutate: createComidaMutation, isPending: isCreating } = useAppMutation({
        mutationFn: ComidaService.create,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['comida'] }); }
    });

    const { data: comidas, isLoading } = useAppQuery({
        queryKey: ['comida'],
        queryFn: () => ComidaService.get(),
    });

    const { data: comidasDisponibles, isLoading: isLoadingDisponibles } = useAppQuery({
        queryKey: ['comidasDisponibles'],
        queryFn: () => ComidaService.getDisponibles(),
    });

    const { mutate: updateComidaMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: ({ id, data }) => ComidaService.update(id, data),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['comida'] }); }
    });

    const { mutate: deleteComidaMutation } = useAppMutation({
        mutationFn: ComidaService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['comida'] }); }
    });

    return {
        comidas,
        comidasDisponibles,
        isLoadingDisponibles,
        isLoading,
        isCreating,
        isUpdating,
        createComidaMutation,
        updateComidaMutation,
        deleteComidaMutation
    }
}
