import React from 'react';
import useSolicitudes from '../../../hooks/useSolicitudes';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import DataTableSolicitudes from '../../../components/superAdmin/solicitudes/DataTableSolicitudes';

function SolicitudesPage() {

  const { titulo, lista, loading } = useSolicitudes();
  console.log(lista);
  return (
    <>
      <TituloPage titulo={titulo} />
      <Container>
        <DataTableSolicitudes data={lista} loading={loading} />
      </Container>
    </>
  );
}

export default SolicitudesPage