import { useQuery } from '@tanstack/react-query';
import { getContrataciones } from '../services/ContratacionesService';

export default function apiQueryContrataciones() {

    const { data: contrataciones, isLoading } = useQuery({
        queryKey: ['contrataciones'], queryFn: getContrataciones,
    });

    return {
        contrataciones,
        isLoading
    }
}
