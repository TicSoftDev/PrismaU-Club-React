import React from 'react';
import useAccesos from '../../../hooks/useAccesos';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function AccesosPage() {

    const { titulo } = useAccesos();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <h1>Proximamente</h1>
            </Container>
        </>
    );
}

export default AccesosPage;