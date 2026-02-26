import { Label, TextInput } from 'flowbite-react'
import { FaKeyboard } from 'react-icons/fa'

export default function FormInsumo({ insumo, handleChange }) {
    return (
        <div className='space-y-4'>
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="nombre" value="Nombre del insumo" />
                </div>
                <TextInput id="nombre" type="text" icon={FaKeyboard} onChange={handleChange}
                    value={insumo.nombre} name='nombre' placeholder="Escribe el nombre del insumo..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="unidad" value="Unidad del insumo" />
                </div>
                <TextInput id="unidad" type="text" icon={FaKeyboard} onChange={handleChange}
                    value={insumo.unidad} name='unidad' placeholder="Ej: Gramos, Litros, Unidades..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
