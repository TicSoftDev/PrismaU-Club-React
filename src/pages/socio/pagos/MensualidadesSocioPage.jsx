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
    const documento = (rol === 2 || rol === 3) ? useSelector(state => state.user.Documento) : location.state.documento;

    const { titulo, loading, listado, mensualidad, preferencia, openFactura, factura, user, openModal, busquedaAño,
        toggleModal, handleChange, cargar, pagoManual, crearPreferencia, toggleModalFactura, cargarFactura,
        getMensualidadesUsuario, handleBusquedaAño } = useMensualidades();

    const columns = MensualidadesColumn(cargar, cargarFactura);

    useEffect(() => {
        getMensualidadesUsuario(documento);
        initMercadoPago('APP_USR-875d925e-726f-4b39-a039-b65c60392fe8', { locale: 'es-CO' });
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
                    (rol === 2 || rol === 3) ?
                        <>
                            <FormMensualidad mensualidad={mensualidad} loading={loading} getPago={crearPreferencia} />
                            {preferencia && <Wallet initialization={{ preferenceId: preferencia }}
                                customization={{ texts: { valueProp: 'smart_option' } }} />}
                        </> :
                        <FormPagar documento={documento} mensualidad={mensualidad} loading={loading} pagar={pagoManual}
                            handleChange={handleChange} />
                }
            </ModalSencillo>
            <ModalSencillo size={'full'} openModal={openFactura} cerrarModal={toggleModalFactura}
                titulo={'Detalle de pago'} >
                <FacturaPago pago={factura} user={user} />
            </ModalSencillo>
        </>
    )
}
