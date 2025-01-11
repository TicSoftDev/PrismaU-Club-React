import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changeStatus, createAdmin, deleteAdmin, getAdmins, updateAdmin } from '../services/AdminsService';

export default function apiQueryAdministradores() {

    const queryClient = useQueryClient();

    //=========== CREAR ==============================

    const { mutate: createAdminMutation, isPending: isCreating } = useMutation({
        mutationFn: createAdmin,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['admins'] }); }
    });

    //=========== CONSULTAR ==========================

    const { data: admins, isLoading } = useQuery({
        queryKey: ['admins'], queryFn: getAdmins
    });

    //=========== EDITAR ==============================

    const { mutate: actualizarAdminMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateAdmin,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['admins'] }); }
    });

    //=========== INACTIVAR ==============================

    const { mutate: cambiarEstadoMutation } = useMutation({
        mutationFn: changeStatus,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['admins'] }); }
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarAdminMutation } = useMutation({
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
