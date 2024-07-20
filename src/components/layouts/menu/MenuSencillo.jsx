import React from 'react';
import { FaSearch, FaUserPlus } from 'react-icons/fa';

function MenuSencillo({ busqueda, handleBusqueda, toggleModal }) {
    return (
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">

            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button onClick={toggleModal} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-600 focus:z-10 focus:ring-2  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <FaUserPlus className='me-2' />
                    Crear
                </button>
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input type="text" id="table-search-users" onChange={handleBusqueda} value={busqueda} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-30 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..."></input>
            </div>
        </div>
    );
}

export default MenuSencillo