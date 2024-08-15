import React from 'react'

function FormMenu({ handleChange, menu }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="titulo">
                        Label
                    </label>
                    <input type="text" id="titulo" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                        name='Name' value={menu.Name} onChange={handleChange} placeholder='Escriba el label' />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
                </div>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="type">
                        Tipo
                    </label>
                    <select id="type" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                        name='Type' onChange={handleChange} defaultValue={menu.Type || "Escoja una Opción"}>
                        <option disabled>Escoja una Opción</option>
                        <option value="portal">Portal Autogestión</option>
                        <option value="bienestar">Bienestar Laboral</option>
                    </select>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ruta">
                        Ruta
                    </label>
                    <input type="text" id="ruta" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                        name='Route' value={menu.Route} onChange={handleChange} placeholder='Escriba la ruta' />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
                </div>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="icono">
                        Icono
                    </label>
                    <input type="text" id="icono" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                        name='Icon' value={menu.Icon} onChange={handleChange} placeholder='Escriba el nombre del icono' />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
                </div>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="color">
                        Color
                    </label>
                    <input type="text" id="color" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                        name='Color' value={menu.Color} onChange={handleChange} placeholder='Escriba el nombre del color' />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
                </div>
            </div>
        </>
    )
}

export default FormMenu