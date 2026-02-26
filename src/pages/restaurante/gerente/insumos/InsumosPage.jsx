import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import DataTablePaginatedComponent from '../../../../utilities/dataTable/DataTablePaginatedComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../../utilities/modals/VentanaModal';
import FormInsumo from './components/FormInsumo';
import { InsumoColumns } from './components/InsumoColumns';
import useInsumo from './hooks/useInsumo';

export default function InsumosPage() {

  const { titulo, isLoading, loading, openModal, tituloModal, insumo, page, filters, limit, insumos, total,
    handleFilterChange, limpiarFiltros, onPageChange, onRowsPerPageChange, handleChange, handleDelete, handler,
    toggleModal, cargarInsumo, goToPresentations } = useInsumo();

  const columns = InsumoColumns({ cargarInsumo, handleDelete, goToPresentations });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo busqueda={filters?.nombre} handleBusqueda={handleFilterChange} toggleModal={toggleModal} />
        <DataTablePaginatedComponent data={insumos} loading={isLoading} columns={columns} total={total} page={page}
          limit={limit} onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange} />
        <VentanaModal titulo={tituloModal} loading={loading} size={"full"} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler}>
          <FormInsumo insumo={insumo} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
