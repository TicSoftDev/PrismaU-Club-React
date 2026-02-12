import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { UbicacionService } from './ubicacion.service';

export default function apiQueryUbicacion() {

    const queryClient = useAppQueryCliente();

    const { mutate: createUbicacionMutation, isPending: isCreating } = useAppMutation({
        mutationFn: UbicacionService.create,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['ubicacion'] }); }
    });

    const { data: ubicaciones, isLoading } = useAppQuery({
        queryKey: ['ubicacion'],
        queryFn: () => UbicacionService.get(),
    });

    const { data, isLoading: loading, error } = useAppQuery({
        queryKey: ['ubicaciones'],
        queryFn: () => UbicacionService.getWithMesas(),
    });

    const { mutate: updateUbicacionMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: UbicacionService.update,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['ubicacion'] }); }
    });

    const { mutate: deleteUbicacionMutation } = useAppMutation({
        mutationFn: UbicacionService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['ubicacion'] }); }
    });

    return {
        error,
        data,
        loading,
        ubicaciones,
        isLoading,
        isCreating,
        isUpdating,
        createUbicacionMutation,
        updateUbicacionMutation,
        deleteUbicacionMutation
    }
}
