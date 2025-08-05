import { Checkbox, Label, Select, TextInput } from 'flowbite-react';
import { FaCalendarAlt, FaClock, FaKeyboard, FaUser } from 'react-icons/fa';

function FormNoticias({ noticia, hanleChange, touched, handleChangeCheck }) {

    const inputClass = (value) => (
        touched && value.trim() === '' && 'border border-red-500 rounded-lg'
    );

    return (
        <div className="space-y-4">
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Titulo" value="Titulo del Evento" />
                    </div>
                    <TextInput id="Titulo" type="text" icon={FaKeyboard} onChange={hanleChange}
                        className={inputClass(noticia.Titulo)} value={noticia.Titulo}
                        name='Titulo' placeholder="Escribe el titulo..." />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="descripcion" value="Descripción del Evento" />
                    </div>
                    <textarea id="descripcion" rows="3" className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputClass(noticia.Descripcion)}`}
                        name='Descripcion' onChange={hanleChange} placeholder="Escriba la descripcion de la noticia..." value={noticia.Descripcion} maxLength={150}></textarea>
                </div>
            </div>
            {/* <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="file_input" value="Imagen" />
                    </div>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                        type="file" name='Imagen' onChange={handleChangeImage} />
                </div>
            </div> */}
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Fecha" value="Fecha del Evento" />
                    </div>
                    <TextInput id="Fecha" type="date" icon={FaClock} onChange={hanleChange}
                        className={inputClass(noticia.Fecha)} value={noticia.Fecha} name='Fecha' />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Hora" value="Hora del Evento" />
                    </div>
                    <TextInput id="Hora" type="time" icon={FaClock} onChange={hanleChange}
                        className={inputClass(noticia.Hora)} value={noticia.Hora} name='Hora' />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Tipo" value="Tipo de Evento" />
                    </div>
                    <Select id="Tipo" icon={FaCalendarAlt} onChange={hanleChange} name='Tipo'
                        className={inputClass(noticia.Tipo)} value={noticia.Tipo || ''}>
                        <option value="" disabled>Escoja una opción...</option>
                        <option value="Aviso">Aviso</option>
                        <option value="Noticia">Noticia</option>
                        <option value="Fiesta">Fiesta</option>
                        <option value="Reunion">Reunión</option>
                        <option value="Alerta">Alerta</option>
                        <option value="Otro">Otro</option>
                    </Select>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Vencimiento" value="Fecha Vencimiento" />
                    </div>
                    <TextInput id="Vencimiento" type="date" icon={FaCalendarAlt} onChange={hanleChange}
                        className={inputClass(noticia.Vencimiento)} value={noticia.Vencimiento}
                        name='Vencimiento' placeholder="Escribe el titulo..." />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full flex gap-2 items-center">
                    <Checkbox id="correo" onChange={handleChangeCheck} name='correo' checked={noticia.correo} />
                    <Label htmlFor="correo" value="Notificar Por Correo" />
                </div>
                <div className="w-full flex gap-2 items-center">
                    <Checkbox id="push" onChange={handleChangeCheck} name='push' checked={noticia.push} />
                    <Label htmlFor="push" value="Notificar Por Push" />
                </div>
            </div>
            {(noticia.correo || noticia.push) && (
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="destinatario" value="Destinatario" />
                        </div>
                        <Select id="destinatario" icon={FaUser} name='Destinatario' onChange={hanleChange}
                            value={noticia.Destinatario || ''}>
                            <option value="" disabled>Escoja una opción...</option>
                            <option value={2}>Asociados</option>
                            <option value={3}>Adherentes</option>
                            <option value={4}>Familiares</option>
                            <option value={5}>Empleados</option>
                            <option value={6}>Porteros</option>
                        </Select>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FormNoticias