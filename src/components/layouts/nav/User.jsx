import React from 'react';
import { useSelector } from 'react-redux';

function User({ toggleNav }) {

    const usuario = useSelector((state) => state.user);

    return (
        <div>
            <button onClick={toggleNav} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <div className="relative inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                        {usuario.Nombre.charAt(0) + usuario.Apellidos.charAt(0)}
                    </span>
                    <span className="bottom-0 left-6 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>

            </button>
        </div>
    );
}

export default User;