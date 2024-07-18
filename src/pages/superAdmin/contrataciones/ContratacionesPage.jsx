import React from 'react';
import DataTableContrataciones from '../../../components/superAdmin/contrataciones/DataTableContrataciones';
import useContrataciones from '../../../hooks/useContrataciones';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function ContratacionesPage() {

  const { titulo, lista, loading } = useContrataciones();
  return (
    <>
      <TituloPage titulo={titulo} />
      <Container>
        <DataTableContrataciones data={lista} loading={loading} />
      </Container>
    </>
  );
}

export default ContratacionesPage