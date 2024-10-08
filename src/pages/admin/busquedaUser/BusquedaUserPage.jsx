import React from 'react';
import BotonLimpiar from '../../../components/admin/busquedaUser/BotonLimpiar';
import BuscadorUsuario from '../../../components/admin/busquedaUser/BuscadorUsuario';
import ResultadoBusqueda from '../../../components/admin/busquedaUser/ResultadoBusqueda';
import useUsuario from '../../../hooks/useUsuario';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Spinner from '../../../utilities/spinner/Spinner';

function BusquedaUserPage() {

    const { titulo, busqueda, userData, loading, handleChangeBusqueda, buscarUsuario, recargar } = useUsuario();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <BuscadorUsuario busqueda={busqueda} handleChange={handleChangeBusqueda} buscar={buscarUsuario} user={userData} />
                {loading ? (
                    <div className='flex justify-center items-center h-60'>
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {userData && (
                            <>
                                <ResultadoBusqueda user={userData} />
                                <BotonLimpiar recargar={recargar} />
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

export default BusquedaUserPage;
