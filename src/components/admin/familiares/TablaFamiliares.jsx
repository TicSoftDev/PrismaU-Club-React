import { Button } from 'flowbite-react';
import { FaEdit, FaLock, FaRegImages, FaTrash } from 'react-icons/fa';
import { RouteBack } from '../../../models/RutasModel';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function TablaFamiliares({ usuarios, cargarEmpleado, eliminar, loading, cargar, reset }) {

    if (loading) {
        return (
            <TableSkeleton />
        );
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table id="myTable" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase dark:bg-gray-700 dark:text-gray-400" style={{ backgroundColor: "#379861" }}>
                    <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nombre Completo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Código
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Identificación
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Parentesco
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.length > 0 ?
                            usuarios.map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user.Documento}>
                                    <td className="px-6">
                                        <div className='flex'>
                                            <Button onClick={() => cargarEmpleado(user)} className='rounded-full w-9 bg-blue-700 text-white' title='Editar' > <FaEdit /> </Button>
                                            <Button onClick={() => eliminar(user.user_id)} className='rounded-full w-9 bg-red-600 text-white' title='Eliminar'> <FaTrash /> </Button>
                                            <Button onClick={() => cargar(user.id)} className='rounded-full w-9 bg-fuchsia-600 text-white' title='Cambiar Imagen'> <FaRegImages />  </Button>
                                            <Button onClick={() => reset(user.user_id)} className='rounded-full w-9 bg-yellow-500 text-white' title='Resetear Contraseña'> <FaLock />  </Button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`h-2.5 w-2.5 rounded-full ${user.Estado == 1 ? 'bg-green-500' : user.Estado == 2 ? 'bg-orange-500' : user.Estado == 3 ? 'bg-purple-500' : 'bg-red-600'} mr-2`}></div>
                                            {user.Estado == 0 ? "Inactivo" : user.Estado == 1 ? "Activo" : user.Estado == 2 ? "Retirado" : "En Mora"}
                                        </div>
                                    </td>
                                    <th scope="user" className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {
                                            user.imagen ? <img className="w-10 h-10 rounded-full" src={RouteBack + user.imagen} alt="Jese image" /> :
                                                user.Sexo == "Femenino" ?
                                                    <img className="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png" alt="Jese image" />
                                                    : <img className="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Jese image" />
                                        }
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{user.Nombre}</div>
                                            <div className="font-normal text-gray-500">{user.Apellidos}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.Codigo ? user.Codigo : "Sin Asignar"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.TipoDocumento + ' ' + user.Documento}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.Parentesco}
                                    </td>
                                </tr>
                            )) :
                            <tr className='h-20'>
                                <td colSpan={10} className='text-center font-bold text-lg'>No hay datos</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TablaFamiliares;