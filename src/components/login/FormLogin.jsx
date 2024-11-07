import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { DiAndroid } from 'react-icons/di';
import { FaEye, FaIdCard, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import imagen from '../../assets/img/imagen';
import { PublicRoutes } from '../../models/RutasModel';
import Spinner from '../../utilities/spinner/Spinner';

function FormLogin({ loading, usuario, handleChange, handleSubmit, visible, toggleVisible }) {

    return (
        <div className="md:w-1/2 p-8 flex flex-col items-start justify-center w-full">
            <div className="space-y-4 w-full">
                <div className="flex items-center justify-center md:justify-start">
                    <img src={imagen.logoPrisma} alt='Logo' className='w-12 h-12 mr-2 md:hidden' />
                    <h1 className="text-3xl font-bold">PrismaU</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Ingresa tus credenciales para acceder a tu cuenta.</p>
            </div>
            <form className="w-full space-y-4 mt-6">
                <div>
                    <Label htmlFor="usuario">Usuario</Label>
                    <TextInput icon={FaIdCard} id="usuario" name="Documento" value={usuario.Documento}
                        onChange={handleChange} placeholder="Ej: 1234567890" />
                </div>
                <div className="relative">
                    <Label htmlFor="password">Contraseña</Label>
                    <TextInput icon={FaLock} id="password" type={`${visible ? 'text' : 'password'}`} name="password"
                        value={usuario.password} onChange={handleChange} placeholder="••••••••" />
                    <button type="button" onClick={toggleVisible} className="absolute text-gray-500 end-0 bottom-1 hover:text-blue-800 font-medium rounded-lg text-lg px-4 py-2">
                        <FaEye className={`${visible && 'text-blue-600'}`} />
                    </button>
                </div>
                <div className="pt-4">
                    <Button type="submit" className="w-full" onClick={handleSubmit}>
                        {!loading ? 'Ingresar' : <Spinner />}
                    </Button>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-500 dark:text-gray-400">
                    <Link to={PublicRoutes.RECUPERAR} className="text-gray-500 font-medium hover:underline dark:text-gray-50">
                        Olvidé mi contraseña.
                    </Link>
                    {/* <Link to="https://archivos.prismau.co/PrismaU.apk" target='_blank' className="flex items-center justify-center border-2 border-green-500 p-1 w-40 mt-6 text-base text-green-500 font-medium hover:bg-green-500 hover:text-gray-50 dark:text-gray-50">
                        <DiAndroid size={20} className='me-1' />
                        Descargar app
                    </Link> */}
                </div>
            </form>
        </div>
    )
}

export default FormLogin;
