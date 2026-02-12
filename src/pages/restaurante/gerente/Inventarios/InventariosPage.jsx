import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import apiQueryPreinventario from '../preinventarios/api/apiQueryPreinventario';
import FormInventario from './components/FormInventario';
import { InventarioColumns } from './components/InventarioColumns';
import usePreinventario from './hooks/useInventario';

export default function InventariosPage() {

  const { preinventarios } = apiQueryPreinventario();

  const { titulo, inventarios, isLoading, loading, openModal, tituloModal, inventario,
    handleChange, toggleModal, handleSubmit, detalle } = usePreinventario();

  const columns = InventarioColumns({ detalle });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
        <DataTableComponent data={inventarios} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"5xl"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handleSubmit}>
          <FormInventario inventario={inventario} preinventarios={preinventarios} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
