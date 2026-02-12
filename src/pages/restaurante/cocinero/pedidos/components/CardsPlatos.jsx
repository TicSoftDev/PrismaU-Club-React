import { Timer } from "lucide-react";
import { formatearHora } from "../../../../../models/FormateadorModel";
import { RouteBack } from "../../../../../models/RutasModel";
import Spinner from "../../../../../utilities/spinner/Spinner";
import { getDishStatusStyle } from "./cardStyle";

export default function CardsPlatos({ pedido, accion, loadingPlato, cambiarEstadoPlato }) {
    return (
        <div className="p-6 space-y-4">
            {pedido?.detalle_pedido.map(dish => (
                <div key={dish.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-gray-300">
                    <div className="flex gap-4">
                        <div className="relative w-32 h-32 flex-shrink-0">
                            <img src={`${RouteBack}${dish.itemable.imagen}`} alt={dish.tipo} className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                                x{dish.cantidad}
                            </div>
                        </div>

                        <div className="flex-1 p-3 flex flex-col justify-between">
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className="font-bold text-gray-800 text-md leading-tight">{dish.itemable.comida || dish.itemable.bebida}</h3>
                                    <span className={`${getDishStatusStyle(dish.estado)} px-3 py-0 rounded-lg text-xs font-bold shadow-md whitespace-nowrap`}>
                                        {dish.estado === 'Pendiente' && 'Pendiente'}
                                        {dish.estado === 'En Preparacion' && 'Preparando'}
                                        {dish.estado === 'Preparado' && '✓ Listo'}
                                        {dish.estado === 'Rechazado' && 'No Disponible'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <Timer className="w-3.5 h-3.5" />
                                    <span className="font-semibold">{formatearHora(dish?.created_at)}</span>
                                </div>
                                <p className="text-sm text-orange-600 font-medium italic bg-orange-50 px-1 py-1 rounded-lg inline-block">
                                    📝 {dish.observaciones || 'Sin Observaciones'}
                                </p>
                            </div>

                            {pedido.estado === 'En Preparacion' && dish.estado !== 'Preparado' && dish.estado !== 'Rechazado' && (
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {dish.estado === 'Pendiente' ? (
                                        <>
                                            <button disabled={loadingPlato}
                                                onClick={() => cambiarEstadoPlato(dish.id, 'En Preparacion', 'Preparar')}
                                                className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold py-1 px-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
                                            >
                                                {(loadingPlato && accion === 'Preparar') ? <Spinner /> : 'Preparar'}
                                            </button>
                                            <button disabled={loadingPlato}
                                                onClick={() => cambiarEstadoPlato(dish.id, 'Rechazado', 'NoDisponible')}
                                                className="bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-xs font-bold py-1 px-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
                                            >
                                                {(loadingPlato && accion === 'NoDisponible') ? <Spinner /> : 'N/D'}
                                            </button>
                                        </>
                                    ) : (
                                        <button disabled={loadingPlato}
                                            onClick={() => cambiarEstadoPlato(dish.id, 'Preparado', 'Listo')}
                                            className="bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-xs font-bold py-1 px-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
                                        >
                                            {(loadingPlato && accion === 'Listo') ? <Spinner /> : 'Listo'}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
