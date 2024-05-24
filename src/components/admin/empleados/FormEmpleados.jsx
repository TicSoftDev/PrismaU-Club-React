import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaBriefcase, FaCalendarAlt, FaCity, FaEnvelope, FaEye, FaIdCard, FaKeyboard, FaMapMarkerAlt, FaMercury, FaPhoneAlt, FaUserTag } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';

function FormEmpleados({ empleado, hanleChange, touched }) {

    const inputClass = (value) => (
        touched && value.trim() === '' && 'border border-red-500 rounded-lg'
    );

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(empleado.Nombre)} value={empleado.Nombre}
                        name='Nombre' placeholder="Escribe los nombres..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(empleado.Apellidos)} value={empleado.Apellidos}
                        name='Apellidos' placeholder="Escribe los apellidos..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select id="tipo" icon={FaIdCard} name='TipoDocumento' onChange={hanleChange}
                        defaultValue={empleado.TipoDocumento ? empleado.TipoDocumento : "Escoja una opción..."}
                        className={inputClass(empleado.TipoDocumento)}>
                        <option disabled>Escoja una opción...</option>
                        <option value="TI">Tarjeta Identidad</option>
                        <option value="CC">Cédula Ciudadanía</option>
                        <option value="CE">Cédula Extranjería</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="documento" value="Número Documento" />
                    </div>
                    <TextInput id="documento" type="number" icon={FaIdCard} onChange={hanleChange}
                        className={inputClass(empleado.Documento)} value={empleado.Documento}
                        name='Documento' placeholder="Digite el número de documento..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={hanleChange}
                        className={inputClass(empleado.Correo)} value={empleado.Correo}
                        name='Correo' placeholder="Escribe el correo..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Teléfono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        className={inputClass(empleado.Telefono)} value={empleado.Telefono}
                        name='Telefono' placeholder="Digite el numero de teléfono..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="fecha" value="Fecha Nacimiento" />
                    </div>
                    <TextInput id="fecha" type="date" icon={FaCalendarAlt} onChange={hanleChange}
                        className={inputClass(empleado.FechaNacimiento)} value={empleado.FechaNacimiento}
                        name='FechaNacimiento' />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="LugarNacimiento" value="Lugar Nacimiento" />
                    </div>
                    <TextInput id="LugarNacimiento" type="text" icon={FaMapLocation} onChange={hanleChange}
                        className={inputClass(empleado.LugarNacimiento)} value={empleado.LugarNacimiento}
                        name='LugarNacimiento' placeholder="Escriba el lugar de nacimiento" />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select id="sexo" type="text" icon={FaMercury} onChange={hanleChange} name='Sexo'
                        defaultValue={empleado.Sexo ? empleado.Sexo : "Escoja una opción..."}
                        className={inputClass(empleado.Sexo)}>
                        <option disabled>Escoja una opción...</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                        <option>Otro</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="EstadoCivil" value="Estado Civil" />
                    </div>
                    <Select id="EstadoCivil" icon={FaUserTag} onChange={hanleChange} name='EstadoCivil'
                        defaultValue={empleado.EstadoCivil ? empleado.EstadoCivil : "Escoja una opción..."}
                        className={inputClass(empleado.EstadoCivil)}>
                        <option disabled>Escoja una opción...</option>
                        <option>Soltero (a)</option>
                        <option>Casado (a)</option>
                        <option>Unión Libre</option>
                        <option>Viudo (a)</option>
                        <option>Divorciado (a)</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="direccion" value="Dirección Residencia" />
                    </div>
                    <TextInput id="direccion" type="tel" icon={FaMapMarkerAlt} onChange={hanleChange}
                        className={inputClass(empleado.DireccionResidencia)} value={empleado.DireccionResidencia}
                        name='DireccionResidencia' placeholder="Escriba la dirección de residencia..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ciudadResidencia" value="Ciudad Residencia" />
                    </div>
                    <TextInput id="ciudadResidencia" type="text" icon={FaCity} onChange={hanleChange}
                        className={inputClass(empleado.CiudadResidencia)} value={empleado.CiudadResidencia}
                        name='CiudadResidencia' placeholder="Escriba la ciudad de residencia..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Portero" value="¿Es un portero?" />
                    </div>
                    <Select id="Portero" onChange={hanleChange} name='Rol' className={inputClass(empleado.Rol)}
                        value={empleado.Rol } >
                        <option value="" disabled>Escoja una opción...</option>
                        <option value={6}>Si</option>
                        <option value={4}>No </option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                {empleado.Rol === '4' &&
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="cargo" value="Cargo" />
                        </div>
                        <TextInput id="cargo" type="text" icon={FaBriefcase} onChange={hanleChange}
                            className={inputClass(empleado.Cargo)} value={empleado.Cargo}
                            name='Cargo' placeholder="Escriba el cargo que ocupa" />
                        <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                        {empleado.Cargo == 'Portero'}
                    </div>
                }
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Estado" value="Estado" />
                    </div>
                    <Select id="Estado" icon={FaEye} onChange={hanleChange} name='Estado'
                        defaultValue={empleado.Estado ? empleado.Estado : "Escoja una opción..."}>
                        <option disabled>Escoja una opción...</option>
                        <option value={1}>Activo (a)</option>
                        <option value={0}>Inactivo (a)</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
        </>
    );
}

export default FormEmpleados;