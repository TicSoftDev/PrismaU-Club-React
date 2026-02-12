import { FaListOl } from "react-icons/fa";
import { formatearMoneda } from "../../../../../models/FormateadorModel";
import { RouteBack } from "../../../../../models/RutasModel";
import { TextInput, ToggleSwitch } from "flowbite-react";

export const ProductosColumns = ({ toggleIncluir, changeCantidad }) => {

    return [
        {
            name: <FaListOl />,
            selector: (_row, index) => index + 1,
            width: '100px',
        },
        {
            name: "Incluir",
            width: "150px",
            cell: (row) => (<ToggleSwitch checked={!!row.incluido} onChange={() => toggleIncluir(row)} />),
        },
        {
            name: "Cantidad",
            width: "150px",
            cell: (row) => (
                <TextInput type="number" min={0} value={row.cantidad_default ?? 0}
                    onChange={(e) => changeCantidad(row, e.target.value)} className="w-10/12" />
            ),
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
            name: "Precio",
            selector: row => formatearMoneda(row.precio),
        }
    ];
};