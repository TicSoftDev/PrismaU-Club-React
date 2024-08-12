import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaIdCard, FaKeyboard, FaPhoneAlt } from 'react-icons/fa';

function FormInvitacion({ hanleChange, invitado, hanleSubmit, generado, loading }) {

    return (
        <div className='flex flex-col'>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={invitado.Nombre} name='Nombre' placeholder="Escribe los nombres..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={invitado.Apellidos} name='Apellidos' placeholder="Escribe los apellidos..." required />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select id="tipo" icon={FaIdCard} name='TipoDocumento' onChange={hanleChange} required
                        defaultValue={invitado.TipoDocumento ? invitado.TipoDocumento : "Escoja una opcion..."} >
                        <option disabled>Escoja una opcion...</option>
                        <option value="TI">Tarjeta Identidad</option>
                        <option value="CC">Cedula Ciudadania</option>
                        <option value="CE">Cedula Extranjeria</option>
                    </Select>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="documento" value="Numero Documento" />
                    </div>
                    <TextInput id="documento" type="number" icon={FaIdCard} onChange={hanleChange}
                        value={invitado.Documento} name='Documento' placeholder="Digite el numero de documento..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Telefono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        value={invitado.Telefono} name='Telefono' placeholder="Digite el numero de telefono..." required />
                </div>
            </div>
            <button onClick={hanleSubmit} className='bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-6'>
                {generado ? 'Generar otra invitación' : loading ? 'Generando...' : 'Generar Invitación'}
            </button>
        </div>
    );
}

export default FormInvitacion;