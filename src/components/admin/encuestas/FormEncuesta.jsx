import React from 'react'

function FormEncuesta({ encuesta, handleChange }) {
    return (
        <div className="max-w-full flex flex-col">
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="titulo">Titulo de la encuesta</label>
                <input type="text" id="titulo" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg" name='Titulo' value={encuesta.Titulo} onChange={handleChange} placeholder='Escriba el Titulo'/>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
            </div>
            <div className="w-full mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Descripcion">Descripción de la encuesta</label>
                <textarea className="block w-full h-40 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="Descripcion" type="text" name='Descripcion' onChange={handleChange} value={encuesta.Descripcion} placeholder='Escriba la Descripcion de la solicitud' />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Descripcion_help">*Requerido.</p>
            </div>
        </div>
    )
}

export default FormEncuesta