import { FaEdit, FaEye, FaListOl, FaTrashAlt } from "react-icons/fa";

export const InsumoColumns = ({ cargarInsumo, handleDelete, goToPresentations }) => {

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
                    <button onClick={() => cargarInsumo(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.id)} className="rounded-full w-8 h-8 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrashAlt /></button>
                    <button onClick={() => goToPresentations(row)} className="rounded-full w-8 h-8 bg-green-600 text-white flex justify-center items-center" title="Presentaciones"><FaEye /></button>
                </div>
            ),
        },
        {
            name: "Nombre",
            cell: row => row.nombre
        },
        {
            name: "Unidad",
            selector: row => row.unidad,
        },
        {
            name: "Disponibilidad",
            selector: row => row.activo ? "Disponible" : "No Disponible",
        }
    ];
};