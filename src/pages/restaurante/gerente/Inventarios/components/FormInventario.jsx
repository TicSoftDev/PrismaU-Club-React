import { Label, Select, TextInput } from 'flowbite-react'
import { FaCalendarDay, FaList } from 'react-icons/fa'

export default function FormInventario({ inventario, preinventarios, handleChange }) {
    return (
        <div className="max-w-full flex flex-col space-y-4">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="fecha" value="Fecha del inventario" />
                </div>
                <TextInput id="fecha" type="date" icon={FaCalendarDay} onChange={handleChange}
                    value={inventario.fecha} name='fecha' placeholder="Escoja la fecha del inventario..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="preinventario" value="Escoja el preinventario" />
                </div>
                <Select id="preinventario" onChange={handleChange} name='preinventario_id' icon={FaList}
                    value={inventario.preinventario_id ?? ""} >
                    <option value="" disabled>Escoja una opcion...</option>
                    {preinventarios.map((preinventario) => (
                        <option key={preinventario.id} value={preinventario.id}>{preinventario.nombre}</option>
                    ))}
                </Select>
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
