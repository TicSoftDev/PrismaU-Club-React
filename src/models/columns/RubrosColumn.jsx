import { FaEdit, FaTrash } from "react-icons/fa";
import { formatearMoneda } from "../FormateadorModel";

export const rubrosColumn = (cargar, eliminar) => {
    
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
                    <button onClick={() => cargar(row)} className="rounded-full w-9 h-9 bg-blue-700 text-white flex justify-center items-center" title="Editar">
                        <FaEdit />
                    </button>
                    <button onClick={() => eliminar(row.id)} className="rounded-full w-9 h-9 bg-red-600 text-white flex justify-center items-center" title="Eliminar">
                        <FaTrash />
                    </button>
                </div>
            ),
            width: '160px'
        },
        {
            name: "Rubro",
            cell: row => row.rubro,
        },
        {
            name: "Valor",
            cell: row => formatearMoneda(row.valor),
        },
    ];
}