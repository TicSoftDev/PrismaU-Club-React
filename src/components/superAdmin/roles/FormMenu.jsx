import React from 'react'

function FormMenu({ handleChange, menu }) {

    return (
        <div className="max-w-full flex flex-col">
            <div className="w-full">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="titulo">
                    Menu
                </label>
                <input type="text" id="titulo"
                    className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                    name='Name' value={menu.Name} onChange={handleChange} placeholder='Escriba el name' />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
            </div>
        </div>
    )
}

export default FormMenu