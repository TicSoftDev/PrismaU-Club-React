import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { InventarioService } from './inventario.service';

export default function apiQueryInventario() {

    const queryClient = useAppQueryCliente();

    const { mutate: abrirInventarioMutation, isPending: isCreating } = useAppMutation({
        mutationFn: InventarioService.abrir,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['inventario'] }); }
    });

    const { data: inventarios, isLoading } = useAppQuery({
        queryKey: ['inventario'],
        queryFn: () => InventarioService.get(),
    });

    return {
        inventarios,
        isLoading,
        isCreating,
        abrirInventarioMutation
    }
}
