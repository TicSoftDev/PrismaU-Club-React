import React from 'react'
import { FaSearch } from 'react-icons/fa';

function FiltroAccesos({ busqueda, handleBusqueda }) {

    return (
        <div className="flex flex-col py-4">
            <label htmlFor="table-search-users" className="text-sm font-medium text-gray-900 pb-2">Escoja una fecha para filtrar</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                    type="date"
                    id="table-search-users"
                    onChange={handleBusqueda}
                    value={busqueda}
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-30 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar..."
                />
            </div>
        </div>
    );
}

export default FiltroAccesos