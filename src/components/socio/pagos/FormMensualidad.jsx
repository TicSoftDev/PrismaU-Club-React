import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaDollarSign, FaKey } from 'react-icons/fa';
import { formatearMoneda } from '../../../models/FormateadorModel';
import Spinner from '../../../utilities/spinner/Spinner';
import DataTableComponent from '../../../utilities/dataTable/DataTableComponent';
import { AportesCuotasColumn } from '../../../models/columns/AportesCuotasColumn';

export default function FormMensualidad({ mensualidad, loading, getPago, touched, handleChange, handleChangeCheck }) {

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
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:my-5">
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
                    <Button onClick={getPago}>
                        {loading ? <><Spinner /> Cargando... </> : 'Continuar'}
                    </Button>
                </div>
            </div>
        </>
    )
}
