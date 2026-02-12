import { Check, MapPin, Navigation } from "lucide-react";
import NoData from "../../../../../utilities/helpers/NoData";
import { LOCATION_COLORS } from "../../../../../utilities/helpers/PedidoStyles";

export default function CardsUbicaciones({ ubicaciones = [], ubicacion, selectLocation }) {

    if (!ubicaciones.length) return <NoData mensaje="No hay ubicaciones disponibles" />;

    return (
        <div className="w-full">
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800">Selecciona una ubicación</h3>
                <p className="text-sm text-gray-500">Este es el punto de entrega del pedido</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ubicaciones.map((location, index) => {

                    const isSelected = ubicacion.id === location.id;
                    const color = LOCATION_COLORS[index % LOCATION_COLORS.length];

                    return (
                        <button key={location.id} onClick={() => selectLocation(location)} className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${isSelected ? `ring-2 ${color.ring} ${color.shadow} shadow-lg scale-[1.02]` : "hover:scale-[1.01] hover:shadow-md"}`}>
                            <div className={`relative p-6 transition-all duration-300 ${isSelected ? "bg-white" : "bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-gray-900 group-hover:to-gray-700"}`}>
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${color.gradient} opacity-[0.15] ${isSelected ? "opacity-30" : ""}`} />
                                <div className="relative flex items-start gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isSelected ? `bg-gradient-to-br ${color.gradient} text-white shadow-md ${color.shadow}` : `${color.glow} text-gray-600`} group-hover:text-white group-hover:scale-110`}>
                                        <Navigation className="w-5 h-5 group-hover:text-white" />
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <p className={`font-semibold text-base leading-snug truncate transition-colors ${isSelected ? "text-gray-900" : "text-gray-700"} group-hover:text-white`}>{location.ubicacion}</p>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <MapPin className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${isSelected ? `bg-gradient-to-br ${color.accent} bg-clip-text text-gray-500` : "text-gray-600"} group-hover:text-white`} />
                                            <span className={`text-xs transition-colors ${isSelected ? "text-gray-500" : "text-gray-600"} group-hover:text-white`}>Punto de servicio</span>
                                        </div>
                                    </div>
                                    {isSelected && (<div className="flex-shrink-0"><div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br ${color.accent} animate-in zoom-in duration-200`}><Check className="w-4 h-4 text-white" strokeWidth={3} /></div></div>)}
                                </div>
                                {isSelected && (<div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color.accent} animate-in slide-in-from-left duration-300`} />)}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
