import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import apiQueryUbicacion from '../ubicaciones/api/apiQueryUbicacion';
import { BebidaColumns } from './components/BebidaColumns';
import FormBebida from './components/FormBebida';
import useBebida from './hooks/useBebida';

export default function BebidaPage() {

  const { ubicaciones } = apiQueryUbicacion();

  const { titulo, isLoading, loading, openModal, tituloModal, bebida, busqueda, lista,
    handleChange, handleChangeFile, handleBusqueda, handleDelete, handler, toggleModal, cargarBebida } = useBebida();

  const columns = BebidaColumns({ cargarBebida, handleDelete });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo busqueda={busqueda} handleBusqueda={handleBusqueda} toggleModal={toggleModal} />
        <DataTableComponent data={lista} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"full"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler}>
          <FormBebida bebida={bebida} ubicaciones={ubicaciones} handleChange={handleChange}
            handleChangeImage={handleChangeFile} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
