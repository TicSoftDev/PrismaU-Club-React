import { useAppQuery } from '../hooks/useStore';
import { getContrataciones } from '../services/ContratacionesService';

export default function apiQueryContrataciones() {

    const { data: contrataciones, isLoading } = useAppQuery({
        queryKey: ['contrataciones'], queryFn: getContrataciones,
    });

    return {
        contrataciones,
        isLoading
    }
}
