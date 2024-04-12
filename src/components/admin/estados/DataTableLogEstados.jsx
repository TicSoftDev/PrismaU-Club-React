import React from 'react';
import DataTable from 'react-data-table-component'
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';
import { format } from 'date-fns';

function DataTableLogEstados({ data, loading }) {
    const columns = [
        {
            name: "Asociado",
            cell: row => row.personal.Nombre + " " + row.personal.Apellidos,
            sortable: true,
            width: '280px'
        },
        {
            name: "Fecha",
            cell: row => format(new Date(row.created_at), 'dd/MM/yyyy'),
            width: '120px',
        },
        {
            name: "Motivo",
            selector: row => row.Motivo,
        },
        {
            name: "Estado",
            selector: row => row.Estado,
            width: '120px',
        },
    ];
    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                defaultSortFieldId={1}
                pagination
                progressPending={loading}
                progressComponent={<TableSkeleton />}
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay nada en el historial</div>}
            />
        </>
    );
}

export default DataTableLogEstados;