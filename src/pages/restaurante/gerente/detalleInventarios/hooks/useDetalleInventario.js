import { useAppLocation } from "../../../../../hooks/useStore";
import { formatearFechaString } from "../../../../../models/FormateadorModel";
import apiQueryDetalleInventario from "../api/apiQueryDetalleInventario";

export default function useDetalleInventario() {

    const inventario = useAppLocation()?.state?.inventario;
    const fecha = inventario?.fecha;

    const { productos, isLoading } = apiQueryDetalleInventario(fecha);

    return {
        titulo: "Detalle del inventario para el " + formatearFechaString(inventario?.fecha),
        productos,
        isLoading,
    };
}
