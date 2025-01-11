import React from 'react';
import TablaHobbies from '../../../components/superAdmin/hobbies/TablaHobbies';
import Contenido from '../../../utilities/helpers/Contenido';
import TituloPage from '../../../utilities/helpers/TituloPage';

function HobbiesPage() {

    const titulo = 'Hobbies';

    return (
        <>
            <TituloPage titulo={titulo} />
            <Contenido>
                <TablaHobbies />
            </Contenido>
        </>
    );
}

export default HobbiesPage;