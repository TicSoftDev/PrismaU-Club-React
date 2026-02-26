import { Label, TextInput } from 'flowbite-react'
import { FaTable } from 'react-icons/fa'

export default function FormInsumoPresentacion({ insumo, handleChange }) {
    return (
        <div className="max-w-full flex flex-col space-y-4">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="nombre" value="Descripción de la presentación del insumo" />
                </div>
                <TextInput id="nombre" type="text" icon={FaTable} onChange={handleChange}
                    value={insumo.nombre} name='nombre' placeholder="Ej: 100 gramos, 1 litro, 1 unidad..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="stock" value="Stock" />
                </div>
                <TextInput id="stock" type="number" icon={FaTable} onChange={handleChange}
                    value={insumo.stock} name='stock' placeholder="Ingrese la cantidad..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
