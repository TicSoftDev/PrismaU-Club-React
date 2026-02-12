import { FaEye, FaListOl } from "react-icons/fa";
import { formatearFechaString } from "../../../../../models/FormateadorModel";

export const InventarioColumns = ({ detalle }) => {

    return [
        {
            name: <FaListOl />,
            selector: (_row, index) => index + 1,
            width: '100px',
        },
        {
            name: "Acciones",
            cell: row => (
                <div className="flex">
                    <button onClick={() => detalle(row)} className="rounded-full w-8 h-8 bg-green-600 text-white flex justify-center items-center" title="Detalle">
                        <FaEye />
                    </button>
                </div>
            ),
            width: '200px',
        },
        {
            name: "Fecha de Inventario",
            selector: row => formatearFechaString(row.fecha),
        },
        {
            name: "Estado",
            selector: row => row.estado
        }
    ];
};