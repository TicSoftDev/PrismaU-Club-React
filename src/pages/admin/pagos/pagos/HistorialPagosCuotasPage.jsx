import React from 'react';
import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import usePagos from '../../../../hooks/usePagos';
import { PagosCuotasColumn } from '../../../../models/columns/PagosCuotasColumn';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Container from '../../../../utilities/helpers/Container';
import TituloPage from '../../../../utilities/helpers/TituloPage';
import PagosCuotasExcel from '../../../../components/admin/pagos/pagos/PagosCuotasExcel';

export default function HistorialPagosCuotasPage() {

    const titulo = 'Historial de pagos cuotas de baile';
    const { cuotasBaile, loading, busqueda, handleBusqueda } = usePagos();
    const columns = PagosCuotasColumn();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <PagosCuotasExcel data={cuotasBaile} fileName={'Cuotas de baile'} />
                <MenuSencillo noCrear={true} busqueda={busqueda} handleBusqueda={handleBusqueda} />
                <DataTableComponent data={cuotasBaile} loading={loading} columns={columns} />
            </Container>
        </>
    )
}
