import React from 'react';
import DataTable from 'react-data-table-component'
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';
import { format } from 'date-fns';

function DataTableLogEstados({ data, loading }) {

    const columns = [
        {
            name: "Nombre Completo",
            cell: row => row.user.asociado ?
                row.user.asociado.Nombre + " " + row.user.asociado.Apellidos :
                row.user.adherente.Nombre + " " + row.user.adherente.Apellidos,
            sortable: true,
            width: '300px'
        },
        {
            name: "Rol",
            cell: row => row.user.asociado ? "Asociado" : "Adherente",
            sortable: true,
            width: '120px'
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

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#379861',
                color: '#FFF',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
            },
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg shadow w-full dark:border-gray-700 dark:bg-gray-800">
            <DataTable
                columns={columns}
                data={data}
                defaultSortFieldId={1}
                pagination
                progressPending={loading}
                progressComponent={<TableSkeleton />}
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay nada en el historial</div>}
                customStyles={customStyles}
            />
        </div>
    );
}

export default DataTableLogEstados;