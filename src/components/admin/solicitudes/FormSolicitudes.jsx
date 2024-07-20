import React from 'react'

function FormSolicitudes({ handleChange, solicitud }) {
    return (
        <div className="max-w-full flex flex-col">
            <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="tipo">Tipo de solicitud</label>
                <input type="text" id="tipo" className="w-full cursor-not-allowed bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg" value={solicitud.Tipo} disabled />
            </div>
            <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="descripcion">Descripción de la solicitud</label>
                <textarea type="text" id="descripcion" className="w-full cursor-not-allowed bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg" value={solicitud.Descripcion} disabled />
            </div>
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Respuesta">Respuesta</label>
                <textarea className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="Respuesta"
                    type="text" name='Respuesta' onChange={handleChange} value={solicitud.Respuesta ? solicitud.Respuesta : ''} placeholder='Escriba la Respuesta de la solicitud' />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Respuesta_help">*Requerido.</p>
            </div>
        </div>
    )
}

export default FormSolicitudes