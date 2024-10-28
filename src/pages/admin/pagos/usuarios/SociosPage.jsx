import React from 'react';
import MenuSencillo from '../../../../components/layouts/menu/MenuSencillo';
import useCuotasBaile from '../../../../hooks/useCuotasBaile';
import useMensualidades from '../../../../hooks/useMensualidades';
import useUsuario from '../../../../hooks/useUsuario';
import { SociosColumn } from '../../../../models/columns/SociosColumn';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import TituloPage from '../../../../utilities/helpers/TituloPage';

export default function SociosPage() {

    const tituloSocios = 'Administración de socios';
    const { lista, busqueda, loading, handleChangeBusqueda, consultarSocios } = useUsuario();
    const { valorMensualidad, editingMensualidad, loading: loadingMensualidad, handleEditMensualidad, handleSaveMensualidad,
        handleCancelMensualidad, setValorMensualidad } = useMensualidades(consultarSocios);
    const { valorCuota, editingCuotaBaile, loading: loadingCuotaBaile, handleEditCuotaBaile, handleSaveCuotaBaile,
        handleCancelCuotaBaile, setValorCuota } = useCuotasBaile(consultarSocios);
    const columns = SociosColumn({
        editingMensualidad, valorMensualidad, loadingMensualidad, handleEditMensualidad, handleSaveMensualidad,
        handleCancelMensualidad, setValorMensualidad,
        editingCuotaBaile, valorCuota, loadingCuotaBaile, handleEditCuotaBaile, handleSaveCuotaBaile,
        handleCancelCuotaBaile, setValorCuota
    });

    return (
        <>
            <TituloPage titulo={tituloSocios} />
            <MenuSencillo noCrear={true} busqueda={busqueda} handleBusqueda={handleChangeBusqueda} />
            <DataTableComponent columns={columns} data={lista} loading={loading} />
        </>
    )
}
