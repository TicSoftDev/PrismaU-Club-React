import React from 'react';
import { useLocation } from 'react-router-dom';
import RespuestasUsuarios from '../../../components/admin/encuestas/RespuestasUsuarios';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function RespuestasUserEncuestaPage() {

    const location = useLocation();
    const { encuesta } = location.state || {};
    const titulo = "Respuestas de la encuesta ";

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                {encuesta.respuestas.map((item) => (
                    <>
                        <RespuestasUsuarios pregunta={item.pregunta} respuesta={item.respuesta} />
                    </>
                ))}
            </Container>
        </>
    )
}

export default RespuestasUserEncuestaPage