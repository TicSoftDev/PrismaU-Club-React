import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react'
import { FaCalendarAlt, FaCreditCard, FaDollarSign, FaKey, FaMoneyBill } from 'react-icons/fa'
import { AportesCuotasColumn } from '../../../../models/columns/AportesCuotasColumn'
import { formatearMoneda } from '../../../../models/FormateadorModel'
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent'
import Spinner from '../../../../utilities/spinner/Spinner'

export default function FormPagoCuota({ cuota, handleChange, pagar, documento, loading, handleChangeImagen, handleChangeCheck, touched }) {

    const columns = AportesCuotasColumn();

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 border p-4 rounded-lg">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="id" value="Id pago" />
                    </div>
                    <TextInput id="id" type="text" icon={FaKey} value={cuota.id} disabled />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="mes" value="Descripcion" />
                    </div>
                    <TextInput id="mes" type="text" icon={FaCalendarAlt} value={cuota.descripcion} disabled />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="valor" value="Valor" />
                    </div>
                    <TextInput id="valor" type="text" icon={FaDollarSign} value={formatearMoneda(cuota.valor)} disabled />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="restante" value="Restante" />
                    </div>
                    <TextInput id="restante" type="text" icon={FaDollarSign} value={formatearMoneda(cuota.restante)} disabled />
                </div>
            </div>
            {
                cuota.pago.length > 0 &&
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-5">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <span className='font-medium text-sm'>Abonos</span>
                        </div>
                        <DataTableComponent columns={columns} data={cuota.pago} />
                    </div>
                </div>
            }
            <div className='border p-4 rounded-lg mt-3'>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
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
                            <option value="Canje">Canje</option>
                        </Select>
                    </div>
                    <div className="w-1/2">
                        <div className="flex items-center gap-2 mt-10">
                            <Checkbox id="agregarValor" checked={touched} onChange={handleChangeCheck} />
                            <Label htmlFor="agregarValor">¿Cambiar valor?</Label>
                        </div>
                    </div>
                    {(touched || cuota.total_pagos != 0) && (
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
