import React from 'react';
import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import usePagos from '../../../../hooks/usePagos';
import { PagosCuotasColumn } from '../../../../models/columns/PagosCuotasColumn';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Container from '../../../../utilities/helpers/Container';
import TituloPage from '../../../../utilities/helpers/TituloPage';

export default function HistorialPagosCuotasPage() {

    const titulo = 'Historial de pagos cuotas de baile';
    const { cuotasBaile, loading, busqueda, handleBusqueda } = usePagos();
    const columns = PagosCuotasColumn();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuSencillo noCrear={true} busqueda={busqueda} handleBusqueda={handleBusqueda} />
                <DataTableComponent data={cuotasBaile} loading={loading} columns={columns} />
            </Container>
        </>
    )
}
