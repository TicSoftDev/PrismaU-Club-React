import { Label, Select, TextInput } from 'flowbite-react'
import { FaEye, FaKeyboard } from 'react-icons/fa'

export default function FormBebida({ bebida, ubicaciones, handleChange, handleChangeImage }) {
    return (
        <div className='space-y-4'>
            <div className="max-w-full flex flex-col gap-2 sm:flex-row">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="bebida" value="Nombre de la bebida" />
                    </div>
                    <TextInput id="bebida" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={bebida.bebida} name='bebida' placeholder="Escribe el nombre de la bebida..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="precio" value="Precio de la bebida" />
                    </div>
                    <TextInput id="precio" type="number" icon={FaKeyboard} onChange={handleChange}
                        value={bebida.precio} name='precio' placeholder="Escribe el precio de la bebida..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-1/2">
                    <div className="mb-2 block">
                        <label className="text-sm font-medium text-gray-900" htmlFor="file_input">Imagen</label>
                    </div>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                        type="file" name='imagen' onChange={handleChangeImage} />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">PNG, JPG (MAX. 2MB).</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col gap-2 sm:flex-row">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="stock" value="Stock" />
                    </div>
                    <TextInput id="stock" type="number" icon={FaKeyboard} onChange={handleChange}
                        value={bebida.stock} name='stock' placeholder="Escribe el stock de la bebida..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="cantidad" value="Cantidad de platos" />
                    </div>
                    <TextInput id="cantidad" type="number" icon={FaKeyboard} onChange={handleChange}
                        value={bebida.cantidad} name='cantidad' placeholder="Escribe la cantidad de platos disponibles..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ubicacion" value="Ubicación de la bebida" />
                    </div>
                    <Select id="ubicacion" onChange={handleChange} name='ubicacion_id' value={bebida.ubicacion_id || ""} icon={FaKeyboard}>
                        <option value="" disabled>Escoja una opcion...</option>
                        {ubicaciones.map((ubicacion) => (
                            <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.ubicacion}</option>
                        ))}
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="estado" value="Disponibilidad" />
                    </div>
                    <Select id="estado" onChange={handleChange} name='estado' value={bebida.estado || ""} icon={FaEye}>
                        <option value="" disabled>Escoja una opcion...</option>
                        <option value="1">Disponible</option>
                        <option value="2">No Disponible</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
        </div>
    )
}
