import { format } from 'date-fns';
import { Button } from 'flowbite-react';
import React from 'react';
import DataTable from 'react-data-table-component';
import { FaComment } from 'react-icons/fa';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableSolicitudes({ data, loading, responder }) {

    const columns = [
        {
            name: "N°",
            cell: (row, i) => i + 1,
            width: '50px',
        },
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <Button onClick={() => responder(row)} className='rounded-full w-9 bg-blue-700 text-white' title='Responder' > <FaComment /> </Button>
                </div>
            ),
            width: '90px',
        },
        {
            name: "Estado",
            cell: row => (
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${row.Estado == 0 ? 'bg-green-500' : 'bg-orange-500'} mr-2`}></div>
                    {row.Estado == 0 ? "Aprobada" : "Pendiente"}
                </div>
            ),
            width: '130px',
        },
        {
            cell: row => row.user.asociado ?
                row.user.asociado.Nombre + " " + row.user.asociado.Apellidos :
                row.user.adherente.Nombre + " " + row.user.adherente.Apellidos,
            width: '300px'
        },
        {
            name: "Tipo de solicitud",
            selector: row => row.Tipo,
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