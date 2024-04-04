import React from 'react';
import Plantilla from '../../components/layouts/Plantilla';
import TituloPage from '../../utilities/helpers/TituloPage';
import Container from '../../utilities/helpers/Container';
import { useSelector } from 'react-redux';
import FormPerfil from '../../components/perfil/FormPerfil';
import useUsuario from '../../hooks/useUsuario';

function PerfilPage() {

    const titulo = "Perfil";
    const user = useSelector((state) => state.user);
    const { usuario, cambiarClave, handleChange } = useUsuario();

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <FormPerfil user={user} usuario={usuario} hanleChange={handleChange} change={cambiarClave} />
            </Container>
        </Plantilla>
    );
}

export default PerfilPage;