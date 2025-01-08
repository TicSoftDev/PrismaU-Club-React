import { formatearFecha } from "../FormateadorModel";

export default function ContratacionesColumn() {

    return [
        {
            name: "N°",
            cell: (row, i) => i + 1,
            width: '50px',
        },
        {
            name: "Nombre Completo",
            cell: row => row.Nombres + " " + row.Apellidos,
            width: '310px'
        },
        {
            name: "Identificación",
            selector: row => row.Identificacion,
            width: '150px',
        },
        {
            name: "Empresa",
            cell: row => row.Empresa,
            width: '200px'
        },
        {
            name: "Correo",
            cell: row => row.Correo,
            width: '300px'
        },
        {
            name: "Telefono",
            selector: row => row.Telefono,
        },
        {
            name: "Fecha",
            cell: row => formatearFecha(row.created_at),
            width: '120px',
        },
    ];
}
