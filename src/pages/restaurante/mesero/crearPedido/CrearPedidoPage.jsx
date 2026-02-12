import Contenido from "../../../../utilities/helpers/Contenido";
import LoadingComponent from "../../../../utilities/loading/LoadingComponent";
import ModalSencillo from "../../../../utilities/modals/ModalSencillo";
import VentanaModal from "../../../../utilities/modals/VentanaModal";
import CardsMesas from "./components/CardsMesas";
import CardsProductos from "./components/CardsProductos";
import CardsUbicaciones from "./components/CardsUbicaciones";
import FiltrosProductos from "./components/FiltrosProductos";
import FormObservacion from "./components/FormObservacion";
import FormSocio from "./components/FormSocio";
import ResumenPedido from "./components/ResumenPedido";
import useCrearPedido from "./hook/useCrearPedido";

export default function CrearPedidoPage() {

    const {
        ubicaciones, loadingUbicaciones, ubicacion, mesas, loadingMesas, tituloModal, openModal, pedido, pedidoCargado, socios,
        loadingSocios, listaProductos, loadingProductos, tituloModalObs, openModalObs, busqueda, tipoFiltro, observaciones,
        loading, hayPedido,
        selectLocation, iniciarPedido, toggleModal, handleChangeSelect, handleChangeBusqueda, handleChangeFiltro, handleSubmit,
        agregarItem, toggleModalObs, editarObservacion, handleChangeObs, guardarObservacion, incrementar, disminuir, eliminar,
    } = useCrearPedido();

    if (loadingUbicaciones || loadingSocios || loadingProductos) return <LoadingComponent />

    return (
        <Contenido>
            <CardsUbicaciones ubicaciones={ubicaciones} ubicacion={ubicacion} selectLocation={selectLocation} />
            <CardsMesas ubicacion={ubicacion} mesas={mesas} loading={loadingMesas} iniciarPedido={iniciarPedido} />
            <ModalSencillo size="full" titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}>
                {pedidoCargado ? <LoadingComponent /> :
                    <div className="grid grid-cols-4 gap-12">
                        <div className="col-span-3">
                            <div className="flex flex-col gap-2">
                                <FormSocio socios={socios} pedido={pedido} handleChangeSelect={handleChangeSelect}
                                    hayPedido={hayPedido} />
                                <div className='w-full border border-green-200 rounded-lg p-4 flex flex-col gap-4'>
                                    <FiltrosProductos busqueda={busqueda} handleChangeBusqueda={handleChangeBusqueda}
                                        filtro={tipoFiltro} handleChangeTipo={handleChangeFiltro} hayPedido={hayPedido} />
                                    <CardsProductos productos={listaProductos} agregarItem={agregarItem} hayPedido={hayPedido} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <ResumenPedido pedido={pedido} incrementar={incrementar} disminuir={disminuir} eliminar={eliminar}
                                editarObservacion={editarObservacion} loading={loading} handleSubmit={handleSubmit}
                                hayPedido={hayPedido} />
                        </div>
                    </div>
                }
            </ModalSencillo>
            <VentanaModal size={'7xl'} titulo={tituloModalObs} openModal={openModalObs}
                hanleSubmit={guardarObservacion} cerrarModal={toggleModalObs}
            >
                <FormObservacion observaciones={observaciones} handleChange={handleChangeObs} />
            </VentanaModal>
        </Contenido>
    )
}