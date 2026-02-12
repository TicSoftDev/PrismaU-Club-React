import { FaEye, FaListOl } from "react-icons/fa";
import { formatearFechaHora, formatearMoneda } from "../../../../../models/FormateadorModel";

export const PedidosColumn = ({ cargarPedido }) => {

    return [
        {
            name: <FaListOl />,
            selector: (_row, index) => index + 1,
            width: '50px',
        },
        {
            name: "Acciones",
            cell: row => (
                <div className="flex">
                    <button onClick={() => cargarPedido(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Ver pedido"><FaEye /></button>
                </div>
            ),
            width: '120px',
        },
        {
            name: "Socio",
            selector: row => `${row.usuario?.Nombre} ${row.usuario?.Apellidos}`,
        },
        {
            name: "Ubicación",
            selector: row => `${row.mesa?.ubicacion.ubicacion} - Mesa ${row.mesa?.numero}`,
        },
        {
            name: "Fecha",
            selector: row => formatearFechaHora(row.created_at),
        },
        {
            name: "Valor Total",
            selector: row => formatearMoneda(row.total),
            width: '150px',
        }
    ];
};