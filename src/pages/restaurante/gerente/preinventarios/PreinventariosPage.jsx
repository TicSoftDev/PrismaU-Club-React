import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import FormPreinventario from './components/FormPreinventario';
import { PreinventarioColumns } from './components/PreinventarioColumns';
import usePreinventario from './hooks/usePreinventario';

export default function PreinventariosPage() {

  const { titulo, preinventarios, isLoading, loading, openModal, tituloModal, preinventario,
    handleChange, handleDelete, handler, toggleModal, cargarPreinventario, detalle } = usePreinventario();

  const columns = PreinventarioColumns({ cargarPreinventario, handleDelete, detalle });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
        <DataTableComponent data={preinventarios} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"5xl"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler}>
          <FormPreinventario preinventario={preinventario} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
