import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import { CocinaColumns } from './components/CocinaColumns';
import FormAsignCocinero from './components/FormAsignCocinero';
import FormCocina from './components/FormCocina';
import useCocina from './hooks/useCocina';

export default function CocinasPage() {

  const { titulo, cocinas, isLoading, loading, openModal, tituloModal, cocina, cocineros, loadingCocineros,
    tituloModalCocinero, openModalCocinero, isAsigning,
    handleChange, handleDelete, handler, toggleModal, cargarCocina, asignCocinero, toggleModalCocinero, handleAsign } = useCocina();

  const columns = CocinaColumns({ cargarCocina, handleDelete, asignCocinero });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
        <DataTableComponent data={cocinas} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"5xl"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler}>
          <FormCocina cocina={cocina} handleChange={handleChange} />
        </VentanaModal>
        <VentanaModal titulo={tituloModalCocinero} loading={isAsigning} size={"3xl"} openModal={openModalCocinero}
          cerrarModal={toggleModalCocinero} hanleSubmit={handleAsign}>
          <FormAsignCocinero cocina={cocina} loading={loadingCocineros} cocineros={cocineros} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
