import React from 'react';
import TablaHobbies from '../../../components/admin/hobbies/TablaHobbies';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function HobbiesPage() {

    const titulo = 'Hobbies';

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <TablaHobbies />
            </Container>
        </>
    );
}

export default HobbiesPage;