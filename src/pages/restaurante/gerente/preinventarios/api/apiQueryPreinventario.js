import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { PreinventarioService } from './preinventario.service';

export default function apiQueryPreinventario() {

    const queryClient = useAppQueryCliente();

    const { mutate: createPreinventarioMutation, isPending: isCreating } = useAppMutation({
        mutationFn: PreinventarioService.create,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['preinventario'] }); }
    });

    const { data: preinventarios, isLoading } = useAppQuery({
        queryKey: ['preinventario'],
        queryFn: () => PreinventarioService.get(),
    });

    const { mutate: updatePreinventarioMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: PreinventarioService.update,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['preinventario'] }); }
    });

    const { mutate: deletePreinventarioMutation } = useAppMutation({
        mutationFn: PreinventarioService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['preinventario'] }); }
    });

    return {
        preinventarios,
        isLoading,
        isCreating,
        isUpdating,
        createPreinventarioMutation,
        updatePreinventarioMutation,
        deletePreinventarioMutation,
    }
}
