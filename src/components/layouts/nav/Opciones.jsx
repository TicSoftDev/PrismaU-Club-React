import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PrivateRoutes } from '../../../models/RutasModel';

function Opciones({ open, logout }) {

    const credenciales = useSelector((state) => state.credenciales);
    const usuario = useSelector((state) => state.user);

    if (open) {
        return (
            <div className="z-50 w-60 absolute top-11 right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <div className="px-4 py-3 text-end" role="none">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {credenciales.Rol == "1" ? 'Administrador' : credenciales.Rol == "2" ? "Asociado" : "Adherente"}
                    </span>
                </div>
                <ul className="py-1" role="none">
                    <li>
                        <Link to={PrivateRoutes.PERFIL} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                            <i className="fas fa-user-circle mr-2"></i> Perfil
                        </Link>
                    </li>
                    <li>
                        <Link onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                            <i className="fas fa-sign-out-alt mr-2"></i> Salir
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Opciones;