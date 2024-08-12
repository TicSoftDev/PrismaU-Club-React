import React from 'react';
import DataTableAccesos from '../../../components/admin/accesos/DataTableAccesos';
import FiltroAccesos from '../../../components/admin/accesos/FiltroAccesos';
import useAccesos from '../../../hooks/useAccesos';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function AccesosPage() {

    const { titulo, entradas, loading, busqueda, handleBusqueda } = useAccesos();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <FiltroAccesos busqueda={busqueda} handleBusqueda={handleBusqueda} />
                <DataTableAccesos entradas={entradas} loading={loading} />
            </Container>
        </>
    );
}

export default AccesosPage;