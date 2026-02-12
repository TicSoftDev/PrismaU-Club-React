import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import FormUbicacion from './components/FormUbicacion';
import { UbicacionColumns } from './components/UbicacionColumns';
import useUbicacion from './hooks/useUbicacion';

export default function UbicacionesPage() {

  const { titulo, ubicaciones, isLoading, loading, openModal, tituloModal, ubicacion,
    handleChange, handleDelete, handler, toggleModal, cargarUbicacion, goToMesas } = useUbicacion();

  const columns = UbicacionColumns({ cargarUbicacion, handleDelete, goToMesas });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
        <DataTableComponent data={ubicaciones} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"5xl"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler}>
          <FormUbicacion ubicacion={ubicacion} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
