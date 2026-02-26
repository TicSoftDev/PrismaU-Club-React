import { FaEdit, FaListOl, FaTrashAlt } from "react-icons/fa";

export const InsumoPresentacionColumns = ({ cargarInsumoPresentacion, handleDelete }) => {

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
                    <button onClick={() => cargarInsumoPresentacion(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.id)} className="rounded-full w-8 h-8 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrashAlt /></button>
                </div>
            ),
        },
        {
            name: "Presentación",
            selector: row => row.nombre,
        },
        {
            name: "Stock",
            selector: row => row.stock,
        }
    ];
};