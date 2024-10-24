import React from 'react';
import BotonLimpiar from '../../../../components/admin/busquedaUser/BotonLimpiar';
import BuscadorUsuario from '../../../../components/admin/busquedaUser/BuscadorUsuario';
import ResultadoBusqueda from '../../../../components/admin/busquedaUser/ResultadoBusqueda';
import MenuPagos from '../../../../components/admin/pagos/pagar/MenuPagos';
import useCuotasBaile from '../../../../hooks/useCuotasBaile';
import useMensualidades from '../../../../hooks/useMensualidades';
import useUsuario from '../../../../hooks/useUsuario';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import Spinner from '../../../../utilities/spinner/Spinner';

function PagarPage() {

    const titulo = 'Pagar';
    const { busqueda, userData, loading, handleChangeBusqueda, buscarUsuario, recargar } = useUsuario();
    const { goMensualidades } = useMensualidades();
    const { goCuotasBaile } = useCuotasBaile();

    return (
        <>
            <TituloPage titulo={titulo} />
            <div className="mt-5">
                <BuscadorUsuario buscar={buscarUsuario} busqueda={busqueda} handleChange={handleChangeBusqueda} />
                {
                    loading ? (
                        <div className='flex justify-center items-center h-60'>
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            {
                                userData && (
                                    <>
                                        <ResultadoBusqueda user={userData} />
                                        <div className="flex justify-between">
                                            <MenuPagos cuotas={goCuotasBaile} mensualidades={goMensualidades} user={userData.user} />
                                            <BotonLimpiar recargar={recargar} />
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default PagarPage