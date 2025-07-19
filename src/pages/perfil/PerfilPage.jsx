import { useSelector } from 'react-redux';
import FormPerfil from '../../components/perfil/FormPerfil';
import useUsuario from '../../hooks/useUsuario';
import Container from '../../utilities/helpers/Container';
import TituloPage from '../../utilities/helpers/TituloPage';

function PerfilPage() {

    const titulo = "Perfil";
    const user = useSelector((state) => state.user);
    const credenciales = useSelector((state) => state.credenciales);
    const { usuario, cambiarClave, handleChange } = useUsuario();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <FormPerfil credenciales={credenciales} user={user} usuario={usuario} hanleChange={handleChange} change={cambiarClave} />
            </Container>
        </>
    );
}

export default PerfilPage;