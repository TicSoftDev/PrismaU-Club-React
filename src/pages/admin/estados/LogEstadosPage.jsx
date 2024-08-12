import React from 'react';
import DataTableLogEstados from '../../../components/admin/estados/DataTableLogEstados';
import FiltroEstados from '../../../components/admin/estados/FiltroEstados';
import useEstados from '../../../hooks/useEstados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function LogEstadosPage() {

    const { titulo, lista, loading, busqueda, handleBusqueda } = useEstados();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <FiltroEstados busqueda={busqueda} handleBusqueda={handleBusqueda} />
                <DataTableLogEstados data={lista} loading={loading} />
            </Container>
        </>
    );
}

export default LogEstadosPage;