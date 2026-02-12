import { useAppQuery } from '../../../../../hooks/useStore';
import { DetallePreinventarioService } from './detalleInventario.service';

export default function apiQueryDetalleInventario(fecha) {

    const { data, isLoading } = useAppQuery({
        queryKey: ["detalle_inventario", fecha],
        enabled: !!fecha,
        queryFn: () => DetallePreinventarioService.getDetalle(fecha),
    });

    return {
        productos: data?.data?.items ?? [],
        isLoading,
    }
}
