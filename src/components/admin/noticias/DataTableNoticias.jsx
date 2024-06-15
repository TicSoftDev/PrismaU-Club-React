import React from 'react'
import DataTable from 'react-data-table-component';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';
import { FaEdit, FaTrash } from 'react-icons/fa';

function DataTableNoticias({ data, loading, editar, eliminar }) {

    const columns = [
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <button onClick={() => editar(row)} className="rounded-full w-9 h-9 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => eliminar(row.id)} className="rounded-full w-9 h-9 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrash /></button>
                </div>
            ),
            width: '200px'
        },
        {
            name: "Titulo",
            cell: row => row.Titulo,
        },
        {
            name: "Vencimiento",
            cell: row => row.Vencimiento,
        }
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
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay datos</div>}
                customStyles={customStyles}
            />
        </div>
    )
}

export default DataTableNoticias