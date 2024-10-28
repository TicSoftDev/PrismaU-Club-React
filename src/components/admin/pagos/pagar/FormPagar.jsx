import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaCreditCard, FaDollarSign, FaKey, FaMoneyBill } from 'react-icons/fa';
import { AportesCuotasColumn } from '../../../../models/columns/AportesCuotasColumn';
import { formatearMoneda } from '../../../../models/FormateadorModel';
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent';
import Spinner from '../../../../utilities/spinner/Spinner';

export default function FormPagar({ touched, handleChangeCheck, documento, mensualidad, loading, pagar, handleChange, handleChangeImagen }) {

    const columns = AportesCuotasColumn();
    const zonaHoraria = 'America/Bogota';
    const zoneDate = toZonedTime(mensualidad.fecha, zonaHoraria);
    const month = format(zoneDate, 'MMMM', { locale: es });
    const monthName = month.charAt(0).toUpperCase() + month.slice(1);

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="id" value="Id pago" />
                    </div>
                    <TextInput id="id" type="text" icon={FaKey} value={mensualidad.id} disabled />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="mes" value="Mes" />
                    </div>
                    <TextInput id="mes" type="text" icon={FaCalendarAlt} value={monthName} disabled />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="valor" value="Valor" />
                    </div>
                    <TextInput id="valor" type="text" icon={FaDollarSign} value={formatearMoneda(mensualidad.valor)} disabled />
                </div>
            </div>
            {
                mensualidad.pago.length > 0 &&
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-5">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <span className='font-medium text-sm'>Abonos</span>
                        </div>
                        <DataTableComponent columns={columns} data={mensualidad.pago} />
                    </div>
                </div>
            }
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Metodo de pago" />
                    </div>
                    <Select id="tipo" type="text" icon={FaCreditCard} onChange={handleChange} name='metodo_pago'
                        defaultValue={"Escoja una Opción..."}>
                        <option disabled>Escoja una Opción...</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta de Credito">Tarjeta de Credito</option>
                        <option value="Transferencia">Transferencia</option>
                    </Select>
                </div>
                <div className="w-1/2">
                    <div className="flex items-center gap-2 mt-10">
                        <Checkbox id="agregarValor" checked={touched} onChange={handleChangeCheck} />
                        <Label htmlFor="agregarValor">¿Cambiar valor?</Label>
                    </div>
                </div>
                {(touched || mensualidad.total_pagos != 0) && (
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="nuevoValor" value="Nuevo Valor" />
                        </div>
                        <TextInput id="nuevoValor" type="number" icon={FaDollarSign} onChange={handleChange} name='valor' />
                    </div>
                )}
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 mt-5">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="referencia" value="Referencia de pago" />
                    </div>
                    <TextInput id="referencia" type="text" icon={FaMoneyBill} onChange={handleChange} name='referencia_pago'
                        placeholder='Referencia de pago' />
                </div>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Soporte de pago</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                        type="file" name='soporte' onChange={handleChangeImagen} />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 mt-5">
                <div className="w-full">
                    <Button onClick={() => pagar(documento)}>
                        {loading ? <><Spinner /> Cargando... </> : 'Pagar'}
                    </Button>
                </div>
            </div>
        </>
    )
}
