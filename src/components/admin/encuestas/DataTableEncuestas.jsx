import { Button } from 'flowbite-react';
import React from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaQuestion, FaTrashAlt } from 'react-icons/fa';
import { FaChartColumn } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../../models/RutasModel';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableEncuestas({ data, loading, editar, eliminar, rol }) {

    const navigate = useNavigate();

    const columns = [
        {
            name: "N°",
            cell: (row, i) => i + 1,
            width: '40px',
        },
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <Button onClick={() => editar(row)} className='rounded-full w-9 bg-blue-700 text-white' title='Editar' > <FaEdit /> </Button>
                    {rol == 0 && <Button onClick={() => eliminar(row.id)} className='rounded-full w-9 bg-red-600 text-white' title='Eliminar' > <FaTrashAlt /> </Button>}
                    <Button onClick={() => navigate(PrivateRoutes.PREGUNTAS, { state: { id: row.id } })} className='rounded-full w-9 bg-purple-600 text-white' title='Preguntas' > <FaQuestion /> </Button>
                    <Button onClick={() => navigate(PrivateRoutes.ENCUESTA, { state: { encuesta: row } })} className='rounded-full w-9 bg-purple-600 text-white' title='Preguntas' > <FaChartColumn /> </Button>
                </div>
            ),
            width: '150px',
        },
        {
            name: "Preguntas",
            cell: row => row.preguntas_count,
            width: '110px',
        },
        {
            name: "Titulo",
            cell: row => row.Titulo,
            width: '250px',
        },
        {
            name: "Descripción",
            cell: row => row.Descripcion,
            style: {
                padding: '10px'
            }
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
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay nada en el historial</div>}
                customStyles={customStyles}
            />
        </div>
    );
}

export default DataTableEncuestas