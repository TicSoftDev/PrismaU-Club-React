import { FaEdit, FaListOl, FaTrashAlt } from "react-icons/fa";
import { RouteBack } from "../../../../../models/RutasModel";

export const BebidaColumns = ({ cargarBebida, handleDelete }) => {

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
                    <button onClick={() => cargarBebida(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.id)} className="rounded-full w-8 h-8 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrashAlt /></button>
                </div>
            ),
            width: '150px',
        },
        {
            name: "Nombre",
            cell: row => (
                <div className="flex items-center space-x-3 w-full">
                    <img className="w-10 h-10 rounded-full object-cover" src={RouteBack + row.imagen} alt="Imagen" />
                    <span className="font-semibold">{row.bebida}</span>
                </div>
            )
        },
        {
            name: "Precio",
            selector: row => row.precio,
            width: '120px',
        },
        {
            name: "Cantidad",
            selector: row => row.cantidad,
            width: '120px',
        },
        {
            name: "Stock",
            selector: row => row.stock,
            width: '120px',
        },
        {
            name: "Ubicación",
            selector: row => row.ubicacion.ubicacion,
        },
        {
            name: "Disponibilidad",
            selector: row => row.estado === 1 ? "Disponible" : "No Disponible",
            width: '150px',
        }
    ];
};