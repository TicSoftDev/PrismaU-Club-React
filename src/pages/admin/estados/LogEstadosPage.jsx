import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import useEstados from '../../../hooks/useEstados';
import DataTableLogEstados from '../../../components/admin/estados/DataTableLogEstados';

function LogEstadosPage() {

    const { titulo, estados, loading } = useEstados();

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <DataTableLogEstados data={estados} loading={loading} />
            </Container>
        </Plantilla>
    );
}

export default LogEstadosPage;