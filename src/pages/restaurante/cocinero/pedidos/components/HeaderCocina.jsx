import { ChefHat, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeaderCocina({ pedidos }) {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const stats = {
        abierto: pedidos?.filter(o => o.estado === "Abierto").length,
        preparacion: pedidos?.filter(o => o.estado === "En Preparacion").length,
    };

    return (
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <div className="max-w-[1800px] mx-auto px-6 py-3">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl blur-md opacity-40"></div>
                            <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-2.5 rounded-xl shadow">
                                <ChefHat className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>
                        </div>

                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                                Gestión de Pedidos
                            </h1>

                            <p className="text-gray-500 mt-0.5 flex items-center gap-1 text-sm">
                                <Clock className="w-3 h-3" />
                                {currentTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2.5">
                        <div className="flex flex-row items-center gap-2 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-4 py-2 shadow-sm">
                            <div className="text-amber-700 text-[10px] font-semibold uppercase tracking-wide">
                                Abiertos
                            </div>
                            <div className="text-xl font-bold text-amber-900">{stats.abierto}</div>
                        </div>

                        <div className="flex flex-row items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl px-4 py-2 shadow-sm">
                            <div className="text-blue-700 text-[10px] font-semibold uppercase tracking-wide">
                                Preparando
                            </div>
                            <div className="text-xl font-bold text-blue-900">{stats.preparacion}</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
