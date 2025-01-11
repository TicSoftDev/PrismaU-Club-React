import React from 'react';
import { FaFilter, FaSearch, FaUserPlus } from 'react-icons/fa';
import ExportExcelAsociados from '../../admin/asociados/ExportExcelAsociados';

function MenuAsociados({ data, titulo, busqueda, handleBusqueda, toggleModal, filtro }) {

    return (
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button onClick={toggleModal} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-s-lg hover:bg-white hover:text-blue-600 hover:border-blue-600 focus:z-10 focus:ring-2  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <FaUserPlus className='me-2' />
                    Crear
                </button>
                <ExportExcelAsociados data={data} fileName={titulo} />
            </div>
             <div className="flex flex-col gap-1 sm:gap-0 md:flex-row w-full md:w-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FaFilter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <select className="p-2 ps-10 text-sm text-gray-900 border sm:border-r-0 border-gray-300 sm:rounded-s-lg w-30 bg-gray-50 focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => filtro(e.target.value)}>
                        <option value="Todos">Todas</option>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                        <option value="3">En Mora</option>
                        <option value="2">Retirado</option>
                        <option value="4">Retirado en Mora</option>
                    </select>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input type="text" id="table-search-users" onChange={handleBusqueda} value={busqueda} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 sm:rounded-e-lg w-30 sm:w-80 bg-gray-50 focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..."></input>
                </div>
            </div>
        </div>
    );
}

export default MenuAsociados