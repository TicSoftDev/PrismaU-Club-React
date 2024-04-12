import { Label, TextInput } from 'flowbite-react';
import React from 'react';
import { FaKeyboard } from 'react-icons/fa';

function FormCargo({ cargo, hanleChange }) {
    return (
        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="Descripcion" value="Descripcion del cargo" />
                </div>
                <TextInput id="Descripcion" type="text" icon={FaKeyboard} onChange={hanleChange}
                    value={cargo.Descripcion} name='Descripcion' placeholder="Escriba la descripción..." />
            </div>
        </div>
    );
}

export default FormCargo;