import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import { DetalleInventarioColumns } from './components/DetalleInventarioColumns';
import useDetalleInventario from './hooks/useDetalleInventario';

export default function DetalleInventariosPage() {

  const { titulo, productos, isLoading } = useDetalleInventario();

  const columns = DetalleInventarioColumns();

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <DataTableComponent data={productos} loading={isLoading} columns={columns} keyField="rowKey" />
      </Contenido>
    </>
  );
}
