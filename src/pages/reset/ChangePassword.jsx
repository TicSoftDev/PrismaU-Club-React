import React from 'react'
import { Link } from 'react-router-dom'
import imagen from '../../assets/img/imagen'
import ContainerReset from '../../components/reset/ContainerReset'
import useReset from '../../hooks/useReset'
import { PublicRoutes } from '../../models/RutasModel'
import Spinner from '../../utilities/spinner/Spinner'

function ChangePassword() {

    const { password, loading, handleChangePassword, cambiarPassword } = useReset()

    return (
        <ContainerReset>
            <div className='md:w-1/2 px-8 pt-8 flex flex-col w-full'>
                <div className="flex items-center flex-row sm:mb-8 mb-4">
                    <img alt='Logo' src={imagen.logoPrisma} className='w-8' />
                    <span className='text-lg ml-2 font-medium'>PrismaU</span>
                </div>
                <h1 className='text-4xl mb-5 sm:mb-10'>Cambiar contraseña</h1>
                <p className='text-lg'>Ingresa una nueva contraseña para recuperar tu cuenta</p>
            </div>
            <div className='md:w-1/2 px-8 pt-8 flex flex-col items-end justify-end w-full'>
                <div className="relative w-full my-auto">
                    <input type="text" id="documento" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "
                        onChange={handleChangePassword} value={password} />
                    <label htmlFor="documento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Nueva contraseña
                    </label>
                </div>
                <div className="flex flex-row my-5">
                    <Link to={PublicRoutes.LOGIN} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Cancelar</Link>
                    <button type='button' onClick={cambiarPassword} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {loading ? <Spinner /> : 'Actualizar'}
                    </button>
                </div>
            </div>
        </ContainerReset>
    )
}
3
export default ChangePassword