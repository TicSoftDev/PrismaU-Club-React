import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import { Button } from "flowbite-react";
import { FaCogs, FaDollarSign, FaEye } from "react-icons/fa";
import { formatearMoneda } from "../FormateadorModel";

export const MensualidadesColumn = (cargar, cargarFactura) => {

    const zonaHoraria = 'America/Bogota';

    return [
        {
            name: (
                <div className="flex items-center gap-2">
                    <FaCogs />
                </div>
            ),
            cell: row => (
                <div className="flex">
                    {
                        row.estado == 1 ?
                            <Button onClick={() => cargarFactura(row)} className='rounded-full w-9 bg-green-500 text-white' title='Ver Pago'>
                                <FaEye />
                            </Button>
                            :
                            <Button onClick={() => cargar(row)} className='rounded-full w-9 bg-pink-600 text-white' title='Pagar'>
                                <FaDollarSign />
                            </Button>
                    }
                </div >
            ),
        },
        {
            name: "Mes",
            selector: row => {
                const zonedDate = toZonedTime(row.fecha, zonaHoraria);
                const month = format(zonedDate, 'MMMM yyyy', { locale: es });
                return month.charAt(0).toUpperCase() + month.slice(1);
            },
        },
        {
            name: "Valor",
            selector: row => formatearMoneda(row.valor),
        },
        {
            name: "Total abonos",
            selector: row => formatearMoneda(row.total_pagos),
        },
        {
            name: "Restante",
            selector: row => formatearMoneda(row.restante),
        },
        {
            name: "Estado",
            selector: row => row.estado === 1 ?
                <span className="bg-green-100 text-green-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Pagado</span> :
                <span className="bg-red-100 text-red-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Pendiente</span>,
        },
    ];
};
