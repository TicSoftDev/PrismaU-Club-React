import { Dropdown } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import imagen from '../../../assets/img/imagen';
import { PrivateRoutes } from '../../../models/RutasModel';

const Navbar = React.memo(({ toggleAside, usuario, credenciales, logout }) => {

    const toggleDropdown = (usuario) => {
        return (
            <div className="relative inline-flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                    {usuario.Nombre.charAt(0) + usuario.Apellidos.charAt(0)}
                </span>
                <span className="bottom-0 left-6 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
        );
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleAside}>
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <p className="flex ms-2 md:me-24">
                            <img src={imagen.logoPrisma} className="h-8 me-3" alt="FlowBite Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">PrismaU</span>
                        </p>
                    </div>
                    <div className="flex items-center ms-3">
                        <div className="flex items-center ms-3">
                            <Dropdown inline label={toggleDropdown(usuario)} arrowIcon={false} className='w-60'>
                                <Dropdown.Item>
                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                        {credenciales.Rol == 0 ? 'Super Administrador' : credenciales.Rol == 1 ? 'Administrador' : credenciales.Rol == 2 ? "Asociado" : "Adherente"}
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to={PrivateRoutes.PERFIL} className="block px-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <i className="fas fa-user-circle mr-2"></i> Perfil
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link onClick={logout} className="block px-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <i className="fas fa-sign-out-alt mr-2"></i> Salir
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
})

export default React.memo(Navbar);