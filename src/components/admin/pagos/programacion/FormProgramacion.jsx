import { Label, Select, TextInput } from 'flowbite-react'
import React from 'react'
import { FaCalendarAlt, FaKeyboard } from 'react-icons/fa'
import Spinner from '../../../../utilities/spinner/Spinner'

export default function FormProgramacion({ programacion, handleChange, handleSubmit, rubros, loading }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="año" value="Digite el año" />
                    </div>
                    <TextInput id="año" type="text" icon={FaCalendarAlt} name='año' onChange={handleChange}
                        value={programacion.año} placeholder="Escribe el año..." />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Rubro" value="Escoja el rubro" />
                    </div>
                    <Select id="Rubro" type="text" icon={FaKeyboard} name='rubro_id' onChange={handleChange}
                        value={programacion.rubro_id || ""}>
                        <option value="" disabled>Seleccione una opción...</option>
                        {
                            rubros.map((rubro) => (
                                <option key={rubro.id} value={rubro.id} >{rubro.rubro}</option>
                            ))
                        }
                    </Select>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-10">
                <div className="w-full flex justify-end items-end">
                    <button onClick={handleSubmit} className='bg-green-500 text-white font-semibold rounded-lg p-2'>
                        {loading ? <Spinner /> : 'Programar'}
                    </button>
                </div>
            </div>
        </>
    )
}
