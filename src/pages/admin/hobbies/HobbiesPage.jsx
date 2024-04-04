import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import TablaRoles from '../../../components/admin/hobbies/TablaHobbies';
import TablaHobbies from '../../../components/admin/hobbies/TablaHobbies';

function HobbiesPage() {

    const titulo = 'Hobbies';

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <TablaHobbies />
            </Container>
        </Plantilla>
    );
}

export default HobbiesPage;