import { FaListOl } from "react-icons/fa";
import { formatearMoneda } from "../../../../../models/FormateadorModel";
import { RouteBack } from "../../../../../models/RutasModel";

export const DetalleInventarioColumns = () => {

    return [
        {
            name: <FaListOl />,
            selector: (_row, index) => index + 1,
            width: '80px',
        },
        {
            name: "Nombre",
            cell: row => (
                <div className="flex items-center space-x-3 w-full">
                    <img className="w-10 h-10 rounded-full object-cover" src={row.itemable.imagen ? `${RouteBack}${row.itemable.imagen}` : imagen.logoPrisma} alt="Imagen" />
                    <span className="font-semibold">{row.itemable.comida ?? row.itemable.bebida}</span>
                </div>
            )
        },
        {
            name: "Tipo",
            selector: row => row.itemable_type,
            width: '150px',
        },
        {
            name: "Precio",
            selector: row => formatearMoneda(row.itemable.precio),
            width: '150px',
        },
        {
            name: "Cantidad",
            selector: row => row.cantidad_inicial,
            width: '120px',
        },
        {
            name: "Disponible",
            selector: row => row.cantidad_disponible,
            width: '120px',
        },
    ];
};