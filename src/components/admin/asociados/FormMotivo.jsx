import React from 'react';

function FormMotivo({ estado, handleChangeEstado }) {

    return (
        <div className="max-w-full flex flex-col">
            <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="estado">Estado</label>
                <select id="estado" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name='Estado' onChange={handleChangeEstado} value={"Escoja una Opción"}>
                    <option disabled>Escoja una Opción</option>
                    <option value="1">Activo</option>
                    <option value="3">En Mora</option>
                    <option value="0">Inactivo</option>
                    <option value="2">Retirado</option>
                </select>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="motivo_help">*Requerido.</p>
            </div>
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="motivo">Motivo</label>
                <textarea className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="motivo_help" id="motivo"
                    type="text" name='Motivo' onChange={handleChangeEstado} placeholder='Escriba el motivo por el cual le va a cambiar el estado' />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="motivo_help">*Requerido.</p>
            </div>
        </div>
    );
}

export default FormMotivo;