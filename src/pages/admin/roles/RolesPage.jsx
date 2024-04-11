import React from 'react';
import TablaRoles from '../../../components/admin/roles/TablaRoles';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function RolesPage() {

    const titulo = "Roles";

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <TablaRoles />
            </Container>
        </>
    );
}

export default RolesPage;