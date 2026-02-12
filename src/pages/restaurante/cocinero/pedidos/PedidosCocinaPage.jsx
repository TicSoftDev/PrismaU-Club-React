import Contenido from "../../../../utilities/helpers/Contenido";
import CardsPedidos from "./components/CardsPedidos";
import HeaderCocina from "./components/HeaderCocina";
import usePedido from "./hooks/usePedido";

export default function PedidosCocinaPage() {

    const { isLoading, pedidos, loadingEstado, loadingPlato, accionCargando, cambiarEstadoPlato, cambiarEstado } = usePedido();

    return (
        <>
            <HeaderCocina pedidos={pedidos} />
            <Contenido>
                <CardsPedidos pedidos={pedidos} loading={isLoading} loadingEstado={loadingEstado} cambiarEstado={cambiarEstado}
                    loadingPlato={loadingPlato} cambiarEstadoPlato={cambiarEstadoPlato} accion={accionCargando} />
            </Contenido>
        </>
    )
}
