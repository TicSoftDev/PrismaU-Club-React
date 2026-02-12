import { FaEdit, FaListOl, FaTrashAlt } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";

export const CocinaColumns = ({ cargarCocina, handleDelete, asignCocinero }) => {

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
                    <button onClick={() => cargarCocina(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.id)} className="rounded-full w-8 h-8 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrashAlt /></button>
                    <button onClick={() => asignCocinero(row)} className="rounded-full w-8 h-8 bg-green-600 text-white flex justify-center items-center" title="Asignar"><LuChefHat /></button>
                </div>
            ),
            width: '200px',
        },
        {
            name: "Nombre",
            selector: row => row.nombre,
        },
        {
            name: "Cocinero",
            selector: row => row.empleado_id ? row.empleado.Nombre + " " + row.empleado.Apellidos : "Sin Asignar"
        }
    ];
};