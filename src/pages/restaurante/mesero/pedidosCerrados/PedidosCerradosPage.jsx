import DataTableComponent from "../../../../utilities/dataTable/DataTableComponent";
import Contenido from "../../../../utilities/helpers/Contenido";
import TituloPage from "../../../../utilities/helpers/TituloPage";
import ModalSencillo from "../../../../utilities/modals/ModalSencillo";
import FormPedido from "./components/FormPedido";
import { PedidosColumn } from "./components/PedidosColumn";
import usePedidoCerrado from "./hooks/usePedidoCerrado";

export default function PedidosCerradosPage() {

    const { titulo, tituloModal, isLoading, pedidosCerrados, pedido, openModal, cargarPedido, toggleModal } = usePedidoCerrado();

    const columns = PedidosColumn({ cargarPedido });

    return (
        <>
            <TituloPage titulo={titulo} />
            <Contenido>
                <DataTableComponent data={pedidosCerrados} loading={isLoading} columns={columns} />
                <ModalSencillo titulo={tituloModal} size="full" openModal={openModal} cerrarModal={toggleModal}>
                    <FormPedido pedido={pedido} />
                </ModalSencillo>
            </Contenido>
        </>
    )
}
