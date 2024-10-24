import React from 'react';
import CardsSocios from '../../../../components/admin/pagos/CardsSocios';
import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import useMensualidades from '../../../../hooks/useMensualidades';
import { SociosColumn } from '../../../../models/columns/SociosColumn';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import TituloPage from '../../../../utilities/helpers/TituloPage';

export default function SociosPage() {

    const tituloSocios = 'Administración de socios';
    const { lista, busqueda, touched, loading, handleBusqueda, getSocios } = useMensualidades();
    const columns = SociosColumn();

    return (
        <>
            <TituloPage titulo={tituloSocios} />
            <CardsSocios consultar={getSocios} />
            {
                touched &&
                <div className="mt-7">
                    <MenuSencillo noCrear={true} busqueda={busqueda} handleBusqueda={handleBusqueda} />
                    <DataTableComponent columns={columns} data={lista} loading={loading} />
                </div>
            }
        </>
    )
}
