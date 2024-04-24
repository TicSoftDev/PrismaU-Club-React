import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaEye, FaKeyboard } from 'react-icons/fa';

function FormEspacio({ espacio, hanleChange, handleChangeImage, touched }) {

    const inputClass = (value) => (
        touched && value.trim() === '' && 'border border-red-500 rounded-lg'
    );

    return (
        <>
            {
                !espacio.id &&
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 mb-3">
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Imagen</label>
                        <input className={`${touched && espacio.imagen.trim() === '' && 'border border-red-500 rounded-lg'}block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`} aria-describedby="file_input_help" id="file_input"
                            type="file" name='imagen' onChange={handleChangeImage} />
                        <p className="text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG (MAX. 1MB).</p>
                    </div>
                </div>
            }
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
                    <Select id="Estado" icon={FaEye} onChange={hanleChange} name='Estado' className={inputClass(espacio.Estado)}
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