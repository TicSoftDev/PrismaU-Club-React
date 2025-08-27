import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FormPagar from '../../../components/admin/pagos/pagar/FormPagar';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import FacturaPago from '../../../components/socio/pagos/FacturaPago';
import FormMensualidad from '../../../components/socio/pagos/FormMensualidad';
import useMensualidades from '../../../hooks/useMensualidades';
import { MensualidadesColumn } from '../../../models/columns/MensualidadesColumn';
import DataTableComponent from '../../../utilities/dataTable/DataTableComponent';
import TituloPage from '../../../utilities/helpers/TituloPage';
import ModalSencillo from '../../../utilities/modals/ModalSencillo';

export default function MensualidadesSocioPage() {

    const location = useLocation();
    const rol = useSelector(state => state.credenciales.Rol);
    let documento;

    if (Number(rol) === 2 || Number(rol) === 3) {
        documento = useSelector(state => state.user.Documento);
    } else {
        documento = location?.state?.documento || null;
    }

    const { titulo, loading, listado, mensualidad, preferencia, openFactura, factura, user, openModal, busquedaAño, touched,
        toggleModal, handleChange, cargar, pagoManual, crearPreferencia, toggleModalFactura, cargarFactura,
        getMensualidadesUsuario, handleBusquedaAño, handleChangeCheck, handleChangeImagen } = useMensualidades();

    const columns = MensualidadesColumn(cargar, cargarFactura);

    useEffect(() => {
        if (documento) {
            getMensualidadesUsuario(documento);
            initMercadoPago('APP_USR-90ac2c5a-f087-419c-9e69-684aa12359ca', { locale: 'es-CO' });
        }
    }, [documento])

    return (
        <>
            <TituloPage titulo={titulo} />
            <div className="mt-7">
                <MenuSencillo noCrear={true} busqueda={busquedaAño} handleBusqueda={handleBusquedaAño} />
                <DataTableComponent columns={columns} data={listado} loading={loading} />
            </div>
            <ModalSencillo size={'7xl'} openModal={openModal} cerrarModal={toggleModal} titulo={'Pagar mensualidad'} >
                {
                    (Number(rol) === 2 || Number(rol) === 3) ?
                        <>
                            <FormMensualidad mensualidad={mensualidad} loading={loading} getPago={crearPreferencia}
                                touched={touched} handleChange={handleChange} handleChangeCheck={handleChangeCheck} />
                            {preferencia && <Wallet initialization={{ preferenceId: preferencia }}
                                customization={{ texts: { valueProp: 'smart_option' } }} />}
                        </> :
                        <FormPagar documento={documento} mensualidad={mensualidad} loading={loading} pagar={pagoManual}
                            handleChange={handleChange} handleChangeImagen={handleChangeImagen} touched={touched} handleChangeCheck={handleChangeCheck} />
                }
            </ModalSencillo>
            <ModalSencillo size={'full'} openModal={openFactura} cerrarModal={toggleModalFactura}
                titulo={'Detalle de pago'} >
                <FacturaPago pago={factura} user={user} />
            </ModalSencillo>
        </>
    )
}s
