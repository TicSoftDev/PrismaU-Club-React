import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { CocinaService } from './cocina.service';

export default function apiQueryCocina() {

    const queryClient = useAppQueryCliente();

    const { mutate: createCocinaMutation, isPending: isCreating } = useAppMutation({
        mutationFn: CocinaService.create,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['cocina'] }); }
    });

    const { data: cocinas, isLoading } = useAppQuery({
        queryKey: ['cocina'],
        queryFn: () => CocinaService.get(),
    });

    const { data: cocineros, isLoading: loading } = useAppQuery({
        queryKey: ['cocineros'],
        queryFn: () => CocinaService.getCocineros(),
    });

    const { mutate: updateCocinaMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: CocinaService.update,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['cocina'] }); }
    });

    const { mutate: asignCocineroMutation, isPending: isAsigning } = useAppMutation({
        mutationFn: CocinaService.asignCocinero,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['cocina'] }); }
    });

    const { mutate: deleteCocinaMutation } = useAppMutation({
        mutationFn: CocinaService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['cocina'] }); }
    });

    return {
        cocinas,
        isLoading,
        isCreating,
        isUpdating,
        cocineros,
        loading,
        isAsigning,
        createCocinaMutation,
        updateCocinaMutation,
        deleteCocinaMutation,
        asignCocineroMutation
    }
}
