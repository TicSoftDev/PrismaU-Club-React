import { useMemo } from 'react';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../../utilities/helpers/Contenido';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import HeaderPreinventario from './components/HeaderPreinventario';
import { ProductosColumns } from './components/ProductosColumns';
import useDetallePreinventario from './hooks/useDetallePreinventario';

export default function DetallePreinventariosPage() {

  const { titulo, productos, isLoading, isPending, totalSeleccionados, toggleIncluir, changeCantidad, guardar } = useDetallePreinventario();

  const columns = useMemo(() => ProductosColumns({ toggleIncluir, changeCantidad }), [toggleIncluir, changeCantidad]);

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <HeaderPreinventario total={totalSeleccionados} loading={isPending} guardar={guardar} />
        <DataTableComponent data={productos} loading={isLoading} columns={columns} keyField="rowKey" />
      </Contenido>
    </>
  );
}
