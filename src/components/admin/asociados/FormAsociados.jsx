import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaCity, FaEnvelope, FaEye, FaIdCard, FaKeyboard, FaMapMarkerAlt, FaMercury, FaPhoneAlt, FaSortNumericUp, FaSuitcase, FaUserGraduate, FaUserTag, FaUserTie } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';
import useAsociados from '../../../hooks/useAsociados';

function FormAsociados({ asociado, hanleChange, show }) {

    const { lista } = useAsociados();

    return (
        <>
            {show &&
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="asociado" value="Asociado" />
                        </div>
                        <Select id="asociado" type="text" icon={FaUserTie} onChange={hanleChange} name='asociado_id'
                            defaultValue={asociado.asociado_id ? asociado.asociado_id : "Escoja una opcion..."} required >
                            <option disabled>Escoja una opcion...</option>
                            {lista.map((socio) => (
                                <option value={socio.personal.id} key={socio.personal.id}> {socio.personal.Nombre + " " + socio.personal.Apellidos} </option>
                            ))}
                        </Select>
                    </div>
                </div>
            }
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={asociado.Nombre} name='Nombre' placeholder="Escribe los nombres..." required={true} />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={asociado.Apellidos} name='Apellidos' placeholder="Escribe los apellidos..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select id="tipo" icon={FaIdCard} name='TipoDocumento' onChange={hanleChange} required
                        defaultValue={asociado.TipoDocumento ? asociado.TipoDocumento : "Escoja una opcion..."} >
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
                    <TextInput id="documento" type="number" icon={FaIdCard} onChange={hanleChange}
                        value={asociado.Documento} name='Documento' placeholder="Digite el numero de documento..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={hanleChange}
                        value={asociado.Correo} name='Correo' placeholder="Escribe el correo..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Telefono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        value={asociado.Telefono} name='Telefono' placeholder="Digite el numero de telefono..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="fecha" value="Fecha Nacimiento" />
                    </div>
                    <TextInput id="fecha" type="date" icon={FaCalendarAlt} onChange={hanleChange}
                        value={asociado.FechaNacimiento} name='FechaNacimiento' placeholder="Escribe los nombres..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="LugarNacimiento" value="Lugar Nacimiento" />
                    </div>
                    <TextInput id="LugarNacimiento" type="text" icon={FaMapLocation} onChange={hanleChange}
                        value={asociado.LugarNacimiento} name='LugarNacimiento' placeholder="Escriba el lugar de nacimiento" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select id="sexo" type="text" icon={FaMercury} onChange={hanleChange} name='Sexo'
                        defaultValue={asociado.Sexo ? asociado.Sexo : "Escoja una opcion..."} required >
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
                    <TextInput id="direccion" type="tel" icon={FaMapMarkerAlt} onChange={hanleChange}
                        value={asociado.DireccionResidencia} name='DireccionResidencia' placeholder="Escriba la dirección de residencia..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ciudadResidencia" value="Ciudad Residencia" />
                    </div>
                    <TextInput id="ciudadResidencia" type="text" icon={FaCity} onChange={hanleChange}
                        value={asociado.CiudadResidencia} name='CiudadResidencia' placeholder="Escriba la ciudad de residencia..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TiempoResidencia" value="Tiempo Residencia" />
                    </div>
                    <TextInput id="TiempoResidencia" type="text" icon={FaSortNumericUp} onChange={hanleChange}
                        value={asociado.TiempoResidencia} name='TiempoResidencia' placeholder="Escriba el tiempo de residencia" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="EstadoCivil" value="Estado Civil" />
                    </div>
                    <Select id="EstadoCivil" icon={FaUserTag} onChange={hanleChange} name='EstadoCivil'
                        defaultValue={asociado.EstadoCivil ? asociado.EstadoCivil : "Escoja una opcion..."} required >
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
                    <TextInput id="Profesion" type="tel" icon={FaUserGraduate} onChange={hanleChange}
                        value={asociado.Profesion} name='Profesion' placeholder="Escriba la profesión..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Trabajo" value="Trabajo" />
                    </div>
                    <TextInput id="Trabajo" type="text" icon={FaSuitcase} onChange={hanleChange}
                        value={asociado.Trabajo} name='Trabajo' placeholder="Escriba donde trabaja..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="cargo" value="Cargo" />
                    </div>
                    <TextInput id="cargo" type="text" icon={FaSuitcase} onChange={hanleChange}
                        value={asociado.Cargo} name='Cargo' placeholder="Escriba el cargo que ocupa" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TiempoServicio" value="Tiempo Servicio" />
                    </div>
                    <TextInput id="TiempoServicio" type="text" icon={FaSortNumericUp} onChange={hanleChange}
                        value={asociado.TiempoServicio} name='TiempoServicio' placeholder="Escriba el Tiempo de Servicio" />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="TelOficina" value="Telefono Oficina" />
                    </div>
                    <TextInput id="TelOficina" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        value={asociado.TelOficina} name='TelOficina' placeholder="Escriba el Telefono Oficina..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="DireccionOficina" value="Direccion Oficina" />
                    </div>
                    <TextInput id="DireccionOficina" type="text" icon={FaMapMarkerAlt} onChange={hanleChange}
                        value={asociado.DireccionOficina} name='DireccionOficina' placeholder="Escriba la Direccion de la Oficina..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="CiudadOficina" value="Ciudad Oficina" />
                    </div>
                    <TextInput id="CiudadOficina" type="text" icon={FaCity} onChange={hanleChange}
                        value={asociado.CiudadOficina} name='CiudadOficina' placeholder="Escriba la Ciudad de la Oficina" />
                </div>
            </div>
        </>
    );
}

export default FormAsociados;