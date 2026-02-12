import { useAppQuery } from '../../../../../hooks/useStore';
import { PedidoCerradoService } from './pedidoCerrado.service';

export default function apiQueryPedidoCerrado() {

    const { data: pedidosCerrados, isLoading } = useAppQuery({
        queryKey: ['pedidosCerrados'],
        queryFn: () => PedidoCerradoService.getPedidos(),
    });

    return {
        pedidosCerrados,
        isLoading,
    }
}
