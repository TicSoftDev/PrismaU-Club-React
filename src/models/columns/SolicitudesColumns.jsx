import { Button } from 'flowbite-react';
import React from 'react';
import { FaComment, FaEye } from 'react-icons/fa';
import { formatearFecha } from '../FormateadorModel';

export default function SolicitudesColumns({ cargarSolicitud }) {

    return [
        {
            name: "N°",
            cell: (row, i) => i + 1,
            width: '50px',
        },
        {
            name: "Actions",
            cell: row => (
                <div className="flex">
                    <Button onClick={() => cargarSolicitud(row)} className={`rounded-full w-9 ${row.Estado == 0 ? 'bg-green-600' : 'bg-orange-500'} text-white`} title='Responder' >
                        {row.Estado == 0 ?<FaEye /> : <FaComment />}
                    </Button>
                </div>
            ),
            width: '90px',
        },
        {
            name: "Estado",
            cell: row => (
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${row.Estado == 0 ? 'bg-green-500' : 'bg-orange-500'} mr-2`}></div>
                    {row.Estado == 0 ? "Aprobada" : "Pendiente"}
                </div>
            ),
            width: '130px',
        },
        {
            cell: row => row.user.asociado ?
                row.user.asociado.Nombre + " " + row.user.asociado.Apellidos :
                row.user.adherente.Nombre + " " + row.user.adherente.Apellidos,
            width: '300px'
        },
        {
            name: "Tipo de solicitud",
            selector: row => row.Tipo,
        },
        {
            name: "Fecha",
            cell: row => formatearFecha(row.created_at),
            width: '120px',
        },
    ];
}
