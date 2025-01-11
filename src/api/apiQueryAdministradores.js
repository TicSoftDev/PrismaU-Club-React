import { useAppMutation, useAppQuery, useAppQueryCliente } from '../hooks/useStore';
import { changeStatus, createAdmin, deleteAdmin, getAdmins, updateAdmin } from '../services/AdminsService';

export default function apiQueryAdministradores() {

    const queryClient = useAppQueryCliente();

    //=========== CREAR ==============================

    const { mutate: createAdminMutation, isPending: isCreating } = useAppMutation({
        mutationFn: createAdmin,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['admins'] }); }
    });

    //=========== CONSULTAR ==========================

    const { data: admins, isLoading } = useAppQuery({
        queryKey: ['admins'], queryFn: getAdmins
    });

    //=========== EDITAR ==============================

    const { mutate: actualizarAdminMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: updateAdmin,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['admins'] }); }
    });

    //=========== INACTIVAR ==============================

    const { mutate: cambiarEstadoMutation } = useAppMutation({
        mutationFn: changeStatus,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['admins'] }); }
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarAdminMutation } = useAppMutation({
        mutationFn: deleteAdmin,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['admins'] }); }
    });

    return {
        admins,
        isLoading,
        isCreating,
        isUpdating,
        createAdminMutation,
        actualizarAdminMutation,
        cambiarEstadoMutation,
        eliminarAdminMutation
    }
}
