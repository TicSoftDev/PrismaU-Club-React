import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaEye, FaKeyboard } from 'react-icons/fa';

function FormEspacio({ espacio, hanleChange, touched }) {

    const inputClass = (value) => (
        touched && value.trim() === '' && 'border border-red-500 rounded-lg'
    );

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Descripcion" value="Descripción" />
                    </div>
                    <TextInput id="Descripcion" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(espacio.Descripcion)} value={espacio.Descripcion}
                        name='Descripcion' placeholder="Escribe la descripción..." />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Estado" value="Estado" />
                    </div>
                    <Select id="Estado" icon={FaEye} onChange={hanleChange} name='Estado'
                        defaultValue={espacio.Estado ? espacio.Estado : "Escoja una opción..."}  >
                        <option disabled>Escoja una opción...</option>
                        <option value={1}>Activo (a)</option>
                        <option value={0}>Inactivo (a)</option>
                    </Select>
                </div>
            </div>
        </>
    );
}

export default FormEspacio;