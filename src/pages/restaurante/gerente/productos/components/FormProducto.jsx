import { Label, Select, Textarea, TextInput } from 'flowbite-react'
import { FaEye, FaKeyboard } from 'react-icons/fa'

export default function FormProducto({ producto, cocinas, insumos, handleChange, handleChangeImage }) {
    return (
        <div className='space-y-4'>
            <div className="max-w-full flex flex-col gap-2 sm:flex-row">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombre" value="Nombre del plato" />
                    </div>
                    <TextInput id="nombre" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={producto.nombre} name='nombre' placeholder="Escribe el nombre del plato..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo de producto" />
                    </div>
                    <Select id="tipo" icon={FaKeyboard} onChange={handleChange} name='tipo'
                        value={producto.tipo ?? ""}>
                        <option value="" disabled>Escoja una opcion...</option>
                        <option value="COMIDA">Comida</option>
                        <option value="BEBIDA">Bebida</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                {producto.tipo === "COMIDA" && (
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="categoria" value="Categoría" />
                        </div>
                        <Select id="categoria" icon={FaKeyboard} onChange={handleChange} name='categoria'
                            value={producto.categoria || ""}>
                            <option value="" disabled>Escoja una opcion...</option>
                            <option value="Entrada">Entrada</option>
                            <option value="Desayuno">Desayuno</option>
                            <option value="Almuerzo">Almuerzo</option>
                            <option value="Cena">Cena</option>
                        </Select>
                        <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                    </div>
                )}
                <div className="w-1/2">
                    <div className="mb-2 block">
                        <label className="text-sm font-medium text-gray-900" htmlFor="file_input">Imagen</label>
                    </div>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                        type="file" name='imagen' onChange={handleChangeImage} accept="image/*" />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">PNG, JPG (MAX. 2MB).</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col gap-2 sm:flex-row">

                {producto.tipo === "COMIDA" && (
                    <>
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="cocina" value="Ubicación del plato" />
                            </div>
                            <Select id="cocina" onChange={handleChange} name='cocina_id' icon={FaKeyboard}
                                value={producto.cocina_id ?? ""}>
                                <option value="" disabled>Escoja una opcion...</option>
                                {cocinas.map((cocina) => (
                                    <option key={cocina.id} value={cocina.id}>{cocina.nombre}</option>
                                ))}
                            </Select>
                            <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                        </div>
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="insumo" value="Insumo principal" />
                            </div>
                            <Select id="insumo" onChange={handleChange} name='insumo_presentacion_id' icon={FaKeyboard}
                                value={producto.insumo_presentacion_id ?? ""}>
                                <option value="" disabled>Escoja una opcion...</option>
                                {insumos.map((insumo) => (
                                    <option key={insumo.id} value={insumo.id}>{insumo.nombre}</option>
                                ))}
                            </Select>
                            <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                        </div>
                    </>
                )}
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="precio" value="Precio" />
                    </div>
                    <TextInput id="precio" type="number" icon={FaKeyboard} onChange={handleChange}
                        value={producto.precio} name='precio' placeholder="Escribe el precio del plato..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="estado" value="Disponibilidad" />
                    </div>
                    <Select id="estado" onChange={handleChange} name='estado' value={producto.estado || ""} icon={FaEye}>
                        <option value="" disabled>Escoja una opcion...</option>
                        <option value="1">Disponible</option>
                        <option value="2">No Disponible</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            {producto.tipo === "COMIDA" && (
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="descripcion" value="Ingredientes del plato" />
                    </div>
                    <Textarea id="descripcion" onChange={handleChange} value={producto.descripcion}
                        name='descripcion' placeholder="Descripción del plato (ingredientes)..." />
                </div>
            )}
        </div>
    )
}
