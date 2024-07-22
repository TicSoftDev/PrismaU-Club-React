import React from 'react'

function FormDisponibilidadEspacio({ handleChange, disponibilidad }) {
    return (
        <div className="max-w-full flex flex-col">
            <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="dia">Dia de semana</label>
                <select type="" id="dia" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                    name='Dia' onChange={handleChange} value={disponibilidad.Dia}>
                    <option disabled>Escoja una Opción</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                </select>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Respuesta_help">*Requerido.</p>
            </div>
            <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="inicio">Hora inicial</label>
                <input type="time" id="inicio" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                    name='Inicio' onChange={handleChange} value={disponibilidad.Inicio} />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Respuesta_help">*Requerido.</p>
            </div>
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="final">Hora final</label>
                <input type="time" id="final" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg"
                    name='Fin' onChange={handleChange} value={disponibilidad.Fin} />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Respuesta_help">*Requerido.</p>
            </div>
        </div>
    )
}

export default FormDisponibilidadEspacio