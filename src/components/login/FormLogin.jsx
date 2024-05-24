import React from 'react';
import imagen from '../../assets/img/imagen';
import { FaEye, FaIdCard, FaKey } from 'react-icons/fa';
import Spinner from '../../utilities/spinner/Spinner';

function FormLogin({ loading, usuario, handleChange, handleSubmit, visible, toggleVisible }) {
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img src={imagen.logoPrisma} className="w-8 h-8 mr-2" alt="logo" />
                        PrismaU
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                Ingrese sus datos para iniciar sesión
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                                    <div className="relative mb-4">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <FaIdCard className='w-4 h-4 text-gray-500 dark:text-gray-400' />
                                        </div>
                                        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            name="Documento" value={usuario.Documento} onChange={handleChange} placeholder="Ej: 1234567890" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <FaKey className='w-4 h-4 text-gray-500 dark:text-gray-400' />
                                        </div>
                                        <input type={`${visible ? 'text' : 'password'}`} name="password" id="password" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={usuario.password} onChange={handleChange} placeholder="••••••••" required />
                                        <button onClick={toggleVisible} className="text-gray-500 absolute end-2.5 bottom-2.5 hover:text-blue-800 font-medium rounded-lg text-sm px-4 py-2">
                                            <FaEye className={`${visible && 'text-blue-600'}`} />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={handleSubmit} className='p-2 text-white flex justify-center items-center bg-blue-600 w-full'>
                                        {!loading ? 'Ingresar' : <Spinner />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FormLogin;