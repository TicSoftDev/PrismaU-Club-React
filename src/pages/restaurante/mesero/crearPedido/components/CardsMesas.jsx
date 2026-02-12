import { CheckCircle2, Clock, Users } from "lucide-react";
import NoData from "../../../../../utilities/helpers/NoData";
import CardcitaSkeleton from "../../../../../utilities/skeletons/CardcitaSkeleton";

export default function CardsMesas({ ubicacion, mesas = [], loading, iniciarPedido }) {

    if (loading) return <CardcitaSkeleton />;

    if ((mesas.length === 0) && !ubicacion)
        return <NoData mensaje="No hay mesas disponibles" />;

    const disponibles = mesas?.filter(m => m.disponible).length || 0;
    const ocupadas = mesas?.length - disponibles || 0;

    return (
        <>
            {(mesas && mesas.length > 0) && (
                <div className="space-y-6 mt-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="min-w-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
                                Escoja una Mesa
                            </h2>
                            <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                                Haz clic en una mesa disponible para comenzar
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3 md:justify-end">
                            <div className="flex-1 sm:flex-none min-w-[140px] px-3 sm:px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                                        {disponibles} libres
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 sm:flex-none min-w-[140px] px-3 sm:px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                    <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                                        {ocupadas} en uso
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {mesas.map((table) => {
                            const isAvailable = table.disponible;

                            return (
                                <button key={table.id} onClick={() => iniciarPedido(table.id)}
                                    className={[
                                        "relative group cursor-pointer select-none",
                                        "flex flex-col items-center justify-center gap-3",
                                        "rounded-3xl p-3",
                                        "transition-transform duration-300 ease-out hover:-translate-y-1",
                                        "border-2",
                                        isAvailable
                                            ? "bg-green-100 border-green-300 hover:bg-green-200"
                                            : "bg-amber-100 border-amber-300 hover:bg-amber-200",
                                    ].join(" ")}
                                >
                                    <div
                                        className={[
                                            "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                            isAvailable
                                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40"
                                                : "bg-amber-500 text-white shadow-lg shadow-amber-500/40 animate-pulse",
                                        ].join(" ")}
                                    >
                                        {isAvailable ? "Libre" : "En uso"}
                                    </div>

                                    <div
                                        className={[
                                            "w-16 h-16 rounded-full flex items-center justify-center",
                                            "transition-transform duration-300 group-hover:scale-105",
                                            isAvailable ? "bg-emerald-500" : "bg-amber-500",
                                        ].join(" ")}
                                    >
                                        <span className="text-4xl font-black tabular-nums text-white">
                                            {table.numero}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        {isAvailable ? (
                                            <>
                                                <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-medium uppercase tracking-wide text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                                    Disponible
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Clock className="w-5 h-5 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-300 group-hover:text-amber-600 dark:group-hover:text-amber-200">
                                                    Ver pedido
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* overlay "shine" pero sin capturar el mouse */}
                                    <div
                                        className={[
                                            "pointer-events-none", // ✅ evita el parpadeo
                                            "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                            isAvailable ? "bg-white/10" : "bg-black/5",
                                        ].join(" ")}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
