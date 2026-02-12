import { Label, TextInput } from 'flowbite-react'
import { FaTable } from 'react-icons/fa'

export default function FormMesa({ mesa, handleChange }) {
    return (
        <div className="max-w-full flex flex-col space-y-4">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="numero" value="Número de mesa" />
                </div>
                <TextInput id="numero" type="number" icon={FaTable} onChange={handleChange}
                    value={mesa.numero} name='numero' placeholder="Escriba el número de la mesa..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
