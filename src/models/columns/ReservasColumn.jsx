import React from 'react'
import { formatearHora } from '../FormateadorModel';

export default function ReservasColumn() {

    return [
        {
            name: "N°",
            cell: (row, i) => i + 1,
            width: '50px',
        },
        {
            name: "Espacio",
            cell: row => row.espacio.Descripcion,
        },
        {
            name: "Fecha",
            cell: row => row.Fecha,
        },
        {
            name: "Hora inicial",
            cell: row => formatearHora(row.Inicio),
        },
        {
            name: "Hora final",
            cell: row => formatearHora(row.Fin),
        },
        {
            name: "Nombre completo",
            cell: row => row.user.asociado ?
                row.user.asociado.Nombre + " " + row.user.asociado.Apellidos :
                row.user.adherente.Nombre + " " + row.user.adherente.Apellidos,
            width: '300px',
        },

    ];
}
