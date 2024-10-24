import { Button } from "flowbite-react";
import { FaCogs, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes, RouteBack } from "../RutasModel";

export const SociosColumn = () => {

    const navigate = useNavigate();

    return [
        {
            name: (<div className="flex itenavigatems-center gap-2">
                <FaCogs />
            </div>),
            cell: row => (
                <div className="flex">
                    <Button onClick={() => navigate(PrivateRoutes.PAGOS_SOCIOS, { state: { documento: row.Documento } })} className='rounded-full w-9 bg-pink-600 text-white' title='Mensualidades'>
                        <FaCreditCard />
                    </Button>
                    <Button onClick={() => navigate(PrivateRoutes.PAGOS_CUOTAS_BAILE, { state: { documento: row.Documento } })} className='rounded-full w-9 bg-green-600 text-white' title='Cuotas de Baile'>
                        <FaCreditCard />
                    </Button>
                </div >
            ),
            width: '180px',
        },
        {
            name: "Nombre Completo",
            cell: row => (
                <div className="flex items-center space-x-3 w-full">
                    <div className="shrink-0">
                        {
                            row.imagen ?
                                <img className="w-10 h-10 rounded-full object-cover" src={RouteBack + row.imagen} alt="Imagen del" /> :
                                row.Sexo == "Femenino" ?
                                    <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png" alt="Imagen predeterminada de mujer" />
                                    : <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Imagen predeterminada de hombre" />
                        }
                    </div>
                    <div className="flex-grow">
                        <div className="text-base font-semibold whitespace-normal">{row.Nombre}</div>
                        <div className="font-normal text-gray-500 whitespace-normal">{row.Apellidos}</div>
                    </div>
                </div>
            ),
            style: {
                padding: '10px'
            }
        },
        {
            name: "Código",
            selector: row => row.Codigo ? row.Codigo : (
                <span className="bg-red-300 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Sin asignar
                </span>
            ),
        },
        {
            name: "Identificación",
            selector: row => row.Documento,

        },
        {
            name: "Teléfono",
            selector: row => row.Telefono,
        },
    ];
};