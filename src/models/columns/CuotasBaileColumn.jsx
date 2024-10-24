import { Button } from "flowbite-react";
import { FaCogs, FaDollarSign, FaEye } from "react-icons/fa";
import { formatearMoneda } from "../FormateadorModel";

export const CuotasBaileColumn = ({ cargar, cargarFactura }) => {

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
                </div>
            ),
        },
        {
            name: "Año",
            selector: row => row.año,
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
            name: "Porcentaje",
            selector: row => {
                const porcentajePagado = row.valor > 0 ? (row.total_pagos / row.valor) * 100 : 0;
                return (
                    <div className="w-16">
                        <div className="relative h-2 bg-gray-200 rounded mt-1">
                            <div className="absolute h-full bg-green-500 rounded"
                                style={{ width: `${porcentajePagado}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500">{`${Math.round(porcentajePagado)}%`}</span>
                    </div>
                );
            },
        },
        {
            name: "Estado",
            selector: row => row.estado == 1 ? <span className="bg-green-100 text-green-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Pagado</span> :
                <span className="bg-red-100 text-red-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Pendiente</span>,
        }
    ];
};
