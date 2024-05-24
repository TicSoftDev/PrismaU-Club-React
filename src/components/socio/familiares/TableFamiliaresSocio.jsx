import React from 'react'
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function TableFamiliaresSocio({ familiares, loading }) {
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
                        <th scope="col" className="px-6 py-3">
                            Nombre Completo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Identificación
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Parentesco
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        familiares.length > 0 ?
                            familiares.map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user.Documento}>
                                    <th scope="row" className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white">
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
                                        {user.TipoDocumento + ' ' + user.Documento}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.Parentesco}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`h-2.5 w-2.5 rounded-full bg-${user.Estado == 1 ? 'green-500' : 'red-600'} me-2`}></div>
                                            {user.Estado == 1 ? "Activo" : "Inactivo"}
                                        </div>
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

export default TableFamiliaresSocio