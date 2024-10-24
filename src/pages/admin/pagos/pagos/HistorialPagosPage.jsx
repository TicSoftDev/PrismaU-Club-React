import React from 'react';
import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import usePagos from '../../../../hooks/usePagos';
import { PagosColumn } from '../../../../models/columns/PagosColumn';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Container from '../../../../utilities/helpers/Container';
import TituloPage from '../../../../utilities/helpers/TituloPage';

export default function HistorialPagosPage() {

    const titulo = 'Historial de pagos';
    const { mensualidades, loading, busqueda, handleBusqueda } = usePagos();
    const columns = PagosColumn();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuSencillo noCrear={true} busqueda={busqueda} handleBusqueda={handleBusqueda} />
                <DataTableComponent data={mensualidades} loading={loading} columns={columns} />
            </Container>
        </>
    )
}
