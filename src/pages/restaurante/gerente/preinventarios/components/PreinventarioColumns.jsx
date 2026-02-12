import { FaEdit, FaEye, FaListOl, FaTrashAlt } from "react-icons/fa";

export const PreinventarioColumns = ({ cargarPreinventario, handleDelete, detalle }) => {

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
                    <button onClick={() => cargarPreinventario(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.id)} className="rounded-full w-8 h-8 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrashAlt /></button>
                    <button onClick={() => detalle(row)} className="rounded-full w-8 h-8 bg-green-600 text-white flex justify-center items-center" title="Detalle"><FaEye /></button>
                </div>
            ),
            width: '200px',
        },
        {
            name: "Nombre",
            selector: row => row.nombre,
        },
        {
            name: "Activo",
            selector: row => row.activo ? "Si" : "No"
        }
    ];
};