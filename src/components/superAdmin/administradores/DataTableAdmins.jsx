import React from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash, FaUser, FaUserSlash } from 'react-icons/fa';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableAdmins({ data, cargarAdmin, eliminar, loading, change }) {

    const columns = [
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <button onClick={() => cargarAdmin(row.admin)} className="rounded-full w-9 h-9 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => eliminar(row.id)} className="rounded-full w-9 h-9 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrash /></button>
                    <button onClick={() => change(row.admin.id)} className='rounded-full w-9 h-9 bg-yellow-400 text-white flex justify-center items-center' title={row.admin.Estado == 1 ? 'Inactivar' : 'Activar'}> {row.admin.Estado == 1 ? <FaUserSlash /> : <FaUser />}   </button>
                </div>
            ),
            width: '180px'
        },
        {
            name: "Estado",
            cell: row => (
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${row.admin.Estado == 1 ? 'bg-green-500' : 'bg-red-600'} mr-2`}></div>
                    {row.admin.Estado == 1 ? "Activo" : "Inactivo"}
                </div>
            ),
            width: '100px'
        },
        {
            name: "Nombre Completo",
            cell: row => row.admin.Nombre + " " + row.admin.Apellidos,
            width: '280px',
        },
        {
            name: "Teléfono",
            selector: row => row.admin.Telefono,
            width: '120px'
        },
        {
            name: "Correo",
            selector: row => row.admin.Correo,
            width: '250px'
        },
        {
            name: "Usuario",
            selector: row => row.Documento,

        },
    ];

    return (
        <div className="overflow-x-auto">
            <DataTable
                columns={columns}
                data={data}
                defaultSortFieldId={1}
                pagination
                progressPending={loading}
                progressComponent={<TableSkeleton />}
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay ningun administrador registrado</div>}
            />
        </div>
    );
}

export default DataTableAdmins;