import React from 'react';
import DataTableReservas from '../../../components/admin/reservas/DataTableReservas';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useReservas from '../../../hooks/useReservas';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function ReservasPage() {

    const { titulo, loading, lista, busqueda, handleBusqueda } = useReservas();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuSencillo busqueda={busqueda} handleBusqueda={handleBusqueda} noCrear={true} />
                <DataTableReservas data={lista} loading={loading} />
            </Container>
        </>
    );
}

export default ReservasPage