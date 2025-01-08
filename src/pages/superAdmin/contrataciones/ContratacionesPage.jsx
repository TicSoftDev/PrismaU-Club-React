import React from 'react';
import useContrataciones from '../../../hooks/useContrataciones';
import ContratacionesColumn from '../../../models/columns/ContratacionesColumn';
import DataTableComponent from '../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../utilities/helpers/Contenido';
import TituloPage from '../../../utilities/helpers/TituloPage';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';

function ContratacionesPage() {

  const { titulo, lista, isLoading, busqueda, handleBusqueda } = useContrataciones();
  const columns = ContratacionesColumn();

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo noCrear={true} busqueda={busqueda} handleBusqueda={handleBusqueda} />
        <DataTableComponent data={lista} columns={columns} loading={isLoading} />
      </Contenido>
    </>
  );
}

export default ContratacionesPage