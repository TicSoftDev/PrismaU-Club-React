import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { FaDollarSign, FaKeyboard } from 'react-icons/fa'

export default function FormRubros({ rubro, handleChange }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Rubro" value="Rubro" />
                    </div>
                    <TextInput id="Rubro" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={rubro.rubro} name='rubro' placeholder="Escribe el rubro..." />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Valor" value="Valor" />
                    </div>
                    <TextInput id="Valor" type="number" icon={FaDollarSign} onChange={handleChange}
                        value={rubro.valor} name='valor' placeholder="Digite el valor..." />
                </div>
            </div>
        </>
    )
}
