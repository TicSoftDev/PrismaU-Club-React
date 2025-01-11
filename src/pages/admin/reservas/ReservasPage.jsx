import React from 'react';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useReservas from '../../../hooks/useReservas';
import DataTableComponent from '../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../utilities/helpers/Contenido';
import TituloPage from '../../../utilities/helpers/TituloPage';
import ReservasColumn from '../../../models/columns/ReservasColumn';

function ReservasPage() {

    const { titulo, isLoading, lista, busqueda, handleBusqueda } = useReservas();
    const columns = ReservasColumn();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Contenido>
                <MenuSencillo busqueda={busqueda} handleBusqueda={handleBusqueda} noCrear={true} />
                <DataTableComponent data={lista} loading={isLoading} columns={columns} />
            </Contenido>
        </>
    );
}

export default ReservasPage