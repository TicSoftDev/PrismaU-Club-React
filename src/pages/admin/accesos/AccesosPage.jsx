import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import useAccesos from '../../../hooks/useAccesos';

function AccesosPage() {

    const { titulo } = useAccesos();

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <h1>Proximamente</h1>
            </Container>
        </Plantilla>
    );
}

export default AccesosPage;