import { Label, TextInput } from 'flowbite-react';
import React from 'react';
import { FaEnvelope, FaIdCard, FaKey, FaKeyboard, FaPhoneAlt } from 'react-icons/fa';

function FormAdmin({ admin, hanleChange }) {
    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={admin.Nombre} name='Nombre' placeholder="Escribe los nombres..." required={true} />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={hanleChange}
                        value={admin.Apellidos} name='Apellidos' placeholder="Escribe los apellidos..." required />
                </div>
            </div>
            {!admin.id &&
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="documento" value="Usuario" />
                        </div>
                        <TextInput id="documento" type="text" icon={FaIdCard} onChange={hanleChange}
                            value={admin.Documento} name='Documento' placeholder="Ingrese el usuario..." required />
                    </div>
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="clave" value="Clave" />
                        </div>
                        <TextInput id="clave" type="text" icon={FaKey} onChange={hanleChange}
                            value={admin.Clave} name='Clave' placeholder="Ingrese la clave..." required />
                    </div>
                </div>
            }
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={hanleChange}
                        value={admin.Correo} name='Correo' placeholder="Escribe el correo..." required />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Telefono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} onChange={hanleChange}
                        value={admin.Telefono} name='Telefono' placeholder="Digite el numero de telefono..." required />
                </div>
            </div>
        </>
    );
}

export default FormAdmin;