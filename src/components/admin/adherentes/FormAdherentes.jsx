import { Label, Select as Select2, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaCity, FaCode, FaEnvelope, FaIdCard, FaKeyboard, FaMapMarkerAlt, FaMercury, FaPhoneAlt, FaSortNumericUp, FaSuitcase, FaUserGraduate, FaUserTag } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';
import Select from 'react-select';

function FormAdherentes({ socio, adherente, hanleChange, handleChangeSelect, touched }) {

    const options = socio.map(item => ({
        value: item.id,
        label: `${item.Nombre} ${item.Apellidos}`
    }));

    const inputClass = (value) => (
        touched && value?.trim() === '' && 'border border-red-500 rounded-lg'
    );

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label value="Asociado" />
                    </div>
                    <Select options={options} onChange={handleChangeSelect} name='asociado_id'
                        value={options.find(option => option.value == adherente.asociado_id)}
                        placeholder="Escoja un asociado..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(adherente.Nombre)} value={adherente.Nombre}
                        name='Nombre' placeholder="Escribe los nombres..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(adherente.Apellidos)} value={adherente.Apellidos}
                        name='Apellidos' placeholder="Escribe los apellidos..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="codigo" value="Código" />
                    </div>
                    <TextInput id="codigo" type="text" icon={FaCode} onChange={hanleChange} name='Codigo'
                        className={inputClass(adherente.Codigo)}
                        value={adherente.Codigo ? adherente.Codigo : ""} placeholder="Escribe el código..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select2 id="tipo" icon={FaIdCard} name='TipoDocumento' onChange={hanleChange}
                        defaultValue={adherente.TipoDocumento ? adherente.TipoDocumento : "Escoja una opción..."}
                        className={inputClass(adherente.TipoDocumento)}>
                        <option disabled>Escoja una opción...</option>
                        <option value="TI">Tarjeta Identidad</option>
                        <option value="CC">Cédula Ciudadanía</option>
                        <option value="CE">Cédula Extranjería</option>
                    </Select2>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="documento" value="Número Documento" />
                    </div>
                    <TextInput id="documento" type="number" icon={FaIdCard} onChange={hanleChange}
                        className={inputClass(adherente.Documento)} value={adherente.Documento}
                        name='Documento' placeholder="Digite el número de documento..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={hanleChange}
                        className={inputClass(adherente.Correo)} value={adherente.Correo}
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
                        className={inputClass(adherente.Telefono)} value={adherente.Telefono}
                        name='Telefono' placeholder="Digite el numero de teléfono..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="fecha" value="Fecha Nacimiento" />
                    </div>
                    <TextInput id="fecha" type="date" icon={FaCalendarAlt} onChange={hanleChange}
                        value={adherente.FechaNacimiento ? adherente.FechaNacimiento : ""}
                        name='FechaNacimiento' placeholder="Escribe los nombres..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="LugarNacimiento" value="Lugar Nacimiento" />
                    </div>
                    <TextInput id="LugarNacimiento" type="text" icon={FaMapLocation} onChange={hanleChange}
                        value={adherente.LugarNacimiento ? adherente.LugarNacimiento : ""}
                        name='LugarNacimiento' placeholder="Escriba el lugar de nacimiento" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select2 id="sexo" type="text" icon={FaMercury} onChange={hanleChange}
                        name='Sexo' className={inputClass(adherente.Sexo)}
                        defaultValue={adherente.Sexo ? adherente.Sexo : "Escoja una opción..."} >
                        <option disabled>Escoja una opción...</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </Select2>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="direccion" value="Dirección residencia" />
                    </div>
                    <TextInput id="direccion" type="tel" icon={FaMapMarkerAlt} onChange={hanleChange}
                        value={adherente.DireccionResidencia ? adherente.DireccionResidencia : ""}
                        name='DireccionResidencia' placeholder="Escriba la dirección de residencia..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ciudadResidencia" value="Ciudad Residencia" />
                    </div>
                    <TextInput id="ciudadResidencia" type="text" icon={FaCity} onChange={hanleChange}
                        value={adherente.CiudadResidencia ? adherente.CiudadResidencia : ""}
                        name='CiudadResidencia' placeholder="Escriba la ciudad de residencia..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TiempoResidencia" value="Tiempo Residencia" />
                    </div>
                    <TextInput id="TiempoResidencia" type="text" icon={FaSortNumericUp} onChange={hanleChange}
                        value={adherente.TiempoResidencia ? adherente.TiempoResidencia : ""}
                        name='TiempoResidencia' placeholder="Escriba el tiempo de residencia" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="civil" value="Estado Civil" />
                    </div>
                    <Select2 id="civil" icon={FaUserTag} onChange={hanleChange} name='EstadoCivil'
                        defaultValue={adherente.EstadoCivil ? adherente.EstadoCivil : "Escoja una opción..."} >
                        <option disabled>Escoja una opción...</option>
                        <option>Soltero (a)</option>
                        <option>Casado (a)</option>
                        <option>Unión Libre</option>
                        <option>Viudo (a)</option>
                        <option>Divorciado (a)</option>
                    </Select2>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Profesion" value="Profesión" />
                    </div>
                    <TextInput id="Profesion" type="tel" icon={FaUserGraduate} onChange={hanleChange}
                        value={adherente.Profesion ? adherente.Profesion : ""}
                        name='Profesion' placeholder="Escriba la profesión..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Trabajo" value="Trabajo" />
                    </div>
                    <TextInput id="Trabajo" type="text" icon={FaSuitcase} onChange={hanleChange}
                        value={adherente.Trabajo ? adherente.Trabajo : ""}
                        name='Trabajo' placeholder="Escriba donde trabaja..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="cargo" value="Cargo" />
                    </div>
                    <TextInput id="cargo" type="text" icon={FaSuitcase} onChange={hanleChange}
                        value={adherente.Cargo ? adherente.Cargo : ""}
                        name='Cargo' placeholder="Escriba el cargo que ocupa" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TiempoServicio" value="Tiempo Servicio" />
                    </div>
                    <TextInput id="TiempoServicio" type="text" icon={FaSortNumericUp} onChange={hanleChange}
                        value={adherente.TiempoServicio ? adherente.TiempoServicio : ""}
                        name='TiempoServicio' placeholder="Escriba el tiempo de Servicio" />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TelOficina" value="Teléfono Oficina" />
                    </div>
                    <TextInput id="TelOficina" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        value={adherente.TelOficina ? adherente.TelOficina : ""}
                        name='TelOficina' placeholder="Escriba el teléfono de la oficina..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="DireccionOficina" value="Dirección Oficina" />
                    </div>
                    <TextInput id="DireccionOficina" type="text" icon={FaMapMarkerAlt} onChange={hanleChange}
                        value={adherente.DireccionOficina ? adherente.DireccionOficina : ""}
                        name='DireccionOficina' placeholder="Escriba la dirección de la oficina..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="CiudadOficina" value="Ciudad Oficina" />
                    </div>
                    <TextInput id="CiudadOficina" type="text" icon={FaCity} onChange={hanleChange}
                        value={adherente.CiudadOficina ? adherente.CiudadOficina : ""}
                        name='CiudadOficina' placeholder="Escriba la ciudad de la oficina" />
                </div>
            </div>
        </>
    );
}

export default FormAdherentes;