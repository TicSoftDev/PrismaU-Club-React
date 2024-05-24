import React from 'react';
import DataTable from 'react-data-table-component'
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';
import { format } from 'date-fns';

function DataTableInvitaciones({ data, loading }) {

    const columns = [
        {
            name: "Fecha",
            cell: row => format(new Date(row.created_at), 'dd/MM/yyyy'),
            width: '120px',
        },
        {
            name: "Nombre completo",
            cell: row => row.Nombre + " " + row.Apellidos,
            width: '280px',
        },
        {
            name: "Teléfono",
            selector: row => row.Telefono,
            width: '150px',
            sortable: true
        },
        {
            name: "Identificación",
            selector: row => row.Documento,
            width: '180px',
            sortable: true
        },
        {
            name: "Invitado por",
            cell: row => row.user.asociado ?
                row.user.asociado.Nombre + " " + row.user.asociado.Apellidos :
                row.user.adherente.Nombre + " " + row.user.adherente.Apellidos,
            sortable: true,
        },
        {
            name: "Rol",
            cell: row => row.user.asociado ? "Asociado" : "Adherente",
            sortable: true,
            width: '120px'
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
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay ninguna invitación</div>}
                customStyles={customStyles}
            />
        </div>
    );
}

export default DataTableInvitaciones;