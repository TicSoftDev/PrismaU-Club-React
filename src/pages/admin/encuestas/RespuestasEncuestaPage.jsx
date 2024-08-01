import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardPreguntaRespuesta from '../../../components/admin/encuestas/CardPreguntaRespuesta';
import DataTableUsersEncuestas from '../../../components/admin/encuestas/DataTableUsersEncuestas';
import useEncuestas from '../../../hooks/useEncuestas';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function RespuestasEncuestaPage() {

    const location = useLocation();
    const { encuesta } = location.state || {};
    const { resultadoEncuesta, loading, getRespuestasEncuesta } = useEncuestas();
    useEffect(() => {
        getRespuestasEncuesta(encuesta.id)
    }, [encuesta.id])

    return (
        <>
            <TituloPage titulo={encuesta.Titulo} />
            <Container>
                <CardPreguntaRespuesta texto={encuesta.Descripcion} />
                <h3 className='text-lg mb-5 ml-2'>Usuarios que han respondido</h3>
                <DataTableUsersEncuestas data={resultadoEncuesta} loading={loading} />
            </Container>
        </>
    )
}

export default RespuestasEncuestaPage