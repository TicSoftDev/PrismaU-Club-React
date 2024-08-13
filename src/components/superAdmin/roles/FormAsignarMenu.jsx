import React from 'react'

function FormAsignarMenu({ handleChange, menu, menus }) {

    return (
        <div className="max-w-full flex flex-col">
            <div className="w-full">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="titulo">
                    Escoja el Menu para Asignar
                </label>
                <select type="text" id="titulo" defaultValue={"Escoja una Opción"}
                    className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                    name='menu_id' onChange={handleChange} placeholder='Escriba el name' >
                    <option disabled>Escoja una Opción</option>
                    {
                        menus.map((menu) => (
                            <option value={menu.id} key={menu.id}>{menu.Name}</option>
                        ))
                    }
                </select>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
            </div>
        </div>
    )
}

export default FormAsignarMenu