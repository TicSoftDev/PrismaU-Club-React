import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react';
import DataTable from 'react-data-table-component';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableAccesos({ entradas, loading }) {

    const columns = [
        {
            name: "Nombre Completo",
            cell: row => {
                if (row.user.asociado) {
                    return row.user.asociado.Nombre + " " + row.user.asociado.Apellidos;
                } else if (row.user.adherente) {
                    return row.user.adherente.Nombre + " " + row.user.adherente.Apellidos;
                } else if (row.user.familiar) {
                    return row.user.familiar.Nombre + " " + row.user.familiar.Apellidos;
                } else if (row.user.empleado) {
                    return row.user.empleado.Nombre + " " + row.user.empleado.Apellidos;
                } else {
                    return "No disponible";
                }
            },
            sortable: true,
        },
        {
            name: "Rol",
            cell: row => {
                if (row.user.asociado) {
                    return "Asociado";
                } else if (row.user.adherente) {
                    return "Adherente";
                } else if (row.user.familiar) {
                    return "Familiar";
                } else if (row.user.empleado) {
                    return "Empleado";
                } else {
                    return "No disponible";
                }
            },
            sortable: true,
        },
        {
            name: "Fecha",
            cell: row => format(new Date(row.created_at), "d 'de' MMMM 'de' yyyy, h:mm a", { locale: es })
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
                data={entradas}
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

export default DataTableAccesos