import React from 'react'
import useUsuario from '../../../hooks/useUsuario'
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import BuscadorUsuario from '../../../components/admin/busquedaUser/BuscadorUsuario';
import ResultadoBusqueda from '../../../components/admin/busquedaUser/ResultadoBusqueda';
import BotonLimpiar from '../../../components/admin/busquedaUser/BotonLimpiar';

function BusquedaUserPage() {

    const { titulo, busqueda, userData, loading, handleChangeBusqueda, buscarUsuario, recargar } = useUsuario();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <BuscadorUsuario busqueda={busqueda} handleChange={handleChangeBusqueda} buscar={buscarUsuario} user={userData} />
                {userData && <>
                    <ResultadoBusqueda user={userData} loading={loading} />
                    <BotonLimpiar recargar={recargar} />
                </>}

            </Container>
        </>
    )
}

export default BusquedaUserPage