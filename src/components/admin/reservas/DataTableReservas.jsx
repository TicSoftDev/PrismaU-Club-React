import { format, parse } from 'date-fns';
import React from 'react';
import DataTable from 'react-data-table-component';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableReservas({ data, loading }) {

    const columns = [
        {
            name: "N°",
            cell: (row, i) => i + 1,
            width: '50px',
        },
        {
            name: "Espacio",
            cell: row => row.espacio.Descripcion,
        },
        {
            name: "Fecha",
            cell: row => row.Fecha,
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
        {
            name: "Nombre completo",
            cell: row => row.user.asociado ?
                row.user.asociado.Nombre + " " + row.user.asociado.Apellidos :
                row.user.adherente.Nombre + " " + row.user.adherente.Apellidos,
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

export default DataTableReservas