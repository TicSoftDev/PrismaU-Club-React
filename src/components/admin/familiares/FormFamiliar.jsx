import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaCity, FaEnvelope, FaIdCard, FaKeyboard, FaMapMarkerAlt, FaMercury, FaPhoneAlt, FaSuitcase, FaUserTag } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';
import { MdFamilyRestroom } from "react-icons/md";

function FormFamiliar({ familiar, hanleChange }) {
    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={familiar.Nombre} name='Nombre' placeholder="Escribe los nombres..." required={true} />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={familiar.Apellidos} name='Apellidos' placeholder="Escribe los apellidos..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select id="tipo" icon={FaIdCard} name='TipoDocumento' onChange={hanleChange} required
                        defaultValue={familiar.TipoDocumento ? familiar.TipoDocumento : "Escoja una opcion..."} >
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
                        value={familiar.Documento} name='Documento' placeholder="Digite el numero de documento..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={hanleChange}
                        value={familiar.Correo} name='Correo' placeholder="Escribe el correo..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Telefono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        value={familiar.Telefono} name='Telefono' placeholder="Digite el numero de telefono..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="fecha" value="Fecha Nacimiento" />
                    </div>
                    <TextInput id="fecha" type="date" icon={FaCalendarAlt} onChange={hanleChange}
                        value={familiar.FechaNacimiento} name='FechaNacimiento' placeholder="Escribe los nombres..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="LugarNacimiento" value="Lugar Nacimiento" />
                    </div>
                    <TextInput id="LugarNacimiento" type="text" icon={FaMapLocation} onChange={hanleChange}
                        value={familiar.LugarNacimiento} name='LugarNacimiento' placeholder="Escriba el lugar de nacimiento" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select id="sexo" type="text" icon={FaMercury} onChange={hanleChange} name='Sexo'
                        defaultValue={familiar.Sexo ? familiar.Sexo : "Escoja una opcion..."} required >
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
                        defaultValue={familiar.EstadoCivil ? familiar.EstadoCivil : "Escoja una opcion..."} required >
                        <option disabled>Escoja una opcion...</option>
                        <option>Soltero (a)</option>
                        <option>Casado (a)</option>
                        <option>Union Libre</option>
                        <option>Viudo (a)</option>
                        <option>Divorsiado (a)</option>
                    </Select>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="direccion" value="Dirección residencia" />
                    </div>
                    <TextInput id="direccion" type="tel" icon={FaMapMarkerAlt} onChange={hanleChange}
                        value={familiar.DireccionResidencia} name='DireccionResidencia' placeholder="Escriba la dirección de residencia..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ciudadResidencia" value="Ciudad Residencia" />
                    </div>
                    <TextInput id="ciudadResidencia" type="text" icon={FaCity} onChange={hanleChange}
                        value={familiar.CiudadResidencia} name='CiudadResidencia' placeholder="Escriba la ciudad de residencia..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="cargo" value="Cargo" />
                    </div>
                    <TextInput id="cargo" type="text" icon={FaSuitcase} onChange={hanleChange}
                        value={familiar.Cargo} name='Cargo' placeholder="Escriba el cargo que ocupa" />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Parentesco" value="Parentesco" />
                    </div>
                    <Select id="Parentesco" icon={MdFamilyRestroom } onChange={hanleChange} name='Parentesco'
                        defaultValue={familiar.Parentesco ? familiar.Parentesco : "Escoja una opcion..."} required >
                        <option disabled>Escoja una opcion...</option>
                        <option value={'Esposo (a)'}>Esposo (a)</option>
                        <option value={'Hijo (a)'}>Hijo (a)</option>
                        <option value={'Padre'}>Padre</option>
                        <option value={'Madre'}>Madre</option>
                        <option value={'Hermano (a)'}>Hermano (a)</option>
                        <option value={'Sobrino (a)'}>Sobrino (a)</option>
                        <option value={'Tió (a)'}>Tió (a)</option>
                        <option value={'Suegro (a)'}>Suegro (a)</option>
                        <option value={'Escolta'}>Escolta</option>
                        <option value={'Niñera'}>Niñera</option>
                    </Select>
                </div>
            </div>
        </>
    );
}

export default FormFamiliar;