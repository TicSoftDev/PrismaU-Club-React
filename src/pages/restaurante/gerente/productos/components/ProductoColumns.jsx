import { FaEdit, FaListOl, FaTrashAlt } from "react-icons/fa";
import { RouteBack } from "../../../../../models/RutasModel";
import imagen from "../../../../../assets/img/imagen";
import { formatearMoneda } from "../../../../../models/FormateadorModel";

export const ProductoColumns = ({ cargarProducto, handleDelete }) => {

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
                    <button onClick={() => cargarProducto(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
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
                    <span className="font-semibold">{row.nombre}</span>
                </div>
            )
        },
        {
            name: "Tipo",
            selector: row => row.tipo,
            width: '180px',
        },
        {
            name: "Categoria",
            selector: row => row.categoria,
            width: '180px',
        },
        {
            name: "Precio",
            selector: row => formatearMoneda(row.precio),
            width: '120px',
        },
        {
            name: "Disponibilidad",
            selector: row => row.estado  ? "Disponible" : "No Disponible",
            width: '150px',
        }
    ];
};