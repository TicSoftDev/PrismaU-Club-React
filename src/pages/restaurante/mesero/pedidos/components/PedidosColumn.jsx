import { Badge } from "flowbite-react";
import { FaDollarSign, FaExchangeAlt, FaEye, FaListOl, FaTimes } from "react-icons/fa";
import { formatearFechaHora, formatearMoneda } from "../../../../../models/FormateadorModel";
import { getStylePedidoBadge } from "../../../../../utilities/helpers/PedidoStyles";

export const PedidosColumn = ({ goDetalle, cancelarPedido, cargarPedidoMesa, pagarPedido }) => {

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
                    <button onClick={() => goDetalle(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Ver pedido">
                        <FaEye />
                    </button>
                    {row.estado === 'Abierto' &&
                        <button onClick={() => cancelarPedido(row.id)} className="rounded-full w-8 h-8 bg-red-600 text-white flex justify-center items-center" title="Cancelar pedido">
                            <FaTimes />
                        </button>
                    }
                    <button onClick={() => cargarPedidoMesa(row)} className="rounded-full w-8 h-8 bg-yellow-400 text-white flex justify-center items-center" title="Cambiar mesa">
                        <FaExchangeAlt />
                    </button>
                    {row.estado === 'Servido' &&
                        <button onClick={() => pagarPedido(row.id)} className="rounded-full w-8 h-8 bg-green-500 text-white flex justify-center items-center" title="Pagar">
                            <FaDollarSign />
                        </button>
                    }
                </div >
            ),
            width: '160px',
        },
        {
            name: "Estado",
            selector: row => <Badge className={`${getStylePedidoBadge(row.estado)} ring-1 ring-inset`}>{row.estado}</Badge>,
            width: '120px',
        },
        {
            name: "Socio",
            selector: row => `${row.usuario?.Nombre} ${row.usuario?.Apellidos}`,
            width: '280px',
        },
        {
            name: "Valor Total",
            selector: row => formatearMoneda(row.total),
            width: '130px',
        },
        {
            name: "Ubicación",
            selector: row => row.mesa?.ubicacion.ubicacion + ' - Mesa ' + row.mesa?.numero,
            width: '220px',
        },
        {
            name: "Fecha",
            selector: row => formatearFechaHora(row.created_at),
            width: '180px',
        },
    ];
};