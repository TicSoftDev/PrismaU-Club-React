import { Check, X } from "lucide-react"
import { RouteBack } from "../../../../../models/RutasModel"

export default function PedidosCards({ pedidos, loading }) {

    if (loading) {
        return (
            <div className="text-center py-10">
                <span className="text-slate-600">Cargando pedidos...</span>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pedidos?.map((producto) => (
                <div key={producto.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-emerald-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-4 sm:p-5">
                        <div className="flex gap-4 mb-4">
                            <div className="relative flex-shrink-0 h-20">
                                <img src={`${RouteBack}${producto.producto.imagen}`} alt={producto.id} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                                    {producto.cantidad}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 text-base mb-1 truncate">
                                    {producto.producto.comida || producto.producto.bebida}
                                </h3>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Observaciones:</p>
                                    <p className="text-sm text-slate-700">{producto.observaciones || 'Sin Observaciones'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                className="flex-1 flex items-center justify-center gap-2 h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium transition-all hover:bg-red-50 hover:border-red-300 hover:text-red-700 active:scale-95"
                            >
                                <X className="w-4 h-4" />
                                <span className="hidden sm:inline text-sm">Rechazar</span>
                            </button>
                            <button
                                className="flex-1 flex items-center justify-center gap-2 h-8 px-3 rounded-lg bg-emerald-500 text-white font-medium transition-all hover:bg-emerald-600 active:scale-95 shadow-sm hover:shadow-md"
                            >
                                <Check className="w-4 h-4" />
                                <span className="hidden sm:inline text-sm">Aceptar</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
