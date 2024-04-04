import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaCity, FaEnvelope, FaEye, FaIdCard, FaKey, FaKeyboard, FaMapMarkerAlt, FaMercury, FaPhoneAlt, FaSortNumericUp, FaSuitcase, FaUserGraduate, FaUserTag, FaUserTie } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';

function FormPerfil({ user, hanleChange, change, usuario }) {

    return (
        <>
            <span className='font-bold'>Informacion Personal</span>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput disabled id="nombres" type="text" icon={FaKeyboard}
                        value={user.Nombre} name='Nombre' placeholder="Escribe los nombres..." required={true} />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput disabled id="apellidos" type="text" icon={FaKeyboard}
                        value={user.Apellidos} name='Apellidos' placeholder="Escribe los apellidos..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select disabled id="tipo" icon={FaIdCard} name='TipoDocumento' required
                        defaultValue={user.TipoDocumento ? user.TipoDocumento : "Escoja una opcion..."} >
                        <option disabled>Escoja una opcion...</option>
                        <option value="TI">Tarjeta Identidad</option>
                        <option value="CC">Cedula Ciudadania</option>
                        <option value="CE">Cedula Extranjeria</option>
                    </Select>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="documento" value="Numero Documento" />
                    </div>
                    <TextInput disabled id="documento" type="number" icon={FaIdCard}
                        value={user.Documento} name='Documento' placeholder="Digite el numero de documento..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput disabled id="correo" type="email" icon={FaEnvelope}
                        value={user.Correo} name='Correo' placeholder="Escribe el correo..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Telefono" />
                    </div>
                    <TextInput disabled id="telefono" type="tel" icon={FaPhoneAlt}
                        value={user.Telefono} name='Telefono' placeholder="Digite el numero de telefono..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="fecha" value="Fecha Nacimiento" />
                    </div>
                    <TextInput disabled id="fecha" type="date" icon={FaCalendarAlt}
                        value={user.FechaNacimiento} name='FechaNacimiento' placeholder="Escribe los nombres..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="LugarNacimiento" value="Lugar Nacimiento" />
                    </div>
                    <TextInput disabled id="LugarNacimiento" type="text" icon={FaMapLocation}
                        value={user.LugarNacimiento} name='LugarNacimiento' placeholder="Escriba el lugar de nacimiento" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select disabled id="sexo" type="text" icon={FaMercury} name='Sexo'
                        defaultValue={user.Sexo ? user.Sexo : "Escoja una opcion..."} required >
                        <option disabled>Escoja una opcion...</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </Select>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="direccion" value="Dirección residencia" />
                    </div>
                    <TextInput disabled id="direccion" type="tel" icon={FaMapMarkerAlt}
                        value={user.DireccionResidencia} name='DireccionResidencia' placeholder="Escriba la dirección de residencia..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ciudadResidencia" value="Ciudad Residencia" />
                    </div>
                    <TextInput disabled id="ciudadResidencia" type="text" icon={FaCity}
                        value={user.CiudadResidencia} name='CiudadResidencia' placeholder="Escriba la ciudad de residencia..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TiempoResidencia" value="Tiempo Residencia" />
                    </div>
                    <TextInput disabled id="TiempoResidencia" type="text" icon={FaSortNumericUp}
                        value={user.TiempoResidencia} name='TiempoResidencia' placeholder="Escriba el tiempo de residencia" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="EstadoCivil" value="Estado Civil" />
                    </div>
                    <Select disabled id="EstadoCivil" icon={FaUserTag} name='EstadoCivil'
                        defaultValue={user.EstadoCivil ? user.EstadoCivil : "Escoja una opcion..."} required >
                        <option disabled>Escoja una opcion...</option>
                        <option>Soltero (a)</option>
                        <option>Casado (a)</option>
                        <option>Union Libre</option>
                        <option>Viudo (a)</option>
                        <option>Divorciado (a)</option>
                    </Select>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Profesion" value="Profesion" />
                    </div>
                    <TextInput disabled id="Profesion" type="tel" icon={FaUserGraduate}
                        value={user.Profesion} name='Profesion' placeholder="Escriba la profesión..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Trabajo" value="Trabajo" />
                    </div>
                    <TextInput disabled id="Trabajo" type="text" icon={FaSuitcase}
                        value={user.Trabajo} name='Trabajo' placeholder="Escriba donde trabaja..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="cargo" value="Cargo" />
                    </div>
                    <TextInput disabled id="cargo" type="text" icon={FaSuitcase}
                        value={user.Cargo} name='Cargo' placeholder="Escriba el cargo que ocupa" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TiempoServicio" value="Tiempo Servicio" />
                    </div>
                    <TextInput disabled id="TiempoServicio" type="text" icon={FaSortNumericUp}
                        value={user.TiempoServicio} name='TiempoServicio' placeholder="Escriba el Tiempo de Servicio" />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TelOficina" value="Telefono Oficina" />
                    </div>
                    <TextInput disabled id="TelOficina" type="tel" icon={FaPhoneAlt}
                        value={user.TelOficina} name='TelOficina' placeholder="Escriba el Telefono Oficina..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="DireccionOficina" value="Direccion Oficina" />
                    </div>
                    <TextInput disabled id="DireccionOficina" type="text" icon={FaMapMarkerAlt}
                        value={user.DireccionOficina} name='DireccionOficina' placeholder="Escriba la Direccion de la Oficina..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="CiudadOficina" value="Ciudad Oficina" />
                    </div>
                    <TextInput disabled id="CiudadOficina" type="text" icon={FaCity}
                        value={user.CiudadOficina} name='CiudadOficina' placeholder="Escriba la Ciudad de la Oficina" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Estado" value="Estado" />
                    </div>
                    <Select disabled id="Estado" icon={FaEye} name='Estado'
                        defaultValue={user.Estado ? user.Estado : "Escoja una opcion..."} required >
                        <option disabled>Escoja una opcion...</option>
                        <option value={1}>Activo (a)</option>
                        <option value={0}>Inactivo (a)</option>
                    </Select>
                </div>
            </div>
            <div className='font-bold my-6'>Actualizar contraseña</div>
            <div className="max-w-full flex flex-col sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Clave" value="Clave" />
                    </div>
                    <TextInput id="Clave" type="text" icon={FaKey} onChange={hanleChange}
                        value={usuario.password} name='password' placeholder="Ingrese la clave nueva..." required />
                </div>
            </div>
            <button onClick={change} className='w-28 p-2 text-white font-medium bg-green-500 rounded-lg mt-4 right-0 '>Actualizar</button>
        </>
    );
}

export default FormPerfil;