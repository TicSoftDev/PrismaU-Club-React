import { Label, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCode, FaEnvelope, FaIdCard, FaKeyboard, FaMercury, FaPhoneAlt, FaUserCog } from 'react-icons/fa';
import { RouteBack } from '../../../models/RutasModel';
import Spinner from '../../../utilities/spinner/Spinner';

function ResultadoBusqueda({ user, loading }) {

    const handleNull = value => value ? value : '';
    const translateRole = (roleId) => {
        const roles = {
            2: "Asociado", 3: "Adherente", 4: "Empleado", 5: "Familiar", 6: "Portero"
        };
        return roles[roleId] || "Desconocido";
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center h-60'>
                <Spinner />
            </div>
        )
    }

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col lg:flex-row max-w-full dark:border-gray-700 dark:bg-gray-800 mt-2">
                <div className="flex flex-col items-center p-4">
                    <img className="object-cover w-28 h-28 sm:w-40 sm:h-40 rounded-full mb-2 border-2" alt="Perfil"
                        src={user.user.imagen ? `${RouteBack + user.user.imagen}` : user.Sexo === "Femenino" ?
                            "https://cdn-icons-png.flaticon.com/128/4140/4140047.png" :
                            "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"} />
                    <div className="mt-5 w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="estado" value="Estado" />
                        </div>
                        <TextInput id="estado" type="text" value={handleNull(user.user.Estado) == 1 ? "ACTIVO" : "INACTIVO"} disabled />
                    </div>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="nombres" value="Nombre Completo" />
                            </div>
                            <TextInput id="nombres" type="text" icon={FaKeyboard} value={handleNull(user.user.Nombre) + " " + handleNull(user.user.Apellidos)} disabled />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="codigo" value="Código" />
                            </div>
                            <TextInput id="codigo" type="text" icon={FaCode} value={handleNull(user.user.Codigo)} disabled />
                        </div>
                    </div>
                    <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                        <div className="w-full sm:w-1/3">
                            <div className="mb-2 block">
                                <Label htmlFor="tipo" value="Tipo Documento" />
                            </div>
                            <TextInput id="tipo" type="text" icon={FaIdCard} value={handleNull(user.user.TipoDocumento)} disabled />
                        </div>
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="documento" value="Número Documento" />
                            </div>
                            <TextInput id="documento" type="text" icon={FaIdCard} value={handleNull(user.user.Documento)} disabled />
                        </div>
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="sexo" value="Sexo" />
                            </div>
                            <TextInput id="sexo" type="text" icon={FaMercury} value={handleNull(user.user.Sexo)} disabled />
                        </div>
                    </div>
                    <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="correo" value="Correo" />
                            </div>
                            <TextInput id="correo" type="text" icon={FaEnvelope} value={handleNull(user.user.Correo)} disabled />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="telefono" value="Telefono" />
                            </div>
                            <TextInput id="telefono" type="email" icon={FaPhoneAlt} value={handleNull(user.user.Telefono)} disabled />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="Rol" value="Rol" />
                            </div>
                            <TextInput id="Rol" type="text" icon={FaUserCog} value={translateRole(handleNull(user.credenciales.Rol))} disabled />
                        </div>
                    </div>
                </div>
            </div>

            {
                user.credenciales.Rol == 5 &&
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col lg:flex-row max-w-full dark:border-gray-700 dark:bg-gray-800 mt-2">
                    <div className="flex flex-col justify-between p-4 leading-normal w-full">
                        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                            <div className="w-full">
                                <div className="mb-2 block">
                                    <Label htmlFor="nombreF" value="Nombre Completo" />
                                </div>
                                <TextInput id="nombreF" type="text" icon={FaKeyboard} value={handleNull(user.user.relacionado.Nombre) + " " + handleNull(user.user.relacionado.Apellidos)} disabled />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="RolF" value="Código" />
                                </div>
                                <TextInput id="RolF" type="text" icon={FaCode} value={handleNull(user.user.asociado_id) ? "Asociado" : "Adherente"} disabled />
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default ResultadoBusqueda;
