import { Label, TextInput } from 'flowbite-react'
import { FaKeyboard } from 'react-icons/fa'

export default function FormPreinventario({ preinventario, handleChange }) {
    return (
        <div className="max-w-full flex flex-col space-y-4">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="nombre" value="Nombre de la preinventario" />
                </div>
                <TextInput id="nombre" type="text" icon={FaKeyboard} onChange={handleChange}
                    value={preinventario.nombre} name='nombre' placeholder="Escribe el nombre del preinventario..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
