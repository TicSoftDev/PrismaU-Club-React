import { Label, TextInput } from 'flowbite-react'
import { FaKeyboard } from 'react-icons/fa'

export default function FormUbicacion({ ubicacion, handleChange }) {
    return (
        <div className="max-w-full flex flex-col space-y-4">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="ubicacion" value="Ubicación" />
                </div>
                <TextInput id="ubicacion" type="text" icon={FaKeyboard} onChange={handleChange}
                    value={ubicacion.ubicacion} name='ubicacion' placeholder="Ej: Piscina..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
