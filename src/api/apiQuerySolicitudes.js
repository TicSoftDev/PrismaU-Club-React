import { useAppMutation, useAppQuery, useAppQueryCliente } from '../hooks/useStore';
import { getSolicitudes, responderSolicitud } from '../services/SolicitudesService';

export default function apiQuerySolicitudes() {

    const queryClient = useAppQueryCliente();

    //=========== CONSULTAR ========================== 

    const { data: solicitudes, isLoading } = useAppQuery({
        queryKey: ['solicitudes'], queryFn: getSolicitudes
    });

    //=========== RESPONDER ==============================

    const { mutate: responderMutation, isPending: isResponding } = useAppMutation({
        mutationFn: responderSolicitud,
        onSuccess: () => { queryClient.refetchQueries({ queryKey: ['solicitudes'] }); }
    });

    return {
        solicitudes,
        isLoading,
        isResponding,
        responderMutation,
    }
}
