import { Label, Select } from 'flowbite-react';
import { FaEye } from 'react-icons/fa';
import { LuChefHat } from "react-icons/lu";

export default function FormAsignCocinero({ loading, cocineros, cocina, handleChange }) {

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <FaEye className="animate-spin text-4xl text-gray-500" />
            </div>
        )
    }

    return (
        <div className="max-w-full flex flex-col gap-2 sm:flex-row">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="cocinero" value="Selecciona un cocinero para esta cocina" />
                </div>
                <Select id="cocinero" onChange={handleChange} name='empleado_id'
                    value={cocina.empleado_id || ""} icon={LuChefHat}>
                    <option value="" disabled>Escoja una opcion...</option>
                    {cocineros.map((cocinero) => (
                        <option key={cocinero.id} value={cocinero.id}>
                            {cocinero.Nombre} {cocinero.Apellidos}
                        </option>
                    ))}
                </Select>
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
