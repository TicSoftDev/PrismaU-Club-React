import React from 'react';
import DataTableLogEstados from '../../../components/admin/estados/DataTableLogEstados';
import useEstados from '../../../hooks/useEstados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function LogEstadosPage() {

    const { titulo, estados, loading } = useEstados();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <DataTableLogEstados data={estados} loading={loading} />
            </Container>
        </>
    );
}

export default LogEstadosPage;