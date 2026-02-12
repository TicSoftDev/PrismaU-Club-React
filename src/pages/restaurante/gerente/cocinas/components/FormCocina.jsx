import { Label, TextInput } from 'flowbite-react'
import { FaKeyboard } from 'react-icons/fa'

export default function FormCocina({ cocina, handleChange }) {
    return (
        <div className="max-w-full flex flex-col space-y-4">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="nombres" value="Nombre de la cocina" />
                </div>
                <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={handleChange}
                    value={cocina.nombre} name='nombre' placeholder="Escribe el nombre de la cocina..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
