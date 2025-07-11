import { Button } from 'flowbite-react';
import React from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaLock, FaRegImages, FaTrash, FaUserCog, FaUserPlus, FaUserSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, RouteBack } from '../../../models/RutasModel';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableAdherente({ usuarios, rol, cargarAdherente, eliminar, loading, change, cambiar, cargar, reset }) {

    const navigate = useNavigate();
    const columns = [
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <Button onClick={() => cargarAdherente(row)} className='rounded-full w-9 bg-blue-700 text-white' title='Editar'> <FaEdit /> </Button>
                    {rol == 0 && <Button onClick={() => eliminar(row.user_id)} className='rounded-full w-9 bg-red-600 text-white' title='Eliminar'> <FaTrash /> </Button>}
                    <Button onClick={() => navigate(PrivateRoutes.FAMILIARESADHERENTE, { state: { id: row.id, codigo: row.Codigo, estado: row.Estado } })} className='rounded-full w-9 bg-pink-600 text-white' title='Agregar Familiar'> <FaUserPlus /> </Button>
                    <Button onClick={() => change(row.id)} className='rounded-full w-9 bg-yellow-400 text-white' title='Cambiar estado'> <FaUserSlash />  </Button>
                    <Button onClick={() => cambiar(row.user_id)} className='rounded-full w-9 bg-purple-600 text-white' title='Hacer Asociado'> <FaUserCog /> </Button>
                    <Button onClick={() => cargar(row.id)} className='rounded-full w-9 bg-fuchsia-600 text-white' title='Cambiar Imagen'> <FaRegImages />  </Button>
                    <Button onClick={() => reset(row.user_id)} className='rounded-full w-9 bg-red-600 text-white' title='Resetear Contraseña'> <FaLock />  </Button>
                </div>
            ),
            width: '270px'
        },
        {
            name: "Familiares",
            cell: row => (
                <div className="flex justify-center items-center w-full">
                    <span className="bg-purple-100 text-purple-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                        {row.familiares_count}
                    </span>
                </div>
            ),
            width: '120px'
        },
        {
            name: "Estado",
            cell: row => (
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${row.Estado == 1 ? 'bg-green-500' : row.Estado == 2 ? 'bg-orange-500' : row.Estado == 3 ? 'bg-purple-500' : row.Estado == 4 ? 'bg-black' : 'bg-red-600'} mr-2`}></div>
                    {row.Estado == 0 ? "Inactivo" : row.Estado == 1 ? "Activo" : row.Estado == 2 ? "Retirado" : row.Estado == 3 ? "En Mora" :  "Retirado en Mora"}
                </div>
            ),
            width: '150px',
        },
        {
            name: "Nombre Completo",
            cell: row => (
                <div className="flex items-center space-x-3 w-full">
                    <div className="shrink-0">
                        {
                            row.imagen ?
                                <img className="w-10 h-10 rounded-full object-cover" src={RouteBack + row.imagen} alt="Imagen del" /> :
                                row.Sexo == "Femenino" ?
                                    <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png" alt="Imagen predeterminada de mujer" />
                                    : <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Imagen predeterminada de hombre" />
                        }
                    </div>
                    <div className="flex-grow">
                        <div className="text-base font-semibold whitespace-normal">{row.Nombre}</div>
                        <div className="font-normal text-gray-500 whitespace-normal">{row.Apellidos}</div>
                    </div>
                </div>
            ),
            width: '280px',
            style: {
                padding: '10px'
            }
        },
        {
            name: "Código",
            selector: row => row.Codigo ? row.Codigo : (
                <span className="bg-red-300 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Sin asignar
                </span>
            ),
            width: '150px'
        },
        {
            name: "Identificación",
            selector: row => row.Documento,

        },
        {
            name: "Correo",
            selector: row => row.Correo,
            width: '270px'
        },
        {
            name: "Teléfono",
            selector: row => row.Telefono,
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
                data={usuarios}
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay ningun adherente</div>}
                progressPending={loading}
                progressComponent={<TableSkeleton />}
                pagination
                customStyles={customStyles}
            />
        </div>
    );
}

export default DataTableAdherente;