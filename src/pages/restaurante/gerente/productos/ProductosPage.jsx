import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import apiQueryCocina from '../cocinas/api/apiQueryCocina';
import apiQueryInsumoPresentacion from '../insumosPresentacion/api/apiQueryInsumoPresentacion';
import FormProducto from './components/FormProducto';
import MenuProductos from './components/MenuProductos';
import { ProductoColumns } from './components/ProductoColumns';
import useProducto from './hooks/useProducto';

export default function ProductosPage() {

  const { insumos } = apiQueryInsumoPresentacion();
  const { cocinas } = apiQueryCocina();

  const { titulo, isLoading, loading, openModal, tituloModal, producto, busqueda, lista, tipoFiltro,
    handleChange, handleChangeImage, handleBusqueda, handleFiltro, handleDelete, handler, toggleModal, cargarProducto } = useProducto();

  const columns = ProductoColumns({ cargarProducto, handleDelete });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuProductos busqueda={busqueda} setFiltro={handleFiltro} handleBusqueda={handleBusqueda}
          tipo={tipoFiltro} toggleModal={toggleModal} />
        <DataTableComponent data={lista} loading={isLoading} columns={columns} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"full"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler}>
          <FormProducto producto={producto} cocinas={cocinas} handleChange={handleChange} insumos={insumos}
            handleChangeImage={handleChangeImage} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
