import React from 'react';

function TablaRoles() {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table id="myTable" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Codigo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descripcion
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4">
                            Administrador
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                            2
                        </td>
                        <td className="px-6 py-4">
                            Asociado
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                            3
                        </td>
                        <td className="px-6 py-4">
                            Adherente
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                            4
                        </td>
                        <td className="px-6 py-4">
                            Empleado
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                            5
                        </td>
                        <td className="px-6 py-4">
                            Familiar
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TablaRoles;