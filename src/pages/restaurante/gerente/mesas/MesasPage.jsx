import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import { useAppLocation } from '../../../../hooks/useStore';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Container from '../../../../utilities/helpers/Container';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import FormMesa from './components/FormMesa';
import { MesasColumns } from './components/MesasColumns';
import useMesa from './hooks/useMesa';

export default function MesasPage() {

  const location = useAppLocation();
  const { ubicacion } = location.state || {};

  const { titulo, mesas, isLoading, loading, openModal, tituloModal, mesa,
    handleChange, handleDelete, handler, toggleModal, cargarMesa } = useMesa(ubicacion.id);

  const columns = MesasColumns({ cargarMesa, handleDelete });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
        <Container>{"Ubicación: " + ubicacion.ubicacion}</Container>
        <DataTableComponent data={mesas} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"5xl"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler}>
          <FormMesa mesa={mesa} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
