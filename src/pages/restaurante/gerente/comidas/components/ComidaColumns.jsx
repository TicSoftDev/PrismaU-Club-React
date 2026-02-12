import { FaEdit, FaListOl, FaTrashAlt } from "react-icons/fa";
import { RouteBack } from "../../../../../models/RutasModel";
import imagen from "../../../../../assets/img/imagen";

export const ComidaColumns = ({ cargarComida, handleDelete }) => {

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
                    <button onClick={() => cargarComida(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.id)} className="rounded-full w-8 h-8 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrashAlt /></button>
                </div>
            ),
            width: '150px',
        },
        {
            name: "Nombre",
            cell: row => (
                <div className="flex items-center space-x-3 w-full">
                    <img className="w-10 h-10 rounded-full object-cover" src={row.imagen ? `${RouteBack}${row.imagen}` : imagen.logoPrisma} alt="Imagen" />
                    <span className="font-semibold">{row.comida}</span>
                </div>
            )
        },
        {
            name: "Tipo",
            selector: row => row.tipo,
            width: '180px',
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
            name: "Ubicación",
            selector: row => row.cocina.nombre,
        },
        {
            name: "Disponibilidad",
            selector: row => row.estado === 1 ? "Disponible" : "No Disponible",
            width: '150px',
        }
    ];
};