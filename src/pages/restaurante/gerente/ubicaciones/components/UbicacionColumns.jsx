import { FaChair, FaEdit, FaListOl, FaTable, FaTrashAlt } from "react-icons/fa";

export const UbicacionColumns = ({ cargarUbicacion, handleDelete, goToMesas }) => {

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
                    <button onClick={() => cargarUbicacion(row)} className="rounded-full w-8 h-8 bg-blue-700 text-white flex justify-center items-center" title="Editar"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.id)} className="rounded-full w-8 h-8 bg-red-600 text-white flex justify-center items-center" title="Eliminar"><FaTrashAlt /></button>
                    <button onClick={() => goToMesas(row)} className="rounded-full w-8 h-8 bg-green-600 text-white flex justify-center items-center" title="Mesas"><FaTable /></button>
                </div>
            ),
            width: '200px',
        },
        {
            name: "Ubicación",
            selector: row => row.ubicacion,
        }
    ];
};