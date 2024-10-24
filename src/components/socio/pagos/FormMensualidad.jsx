import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaDollarSign, FaKey } from 'react-icons/fa';
import { formatearMoneda } from '../../../models/FormateadorModel';
import Spinner from '../../../utilities/spinner/Spinner';

export default function FormMensualidad({ mensualidad, loading, getPago }) {

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
