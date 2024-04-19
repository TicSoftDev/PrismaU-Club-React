import React from 'react';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import TablaHobbies from '../../../components/superAdmin/hobbies/TablaHobbies';

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