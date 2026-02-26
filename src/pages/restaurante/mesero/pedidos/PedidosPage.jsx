import DataTableComponent from "../../../../utilities/dataTable/DataTableComponent";
import Contenido from "../../../../utilities/helpers/Contenido";
import TituloPage from "../../../../utilities/helpers/TituloPage";
import VentanaModal from "../../../../utilities/modals/VentanaModal";
import CardsMesas from "./components/CardsMesas";
import CardsUbicaciones from "./components/CardsUbicaciones";
import FormPagarPedido from "./components/FormPagarPedido";
import { PedidosColumn } from "./components/PedidosColumn";
import usePedido from "./hooks/usePedido";

export default function PedidosPage() {

    const { titulo, isLoading, pedidosAbiertos, pedido, openModalMesa, tituloModalMesa, ubicacion, loadingMesas, mesas,
        isChanging, ubicaciones, loadingUbicaciones, openModalPagar, tituloModalPagar, isPending, venta,
        pagarPedido, cancelarPedido, cargarPedidoMesa, toggleModalMesa, toggleModalPagar, handlePagarPedido,
        selectLocation, handleChangeMesa, handleCambiarMesa, goDetalle, handleChangePagar } = usePedido();

    const columns = PedidosColumn({ goDetalle, cancelarPedido, cargarPedidoMesa, pagarPedido });

    return (
        <>
            <TituloPage titulo={titulo} />
            <Contenido>
                <DataTableComponent data={pedidosAbiertos} loading={isLoading} columns={columns} />
                <VentanaModal titulo={tituloModalMesa} size={"full"} openModal={openModalMesa} cerrarModal={toggleModalMesa}
                    hanleSubmit={handleCambiarMesa} loading={isChanging}>
                    <CardsUbicaciones loading={loadingUbicaciones} ubicaciones={ubicaciones} ubicacion={ubicacion} selectLocation={selectLocation} />
                    <CardsMesas mesas={mesas} pedido={pedido} loading={loadingMesas} iniciarPedido={handleChangeMesa} ubicacion={ubicacion} />
                </VentanaModal>
                <VentanaModal titulo={tituloModalPagar} size={"full"} openModal={openModalPagar}
                    cerrarModal={toggleModalMesa} hanleSubmit={handlePagarPedido} loading={isPending}>
                    <FormPagarPedido venta={venta} handleChange={handleChangePagar} />
                </VentanaModal>
            </Contenido>
        </>
    )
}
