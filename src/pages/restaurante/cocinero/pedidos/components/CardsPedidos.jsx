import { CheckCircle, Clock, XCircle } from "lucide-react";
import Spinner from "../../../../../utilities/spinner/Spinner";
import { formatearHoraDate } from "./../../../../../models/FormateadorModel";
import CardsPlatos from "./CardsPlatos";
import { getOrderStatusConfig } from "./cardStyle";

export default function CardsPedidos({ pedidos, loading, loadingEstado, accion, cambiarEstado, loadingPlato, cambiarEstadoPlato }) {

    if (loading) return <h1 className="text-center text-2xl font-semibold text-gray-700">Cargando...</h1>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {pedidos.map(pedido => {
                const statusConfig = getOrderStatusConfig(pedido.estado);
                const StatusIcon = statusConfig.icon;

                return (
                    <div key={pedido.pedido_id} className={`bg-gradient-to-br ${statusConfig.gradient} rounded-3xl border-2 ${statusConfig.borderColor} shadow-xl ${statusConfig.shadow} overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
                        <div className="bg-white/80 backdrop-blur-sm p-6 border-b-2 border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`relative bg-gradient-to-br ${statusConfig.iconBg} p-3 rounded-2xl shadow-lg`}>
                                        <StatusIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">MESA {pedido.mesa?.numero}</h2>
                                        <span className="text-xs text-gray-500 font-medium">{pedido.mesa?.ubicacion.ubicacion}</span>
                                    </div>
                                </div>
                                <div className={`${statusConfig.textColor} text-xs font-bold uppercase tracking-wider bg-white px-3 py-2 rounded-xl shadow-sm`}>
                                    {statusConfig.label}
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="w-4 h-4 text-orange-500" />
                                        <span className="font-semibold">{formatearHoraDate(pedido.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            {pedido.estado === 'Abierto' && (
                                <div className="flex gap-3 mt-4">
                                    <button disabled={loadingEstado}
                                        onClick={() => cambiarEstado(pedido.pedido_id, 'En Preparacion', 'Aceptar')}
                                        className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-sm font-semibold py-2 px-3 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        {(loadingEstado && accion === 'Aceptar') ? <Spinner /> : 'Aceptar Pedido'}
                                    </button>
                                    <button disabled={loadingEstado}
                                        onClick={() => cambiarEstado(pedido.pedido_id, 'Rechazado', 'Rechazar')}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-sm font-semibold py-2 px-3 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        {(loadingEstado && accion === 'Rechazar') ? <Spinner /> : 'Rechazar Pedido'}
                                    </button>
                                </div>
                            )}
                        </div>

                        <CardsPlatos pedido={pedido} loadingPlato={loadingPlato} cambiarEstadoPlato={cambiarEstadoPlato}
                            accion={accion} />

                    </div>
                );
            })}
        </div>
    )
}
