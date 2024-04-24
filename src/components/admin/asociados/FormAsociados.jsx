import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaCity, FaEnvelope, FaIdCard, FaKeyboard, FaMapMarkerAlt, FaMercury, FaPhoneAlt, FaSortNumericUp, FaSuitcase, FaUserGraduate, FaUserTag } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';

function FormAsociados({ asociado, hanleChange, touched }) {

    const inputClass = (value) => (
        touched && value.trim() === '' && 'border border-red-500 rounded-lg'
    );

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(asociado.Nombre)} value={asociado.Nombre}
                        name='Nombre' placeholder="Escribe los nombres..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(asociado.Apellidos)} value={asociado.Apellidos}
                        name='Apellidos' placeholder="Escribe los apellidos..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select id="tipo" icon={FaIdCard} name='TipoDocumento'
                        className={inputClass(asociado.TipoDocumento)} onChange={hanleChange}
                        defaultValue={asociado.TipoDocumento ? asociado.TipoDocumento : "Escoja una opción..."} >
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
                        className={inputClass(asociado.Documento)} name='Documento'
                        value={asociado.Documento} placeholder="Digite el numero de documento..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={hanleChange}
                        className={inputClass(asociado.Correo)} placeholder="Escribe el correo..."
                        value={asociado.Correo} name='Correo' />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Teléfono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        className={inputClass(asociado.Telefono)} value={asociado.Telefono}
                        name='Telefono' placeholder="Digite el numero de telefono..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="fecha" value="Fecha Nacimiento" />
                    </div>
                    <TextInput id="fecha" type="date" icon={FaCalendarAlt} onChange={hanleChange}
                        value={asociado.FechaNacimiento ? asociado.FechaNacimiento : ""}
                        name='FechaNacimiento' placeholder="Escribe los nombres..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="LugarNacimiento" value="Lugar Nacimiento" />
                    </div>
                    <TextInput id="LugarNacimiento" type="text" icon={FaMapLocation} onChange={hanleChange}
                        value={asociado.LugarNacimiento ? asociado.LugarNacimiento : ""}
                        name='LugarNacimiento' placeholder="Escriba el lugar de nacimiento" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select id="sexo" type="text" icon={FaMercury} onChange={hanleChange}
                        className={inputClass(asociado.Sexo)} name='Sexo'
                        defaultValue={asociado.Sexo ? asociado.Sexo : "Escoja una opción..."}  >
                        <option disabled>Escoja una opción...</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
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
                        value={asociado.DireccionResidencia ? asociado.DireccionResidencia : ""}
                        name='DireccionResidencia' placeholder="Escriba la dirección de residencia..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ciudadResidencia" value="Ciudad Residencia" />
                    </div>
                    <TextInput id="ciudadResidencia" type="text" icon={FaCity} onChange={hanleChange}
                        value={asociado.CiudadResidencia ? asociado.CiudadResidencia : ""}
                        name='CiudadResidencia' placeholder="Escriba la ciudad de residencia..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TiempoResidencia" value="Tiempo Residencia" />
                    </div>
                    <TextInput id="TiempoResidencia" type="text" icon={FaSortNumericUp} onChange={hanleChange}
                        value={asociado.TiempoResidencia ? asociado.TiempoResidencia : ""}
                        name='TiempoResidencia' placeholder="Escriba el tiempo de residencia" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="EstadoCivil" value="Estado Civil" />
                    </div>
                    <Select id="EstadoCivil" icon={FaUserTag} onChange={hanleChange} name='EstadoCivil'
                        defaultValue={asociado.EstadoCivil ? asociado.EstadoCivil : "Escoja una opción..."}  >
                        <option disabled>Escoja una opción...</option>
                        <option>Soltero (a)</option>
                        <option>Casado (a)</option>
                        <option>Unión Libre </option>
                        <option>Viudo (a)</option>
                        <option>Divorciado (a)</option>
                    </Select>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Profesion" value="Profesión" />
                    </div>
                    <TextInput id="Profesion" type="tel" icon={FaUserGraduate} onChange={hanleChange}
                        value={asociado.Profesion ? asociado.Profesion : ""}
                        name='Profesion' placeholder="Escriba la profesión..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Trabajo" value="Trabajo" />
                    </div>
                    <TextInput id="Trabajo" type="text" icon={FaSuitcase} onChange={hanleChange}
                        value={asociado.Trabajo ? asociado.Trabajo : ""}
                        name='Trabajo' placeholder="Escriba donde trabaja..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="cargo" value="Cargo" />
                    </div>
                    <TextInput id="cargo" type="text" icon={FaSuitcase} onChange={hanleChange}
                        value={asociado.Cargo ? asociado.Cargo : ""} name='Cargo'
                        placeholder="Escriba el cargo que ocupa" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TiempoServicio" value="Tiempo Servicio" />
                    </div>
                    <TextInput id="TiempoServicio" type="text" icon={FaSortNumericUp} onChange={hanleChange}
                        value={asociado.TiempoServicio ? asociado.TiempoServicio : ""}
                        name='TiempoServicio' placeholder="Escriba el Tiempo de Servicio" />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TelOficina" value="Teléfono  Oficina" />
                    </div>
                    <TextInput id="TelOficina" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        value={asociado.TelOficina ? asociado.TelOficina : ""} name='TelOficina'
                        placeholder="Escriba el teléfono de la oficina..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="DireccionOficina" value="Direccion Oficina" />
                    </div>
                    <TextInput id="DireccionOficina" type="text" icon={FaMapMarkerAlt} onChange={hanleChange}
                        value={asociado.DireccionOficina ? asociado.DireccionOficina : ""}
                        name='DireccionOficina' placeholder="Escriba la dirección  de la oficina..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="CiudadOficina" value="Ciudad Oficina" />
                    </div>
                    <TextInput id="CiudadOficina" type="text" icon={FaCity} onChange={hanleChange}
                        value={asociado.CiudadOficina ? asociado.CiudadOficina : ""}
                        name='CiudadOficina' placeholder="Escriba la ciudad de la oficina" />
                </div>
            </div>
        </>
    );
}

export default FormAsociados;