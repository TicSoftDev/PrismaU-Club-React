import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import FormInsumoPresentacion from './components/FormInsumoPresentacion';
import { InsumoPresentacionColumns } from './components/InsumoPresentacionColumns';
import useInsumoPresentacion from './hooks/useInsumoPresentacion';

export default function InsumoPresentacionesPage() {

  const { titulo, insumoPresentacions, isLoading, loading, openModal, tituloModal, insumoPresentacion,
    handleChange, handleDelete, handler, toggleModal, cargarInsumoPresentacion } = useInsumoPresentacion();

  const columns = InsumoPresentacionColumns({ cargarInsumoPresentacion, handleDelete });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
        <DataTableComponent data={insumoPresentacions} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"5xl"} openModal={openModal}
          cerrarModal={toggleModal} hanleSubmit={handler}>
          <FormInsumoPresentacion insumo={insumoPresentacion} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
