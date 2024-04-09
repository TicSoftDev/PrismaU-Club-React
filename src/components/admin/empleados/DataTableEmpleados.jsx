import React from 'react'
import DataTable from 'react-data-table-component'
import { FaEdit, FaRegImages, FaTrash } from 'react-icons/fa';
import { RouteBack } from '../../../models/RutasModel';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

export default function DataTableEmpleados({ usuarios, cargarEmpleado, eliminar, loading, cargar }) {

    const columns = [
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <button onClick={() => cargarEmpleado(row.empleado)} className="rounded-full w-9 h-9 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => eliminar(row.id)} className="rounded-full w-9 h-9 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrash /></button>
                    <button onClick={() => cargar(row.empleado.id)} className="rounded-full w-9 h-9 bg-fuchsia-600 text-white flex justify-center items-center" title="Cambiar Imagen"><FaRegImages /></button>
                </div>
            ),
            width: '150px'
        },
        {
            name: "Estado",
            cell: row => (
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${row.empleado.Estado === "1" ? 'bg-green-500' : 'bg-red-600'} mr-2`}></div>
                    {row.empleado.Estado === "1" ? "Activo" : "Inactivo"}
                </div>
            ),
            width: '100px'
        },
        {
            name: "Nombre Completo",
            cell: row => (
                <div className="flex items-center space-x-3 w-full">
                    <div className="shrink-0">
                        {
                            row.empleado.imagen ?
                                <img className="w-10 h-10 rounded-full object-cover" src={RouteBack + row.empleado.imagen} alt="Imagen del empleado" /> :
                                row.empleado.Sexo === "Femenino" ?
                                    <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png" alt="Imagen predeterminada de mujer" />
                                    : <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Imagen predeterminada de hombre" />
                        }
                    </div>
                    <div className="flex-grow">
                        <div className="text-base font-semibold whitespace-normal">{row.empleado.Nombre}</div>
                        <div className="font-normal text-gray-500 whitespace-normal">{row.empleado.Apellidos}</div>
                    </div>
                </div>
            ),
            width: '280px',
            style: {
                padding: '10px'
            }
        },
        {
            name: "Teléfono",
            selector: row => row.empleado.Telefono,
            width: '120px'
        },
        {
            name: "Correo",
            selector: row => row.empleado.Correo,
            width: '250px'
        },
        {
            name: "Identificación",
            selector: row => row.empleado.Documento,

        },
    ];

    return (
        <div className="overflow-x-auto">
            <DataTable
                columns={columns}
                data={usuarios}
                defaultSortFieldId={1}
                pagination
                progressPending={loading}
                progressComponent={<TableSkeleton />}
                noDataComponent="No hay ningun empleado registrado"
            />
        </div>
    )
}
