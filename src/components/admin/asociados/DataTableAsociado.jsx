import { Button } from 'flowbite-react';
import React from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaRegImages, FaTrash, FaUserCheck, FaUserPlus, FaUserSlash } from 'react-icons/fa';
import { PrivateRoutes, RouteBack } from '../../../models/RutasModel';
import { useNavigate } from 'react-router-dom';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableAsociado({ usuarios, cargarAsociado, eliminar, loading, change, cargar }) {

    const navigate = useNavigate();
    const columns = [
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <Button onClick={() => cargarAsociado(row.personal)} className='rounded-full w-9 bg-blue-700 text-white' title='Editar' > <FaEdit /> </Button>
                    <Button onClick={() => eliminar(row.id)} className='rounded-full w-9 bg-red-600 text-white' title='Eliminar'> <FaTrash /> </Button>
                    <Button onClick={() => navigate(`${PrivateRoutes.FAMILIARES}/${row.personal.id}`)} className='rounded-full w-9 bg-green-600 text-white' title='Familiares'> <FaUserPlus /> </Button>
                    <Button onClick={() => change(row.personal.id)} className='rounded-full w-9 bg-yellow-400 text-white' title='Cambiar Estado'> {row.personal.Estado == 1 ? <FaUserSlash /> : <FaUserCheck />}  </Button>
                    <Button onClick={() => cargar(row.personal.id)} className='rounded-full w-9 bg-fuchsia-600 text-white' title='Cambiar Imagen'> <FaRegImages />  </Button>
                </div>
            ),
            width: '230px'
        },
        {
            name: "Estado",
            cell: row => (
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${row.personal.Estado == 1 ? 'bg-green-500' : 'bg-red-600'} mr-2`}></div>
                    {row.personal.Estado == 1 ? "Activo" : "Inactivo"}
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
                            row.personal.imagen ?
                                <img className="w-10 h-10 rounded-full object-cover" src={RouteBack + row.personal.imagen} alt="Imagen del personal" /> :
                                row.personal.Sexo == "Femenino" ?
                                    <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png" alt="Imagen predeterminada de mujer" />
                                    : <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Imagen predeterminada de hombre" />
                        }
                    </div>
                    <div className="flex-grow">
                        <div className="text-base font-semibold whitespace-normal">{row.personal.Nombre}</div>
                        <div className="font-normal text-gray-500 whitespace-normal">{row.personal.Apellidos}</div>
                    </div>
                </div>
            ),
            width: '280px',
            style: {
                padding: '10px'
            }
        },
        {
            name: "Identificación",
            selector: row => row.personal.Documento,

        },
        {
            name: "Correo",
            selector: row => row.personal.Correo,
            width: '250px'
        },
        {
            name: "Teléfono",
            selector: row => row.personal.Telefono,
            width: '120px'
        },
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={usuarios}
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay ningun asociado</div>}
                progressPending={loading}
                progressComponent={<TableSkeleton />}
                pagination
            />
        </>
    );
}

export default DataTableAsociado;