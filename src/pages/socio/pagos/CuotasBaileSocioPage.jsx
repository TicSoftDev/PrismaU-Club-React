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
    let documento;

    if (Number(rol) === 2 || Number(rol) === 3) {
        documento = useSelector(state => state.user.Documento);
    } else {
        documento = location?.state?.documento || null;
    }

    const { titulo, loading, listado, busqueda, openModal, user, cuota, preferencia, openFactura, factura, touched,
        getCuotasBaile, toggleModal, cargar, handleChange, pagoManual, crearPreferencia, cargarFactura,
        handleChangeCheck, toggleModalFactura, handleBusqueda, handleChangeImagen } = useCuotasBaile();

    const columns = CuotasBaileColumn({ cargar, cargarFactura });

    useEffect(() => {
        if (documento) {
            getCuotasBaile(documento);
            initMercadoPago('APP_USR-90ac2c5a-f087-419c-9e69-684aa12359ca', { locale: 'es-CO' });
        }
    }, [documento]);

    return (
        <>
            <TituloPage titulo={titulo} />
            <div className="mt-7">
                <MenuSencillo noCrear={true} busqueda={busqueda} handleBusqueda={handleBusqueda} />
                <DataTableComponent data={listado} columns={columns} loading={loading} />
            </div>
            <ModalSencillo size={'7xl'} openModal={openModal} cerrarModal={toggleModal} titulo={'Pagar Cuotas'} >
                {
                    (Number(rol) === 2 || Number(rol) === 3) ?
                        <>
                            <FormPagarCuota cuota={cuota} handleChange={handleChange} loading={loading} touched={touched}
                                handleChangeCheck={handleChangeCheck} pagar={crearPreferencia} />
                            {preferencia && <Wallet initialization={{ preferenceId: preferencia }}
                                customization={{ texts: { valueProp: 'smart_option' } }} />}
                        </> :
                        <FormPagoCuota cuota={cuota} documento={documento} loading={loading} pagar={pagoManual}
                            handleChange={handleChange} handleChangeImagen={handleChangeImagen}
                            touched={touched} handleChangeCheck={handleChangeCheck} />
                }
            </ModalSencillo>
            <ModalSencillo size={'full'} openModal={openFactura} cerrarModal={toggleModalFactura}
                titulo={'Detalle de pago'} >
                <FacturaPagoCuotas pago={factura} user={user} />
            </ModalSencillo>
        </>
    )
}
