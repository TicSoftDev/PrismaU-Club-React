import { Label, TextInput, Textarea } from 'flowbite-react';
import React from 'react'
import { FaCalendarAlt, FaKeyboard } from 'react-icons/fa';

function FormNoticias({ noticia, hanleChange, touched }) {

    const inputClass = (value) => (
        touched && value.trim() === '' && 'border border-red-500 rounded-lg'
    );

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Titulo" value="Titulo" />
                    </div>
                    <TextInput id="Titulo" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(noticia.Titulo)} value={noticia.Titulo}
                        name='Titulo' placeholder="Escribe el titulo..." />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="descripcion" value="Descripción" />
                    </div>
                    <textarea id="descripcion" rows="4" className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputClass(noticia.Descripcion)}`}
                        name='Descripcion' onChange={hanleChange} placeholder="Escriba la descripcion de la noticia..." value={noticia.Descripcion} maxLength={150}></textarea>
                </div>
            </div>
            {/* <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="file_input" value="Imagen" />
                    </div>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                        type="file" name='Imagen' onChange={handleChangeImage} />
                </div>
            </div> */}
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Vencimiento" value="Fecha Vencimiento" />
                    </div>
                    <TextInput id="Vencimiento" type="date" icon={FaCalendarAlt} onChange={hanleChange}
                        className={inputClass(noticia.Vencimiento)} value={noticia.Vencimiento}
                        name='Vencimiento' placeholder="Escribe el titulo..." />
                </div>
            </div>
        </>
    )
}

export default FormNoticias