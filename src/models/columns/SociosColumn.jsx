import { Button } from "flowbite-react";
import { FaCogs, FaCreditCard, FaEdit, FaSave } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utilities/spinner/Spinner";
import { formatearMoneda } from "../FormateadorModel";
import { PrivateRoutes, RouteBack } from "../RutasModel";

export const SociosColumn = ({
    editingMensualidad, valorMensualidad, loadingMensualidad, handleEditMensualidad, handleSaveMensualidad,
    handleCancelMensualidad, setValorMensualidad, editingCuotaBaile, valorCuota, loadingCuotaBaile,
    handleEditCuotaBaile, handleSaveCuotaBaile, handleCancelCuotaBaile, setValorCuota
}) => {
    const navigate = useNavigate();

    return [
        {
            name: (<div className="flex items-center gap-2">
                <FaCogs />
            </div>),
            cell: row => (
                <div className="flex">
                    <Button onClick={() => navigate(PrivateRoutes.PAGOS_SOCIOS, { state: { documento: row.documento } })} className='rounded-full w-9 bg-pink-600 text-white' title='Mensualidades'>
                        <FaCreditCard />
                    </Button>
                    <Button onClick={() => navigate(PrivateRoutes.PAGOS_CUOTAS_BAILE, { state: { documento: row.documento } })} className='rounded-full w-9 bg-green-600 text-white' title='Cuotas de Baile'>
                        <FaCreditCard />
                    </Button>
                </div>
            ),
            width: '150px',
        },
        {
            name: "Nombre Completo",
            cell: row => (
                <div className="flex items-center space-x-3 w-full">
                    <div className="shrink-0">
                        {
                            row.imagen ?
                                <img className="w-10 h-10 rounded-full object-cover" src={RouteBack + row.imagen} alt="Imagen del" /> :
                                row.Sexo === "Femenino" ?
                                    <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png" alt="Imagen predeterminada de mujer" />
                                    : <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Imagen predeterminada de hombre" />
                        }
                    </div>
                    <div className="flex-grow">
                        <div className="text-base font-semibold whitespace-normal">{row.nombre}</div>
                        <div className="font-normal text-gray-500 whitespace-normal">{row.apellidos}</div>
                    </div>
                </div>
            ),
            style: {
                padding: '10px'
            },
            width: '250px'
        },
        {
            name: "Código",
            selector: row => row.codigo ? row.codigo : (
                <span className="bg-red-300 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Sin asignar
                </span>
            ),
            width: '120px'
        },
        {
            name: "Documento",
            selector: row => row.documento,
            width: '120px'
        },
        {
            name: "Mensualidad",
            cell: row => (
                <div className="flex items-center">
                    {editingMensualidad === row.documento ? (
                        <>
                            <input type="number" className="border border-gray-300 rounded p-1 w-24" value={valorMensualidad}
                                onChange={e => setValorMensualidad(e.target.value)} />
                            <Button onClick={() => handleSaveMensualidad(row.documento)} className="ml-2 w-7 h-7 bg-green-500 text-white">
                                {loadingMensualidad ? <Spinner /> : <FaSave />}
                            </Button>
                            <Button onClick={handleCancelMensualidad} className="ml-2 w-7 h-7 bg-red-500 text-white">
                                <FaX />
                            </Button>
                        </>
                    ) : (
                        <>
                            <span>{formatearMoneda(row.mensualidad)}</span>
                            <Button onClick={() => handleEditMensualidad(row)} className="ml-2 w-7 h-7 bg-blue-500 text-white">
                                <FaEdit />
                            </Button>
                        </>
                    )}
                </div>
            ),
        },
        {
            name: "Cuota de baile",
            cell: row => (
                <div className="flex items-center">
                    {editingCuotaBaile === row.documento ? (
                        <>
                            <input type="number" className="border border-gray-300 rounded p-1 w-24"
                                value={valorCuota} onChange={e => setValorCuota(e.target.value)} />
                            <Button onClick={() => handleSaveCuotaBaile(row.documento)} className="ml-2 w-7 h-7 bg-green-500 text-white">
                                {loadingCuotaBaile ? <Spinner /> : <FaSave />}
                            </Button>
                            <Button onClick={handleCancelCuotaBaile} className="ml-2 w-7 h-7 bg-red-500 text-white">
                                <FaX />
                            </Button>
                        </>
                    ) : (
                        <>
                            <span>{formatearMoneda(row.cuota_baile)}</span>
                            <Button onClick={() => handleEditCuotaBaile(row)} className="ml-2 w-7 h-7 bg-blue-500 text-white">
                                <FaEdit />
                            </Button>
                        </>
                    )}
                </div>
            ),
        },
    ];
};
