import { format, parse } from 'date-fns';
import { Button } from 'flowbite-react';
import React from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableDisponibilidades({ data, loading, editar, eliminar }) {

    const columns = [
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <Button onClick={() => editar(row)} className='rounded-full w-9 bg-blue-700 text-white' title='Editar' > <FaEdit /> </Button>
                    <Button onClick={() => eliminar(row.id)} className='rounded-full w-9 bg-red-600 text-white' title='Eliminar' > <FaTrashAlt /> </Button>
                </div>
            ),
            width: '150px',
        },
        {
            name: "Dia",
            cell: row => row.Dia,
        },
        {
            name: "Hora inicial",
            cell: row => {
                const parsedDate = parse(row.Inicio, 'HH:mm:ss', new Date());
                return format(parsedDate, 'hh:mm a');
            }
        },
        {
            name: "Hora final",
            cell: row => {
                const parsedDate = parse(row.Fin, 'HH:mm:ss', new Date());
                return format(parsedDate, 'hh:mm a');
            }
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#f9fafb',
                color: '#000',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
            },
        }
    };

    return (
        <div className="border border-gray-200 shadow w-full dark:border-gray-700 dark:bg-gray-800">
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

export default DataTableDisponibilidades;