import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { FaCalendarAlt, FaDollarSign, FaKey } from 'react-icons/fa'
import { AportesCuotasColumn } from '../../../../models/columns/AportesCuotasColumn'
import { formatearMoneda } from '../../../../models/FormateadorModel'
import DataTableComponent from '../../../../utilities/dataTable/DataTableComponent'
import Spinner from '../../../../utilities/spinner/Spinner'

export default function FormPagarCuota({ cuota, handleChange, pagar, loading }) {

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
                        <Label htmlFor="monto" value="Monto a pagar" />
                    </div>
                    <TextInput id="monto" type="number" icon={FaDollarSign} name='valor' onChange={handleChange}
                        placeholder='Ingrese el monto...' />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 mt-5">
                <div className="w-full">
                    <Button onClick={() => pagar()}>
                        {loading ? <><Spinner /> Cargando... </> : 'Confirmar'}
                    </Button>
                </div>
            </div>
        </>
    )
}
