import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import TablaRoles from '../../../components/admin/roles/TablaRoles';

function RolesPage() {

    const titulo = "Roles";
    
    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <TablaRoles />
            </Container>
        </Plantilla>
    );
}

export default RolesPage;