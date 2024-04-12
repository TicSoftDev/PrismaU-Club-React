import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaBriefcase, FaCalendarAlt, FaCity, FaEnvelope, FaEye, FaIdCard, FaKeyboard, FaMapMarkerAlt, FaMercury, FaPhoneAlt, FaUserTag } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';

function FormEmpleados({ empleado, hanleChange }) {
    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={empleado.Nombre} name='Nombre' placeholder="Escribe los nombres..." required={true} />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={empleado.Apellidos} name='Apellidos' placeholder="Escribe los apellidos..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select id="tipo" icon={FaIdCard} name='TipoDocumento' onChange={hanleChange} required
                        defaultValue={empleado.TipoDocumento ? empleado.TipoDocumento : "Escoja una opcion..."} >
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
                        value={empleado.Documento} name='Documento' placeholder="Digite el numero de documento..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={hanleChange}
                        value={empleado.Correo} name='Correo' placeholder="Escribe el correo..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Telefono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        value={empleado.Telefono} name='Telefono' placeholder="Digite el numero de telefono..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="fecha" value="Fecha Nacimiento" />
                    </div>
                    <TextInput id="fecha" type="date" icon={FaCalendarAlt} onChange={hanleChange}
                        value={empleado.FechaNacimiento} name='FechaNacimiento' placeholder="Escribe los nombres..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="LugarNacimiento" value="Lugar Nacimiento" />
                    </div>
                    <TextInput id="LugarNacimiento" type="text" icon={FaMapLocation} onChange={hanleChange}
                        value={empleado.LugarNacimiento} name='LugarNacimiento' placeholder="Escriba el lugar de nacimiento" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select id="sexo" type="text" icon={FaMercury} onChange={hanleChange} name='Sexo'
                        defaultValue={empleado.Sexo ? empleado.Sexo : "Escoja una opcion..."} required >
                        <option disabled>Escoja una opcion...</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                        <option>Otro</option>
                    </Select>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="EstadoCivil" value="Estado Civil" />
                    </div>
                    <Select id="EstadoCivil" icon={FaUserTag} onChange={hanleChange} name='EstadoCivil'
                        defaultValue={empleado.EstadoCivil ? empleado.EstadoCivil : "Escoja una opcion..."} required >
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
                        <Label htmlFor="direccion" value="Dirección residencia" />
                    </div>
                    <TextInput id="direccion" type="tel" icon={FaMapMarkerAlt} onChange={hanleChange}
                        value={empleado.DireccionResidencia} name='DireccionResidencia' placeholder="Escriba la dirección de residencia..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ciudadResidencia" value="Ciudad Residencia" />
                    </div>
                    <TextInput id="ciudadResidencia" type="text" icon={FaCity} onChange={hanleChange}
                        value={empleado.CiudadResidencia} name='CiudadResidencia' placeholder="Escriba la ciudad de residencia..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Portero" value="¿Es un portero?" />
                    </div>
                    <Select id="Portero" onChange={hanleChange} name='Rol'
                        defaultValue={empleado.Rol ? empleado.Estado : "Escoja una opcion..."} required >
                        <option disabled>Escoja una opcion...</option>
                        <option value={6}>Si</option>
                        <option value={4}>No </option>
                    </Select>
                </div>
                {empleado.Rol === '4' &&
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="cargo" value="Cargo" />
                        </div>
                        <TextInput id="cargo" type="text" icon={FaBriefcase} onChange={hanleChange}
                            value={empleado.Cargo} name='Cargo' placeholder="Escriba el cargo que ocupa" />
                        {empleado.Cargo == 'Portero'}
                    </div>
                }
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Estado" value="Estado" />
                    </div>
                    <Select id="Estado" icon={FaEye} onChange={hanleChange} name='Estado'
                        defaultValue={empleado.Estado ? empleado.Estado : "Escoja una opcion..."} required >
                        <option disabled>Escoja una opcion...</option>
                        <option value={1}>Activo (a)</option>
                        <option value={0}>Inactivo (a)</option>
                    </Select>
                </div>
            </div>
        </>
    );
}

export default FormEmpleados;