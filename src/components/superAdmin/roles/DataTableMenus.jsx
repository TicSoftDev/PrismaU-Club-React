import React from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableMenus({ data, loading, cargar, eliminar }) {

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
                    <button onClick={() => cargar(row)} className="rounded-full w-9 h-9 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => eliminar(row.id)} className="rounded-full w-9 h-9 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrash /></button>
                </div>
            ),
            width: '160px'
        },
        {
            name: "Label",
            cell: row => row.Name,
        },
        {
            name: "Tipo",
            cell: row => row.Type,
        },
        {
            name: "Ruta",
            cell: row => row.Route,
        },
        {
            name: "Icono",
            cell: row => (<i className={`fa fa-${row.Icon} text-lg`}></i>),
        },
        {
            name: "Color",
            cell: row => (<div className={`w-6 h-6 rounded-full bg-${row.Color}`}></div>),
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#f2f2f2',
                color: '#000',
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
    );
}

export default DataTableMenus