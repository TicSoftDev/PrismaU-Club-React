import React from 'react';
import DataTable from 'react-data-table-component';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';
import { format } from 'date-fns';

function DataTableSolicitudes({ data, loading }) {

    const columns = [
        {
            name: "N°",
            cell: (row, i) => i + 1,
            width: '50px',
        },
        {
            name: "Nombre Completo",
            cell: row => row.Nombres + " " + row.Apellidos,
            width: '310px'
        },
        {
            name: "Identificación",
            selector: row => row.Identificacion,
            width: '150px',
        },
        {
            name: "Empresa",
            cell: row => row.Empresa,
            width: '200px'
        },
        {
            name: "Correo",
            cell: row => row.Correo,
            width: '300px'
        },
        {
            name: "Telefono",
            selector: row => row.Telefono,
        },
        {
            name: "Fecha",
            cell: row => format(new Date(row.created_at), 'dd/MM/yyyy'),
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

export default DataTableSolicitudes