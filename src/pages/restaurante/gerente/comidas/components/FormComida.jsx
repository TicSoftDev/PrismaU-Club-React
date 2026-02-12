import { Label, Select, Textarea, TextInput } from 'flowbite-react'
import { FaEye, FaKeyboard } from 'react-icons/fa'

export default function FormComida({ comida, cocinas, handleChange, handleChangeImage }) {
    return (
        <div className='space-y-4'>
            <div className="max-w-full flex flex-col gap-2 sm:flex-row">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="comida" value="Nombre del plato" />
                    </div>
                    <TextInput id="comida" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={comida.comida} name='comida' placeholder="Escribe el nombre del plato..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo de comida" />
                    </div>
                    <Select id="tipo" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={comida.tipo || ""} name='tipo'>
                        <option value="" disabled>Escoja una opcion...</option>
                        <option value="Entrada">Entrada</option>
                        <option value="Desayuno">Desayuno</option>
                        <option value="Almuerzo">Almuerzo</option>
                        <option value="Cena">Cena</option>
                        <option value="Postre">Postre</option>
                    </Select>
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
                        <Label htmlFor="precio" value="Precio del plato" />
                    </div>
                    <TextInput id="precio" type="number" icon={FaKeyboard} onChange={handleChange}
                        value={comida.precio} name='precio' placeholder="Escribe el precio del plato..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="cantidad" value="Cantidad de platos" />
                    </div>
                    <TextInput id="cantidad" type="number" icon={FaKeyboard} onChange={handleChange}
                        value={comida.cantidad} name='cantidad' placeholder="Escribe la cantidad de platos disponibles..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="cocina" value="Ubicación del plato" />
                    </div>
                    <Select id="cocina" onChange={handleChange} name='cocina_id' value={comida.cocina_id || ""} icon={FaKeyboard}>
                        <option value="" disabled>Escoja una opcion...</option>
                        {cocinas.map((cocina) => (
                            <option key={cocina.id} value={cocina.id}>{cocina.nombre}</option>
                        ))}
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="estado" value="Disponibilidad" />
                    </div>
                    <Select id="estado" onChange={handleChange} name='estado' value={comida.estado || ""} icon={FaEye}>
                        <option value="" disabled>Escoja una opcion...</option>
                        <option value="1">Disponible</option>
                        <option value="2">No Disponible</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="ingredientes" value="Ingredientes del plato" />
                </div>
                <Textarea id="ingredientes" onChange={handleChange} value={comida.ingredientes}
                    name='ingredientes' placeholder="Escribe el ingredientes del plato separados por comas..." />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}
