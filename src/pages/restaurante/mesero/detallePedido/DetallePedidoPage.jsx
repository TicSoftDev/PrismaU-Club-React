import LoadingComponent from "../../../../utilities/loading/LoadingComponent";
import ModalSencillo from "../../../../utilities/modals/ModalSencillo";
import VentanaModal from "../../../../utilities/modals/VentanaModal";
import Spinner from "../../../../utilities/spinner/Spinner";
import CardsProductos from "../crearPedido/components/CardsProductos";
import FiltrosProductos from "../crearPedido/components/FiltrosProductos";
import FormObservacion from "../crearPedido/components/FormObservacion";
import ResumenPedido from "../crearPedido/components/ResumenPedido";
import FormDetalle from "./components/FormDetalle";
import PedidoDetalle from "./components/PedidoDetalle";
import PedidoInfo from "./components/PedidoInfo";
import PedidoUser from "./components/PedidoUser";
import useDetallePedido from "./hook/useDetallePedido";

export default function DetallePedidoPage() {

    const { data: order, isLoading, usuario, detalle, itemsCount, subtotalCalc, countsByState, tituloModal,
        isPending, item, openModal, loadingPlato, loadingPedido, openModalAgregar, pedido, tituloModalAgregar,
        busqueda, listaProductos, tipoFiltro, loadingProductos, openModalObs, tituloModalObs, observaciones, isCreating,
        cambiarEstadoPedido, cargarDetalle, toggleModal, handleChange, handleUpdate, cambiarEstadoPlato, handleDelete,
        agregar, toggleModalAgregar, handleChangeBusqueda, handleChangeFiltro, disminuir, eliminar, incrementar,
        agregarItem, editarObservacion, handleChangeObs, toggleModalObs, guardarObservacion, handleSubmit } = useDetallePedido();

    if (isLoading) return <LoadingComponent />;

    return (
        <div className="space-y-6">
            <PedidoInfo pedido={order} itemsCount={itemsCount} subtotalCalc={subtotalCalc} countsByState={countsByState} />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <PedidoUser usuario={usuario} />
                <PedidoDetalle detalle={detalle} itemsCount={itemsCount} pedido={order} cargarDetalle={cargarDetalle}
                    handleDelete={handleDelete} loadingPlato={loadingPlato} cambiarEstadoPlato={cambiarEstadoPlato}
                    agregar={agregar} />
            </div>

            <VentanaModal titulo={tituloModal} size="3xl" openModal={openModal} cerrarModal={toggleModal}
                loading={isPending} hanleSubmit={handleUpdate}>
                <FormDetalle item={item} handleChange={handleChange} />
            </VentanaModal>

            {order.pedido_detalle.length > 0 && order.estado !== 'Servido' && order.pedido_detalle.every(d => d.estado === 'Servido') &&
                <button className="bg-green-500 w-full py-2 rounded-xl text-white text-md font-semibold uppercase"
                    onClick={() => cambiarEstadoPedido(order.id, 'Servido')}>
                    {loadingPedido ? <Spinner /> : 'Marcar como servido'}
                </button>
            }
            <ModalSencillo titulo={tituloModalAgregar} size="full" openModal={openModalAgregar} loading={isPending}
                cerrarModal={toggleModalAgregar}>
                <div className="grid grid-cols-4 gap-12">
                    <div className="col-span-3">
                        <div className='w-full border border-green-200 rounded-lg p-4 flex flex-col gap-4'>
                            <FiltrosProductos busqueda={busqueda} handleChangeBusqueda={handleChangeBusqueda}
                                filtro={tipoFiltro} handleChangeTipo={handleChangeFiltro} hayPedido={false} />
                            <CardsProductos productos={listaProductos} agregarItem={agregarItem} hayPedido={false} />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <ResumenPedido pedido={pedido} incrementar={incrementar} disminuir={disminuir} eliminar={eliminar}
                            editarObservacion={editarObservacion} loading={isCreating} handleSubmit={handleSubmit}
                            hayPedido={false} noShowTotal={true} />
                    </div>
                </div>
            </ModalSencillo>
            <VentanaModal size={'7xl'} titulo={tituloModalObs} openModal={openModalObs}
                hanleSubmit={guardarObservacion} cerrarModal={toggleModalObs}
            >
                <FormObservacion observaciones={observaciones} handleChange={handleChangeObs} />
            </VentanaModal>
        </div>
    );
}