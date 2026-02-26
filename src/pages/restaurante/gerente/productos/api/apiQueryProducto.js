import { useAppMutation, useAppQuery, useAppQueryCliente } from '../../../../../hooks/useStore';
import { ProductoService } from './producto.service';

export default function apiQueryProducto() {

    const queryClient = useAppQueryCliente();

    const { mutate: createProductoMutation, isPending: isCreating } = useAppMutation({
        mutationFn: ProductoService.create,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['producto'] }); }
    });

    const { data: productos, isLoading } = useAppQuery({
        queryKey: ['producto'],
        queryFn: () => ProductoService.get(),
    });

    const { data: productosDisponibles, isLoading: isLoadingDisponibles } = useAppQuery({
        queryKey: ['productosDisponibles'],
        queryFn: () => ProductoService.getDisponibles(),
    });

    const { mutate: updateProductoMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: ({ id, data }) => ProductoService.update(id, data),
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['producto'] }); }
    });

    const { mutate: deleteProductoMutation } = useAppMutation({
        mutationFn: ProductoService.delete,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['producto'] }); }
    });

    return {
        productos,
        productosDisponibles,
        isLoadingDisponibles,
        isLoading,
        isCreating,
        isUpdating,
        createProductoMutation,
        updateProductoMutation,
        deleteProductoMutation
    }
}
