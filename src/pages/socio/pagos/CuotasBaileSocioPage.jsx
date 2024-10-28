import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FormPagarCuota from '../../../components/admin/pagos/pagar/FormPagarCuota';
import FormPagoCuota from '../../../components/admin/pagos/pagar/FormPagoCuota';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import FacturaPagoCuotas from '../../../components/socio/pagos/FacturaPagoCuotas';
import useCuotasBaile from '../../../hooks/useCuotasBaile';
import { CuotasBaileColumn } from '../../../models/columns/CuotasBaileColumn';
import DataTableComponent from '../../../utilities/dataTable/DataTableComponent';
import TituloPage from '../../../utilities/helpers/TituloPage';
import ModalSencillo from '../../../utilities/modals/ModalSencillo';

export default function CuotasBaileSocioPage() {

    const location = useLocation();
    const rol = useSelector(state => state.credenciales.Rol);
    const documento = (rol === 2 || rol === 3) ? useSelector(state => state.user.Documento) : location.state.documento;

    const { titulo, loading, listado, busqueda, openModal, user, cuota, preferencia, openFactura, factura,
        getCuotasBaile, toggleModal, cargar, handleChange, pagoManual, crearPreferencia, cargarFactura,
        toggleModalFactura, handleBusqueda, handleChangeImagen } = useCuotasBaile();

    const columns = CuotasBaileColumn({ cargar, cargarFactura });

    useEffect(() => {
        getCuotasBaile(documento);
        initMercadoPago('APP_USR-875d925e-726f-4b39-a039-b65c60392fe8', { locale: 'es-CO' });
    }, [documento])

    return (
        <>
            <TituloPage titulo={titulo} />
            <div className="mt-7">
                <MenuSencillo noCrear={true} busqueda={busqueda} handleBusqueda={handleBusqueda} />
                <DataTableComponent data={listado} columns={columns} loading={loading} />
            </div>
            <ModalSencillo size={'7xl'} openModal={openModal} cerrarModal={toggleModal} titulo={'Pagar Cuotas'} >
                {
                    (rol === 2 || rol === 3) ?
                        <>
                            <FormPagarCuota cuota={cuota} handleChange={handleChange} loading={loading}
                                pagar={crearPreferencia} />
                            {
                                preferencia && <Wallet initialization={{ preferenceId: preferencia }}
                                    customization={{ texts: { valueProp: 'smart_option' } }} />
                            }
                        </> :
                        <FormPagoCuota cuota={cuota} documento={documento} loading={loading} pagar={pagoManual}
                            handleChange={handleChange} handleChangeImagen={handleChangeImagen} />
                }
            </ModalSencillo>
            <ModalSencillo size={'full'} openModal={openFactura} cerrarModal={toggleModalFactura}
                titulo={'Detalle de pago'} >
                <FacturaPagoCuotas pago={factura} user={user} />
            </ModalSencillo>
        </>
    )
}
