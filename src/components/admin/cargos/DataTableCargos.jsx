import React from 'react';
import DataTable from 'react-data-table-component'
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';
import { FaEdit, FaTrash } from 'react-icons/fa';

function DataTableCargos({ data, loading, cargar, eliminar }) {

    const columns = [
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <button onClick={() => cargar(row)}
                        className="rounded-full w-9 h-9 bg-blue-700 text-white flex justify-center items-center"
                        title="Editar"
                    >
                        <FaEdit />
                    </button>
                    <button onClick={() => eliminar(row.id)}
                        className="rounded-full w-9 h-9 bg-red-600 text-white flex justify-center items-center"
                        title="Eliminar"
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
        },
        {
            name: "Cargo",
            cell: row => row.Descripcion,
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
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay ningun cargo</div>}
            />
        </>
    );
}

export default DataTableCargos;