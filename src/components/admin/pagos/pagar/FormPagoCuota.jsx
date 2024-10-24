import { Button, Label, Select, TextInput } from 'flowbite-react'
import React from 'react'
import { FaCalendarAlt, FaCreditCard, FaDollarSign, FaKey } from 'react-icons/fa'
import { AportesCuotasColumn } from '../../../../models/columns/AportesCuotasColumn'
import { formatearMoneda } from '../../../../models/FormateadorModel'
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent'
import Spinner from '../../../../utilities/spinner/Spinner'

export default function FormPagoCuota({ cuota, handleChange, pagar, documento, loading }) {

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
                        <Label htmlFor="mes" value="Año" />
                    </div>
                    <TextInput id="mes" type="text" icon={FaCalendarAlt} value={cuota.año} disabled />
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
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-5">
                <div className="w-full">
                    <div className="mb-2 block">
                        <span className='font-medium text-sm'>Abonos</span>
                    </div>
                    <DataTableComponent columns={columns} data={cuota.pago} />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3 border p-4 rounded-lg">
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
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="monto" value="Monto a pagar" />
                    </div>
                    <TextInput id="monto" type="number" icon={FaDollarSign} name='valor' onChange={handleChange}
                        placeholder='Ingrese el monto...' />
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
