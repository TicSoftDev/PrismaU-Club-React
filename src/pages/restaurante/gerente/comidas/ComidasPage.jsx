import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import apiQueryCocina from '../cocinas/api/apiQueryCocina';
import { ComidaColumns } from './components/ComidaColumns';
import FormComida from './components/FormComida';
import MenuComidas from './components/MenuComidas';
import useComida from './hooks/useComida';

export default function ComidasPage() {

  const { cocinas } = apiQueryCocina();

  const { titulo, isLoading, loading, openModal, tituloModal, comida, busqueda, lista, tipoFiltro,
    handleChange, handleChangeImage, handleBusqueda, handleFiltro, handleDelete, handler, toggleModal, cargarComida } = useComida();

  const columns = ComidaColumns({ cargarComida, handleDelete });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuComidas busqueda={busqueda} setFiltro={handleFiltro} handleBusqueda={handleBusqueda} toggleModal={toggleModal} />
        <DataTableComponent data={lista} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"full"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler}>
          <FormComida comida={comida} cocinas={cocinas} handleChange={handleChange}
            handleChangeImage={handleChangeImage} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
