import { useAppQuery } from '../hooks/useStore';
import { getReservas } from '../services/ReservasService';

export default function apiQueryReservas() {

    const { data: reservas, isLoading } = useAppQuery({
        queryKey: ['reservas'], queryFn: getReservas,
    });

    return {
        reservas,
        isLoading
    }
}
