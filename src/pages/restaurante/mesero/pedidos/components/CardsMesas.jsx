import NoData from "../../../../../utilities/helpers/NoData";
import CardcitaSkeleton from "../../../../../utilities/skeletons/CardcitaSkeleton";

export default function CardsMesas({ ubicacion, loading, mesas, iniciarPedido, pedido }) {

    if (loading) return <CardcitaSkeleton />;

    if ((!mesas || mesas.length === 0) && !ubicacion) return <NoData mensaje="No hay mesas disponibles" />;
    
    return (
        <>
            {(mesas && mesas.length > 0) && (
                <div className="space-y-6 mt-5">
                    <div className="rounded-xl p-6 border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-700 mb-4">Mesas</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {mesas?.map((table, index) => (
                                <button key={index} onClick={() => iniciarPedido(table.id)} disabled={!table.disponible}
                                    className={`w-full p-4 rounded-xl ${!table.disponible && 'opacity-50 cursor-not-allowed'} ${pedido.mesa_id === table.id && 'bg-emerald-200'} border-2 transition-all relative border-emerald-500 ring-2 ${!table.disponible ? 'ring-red-500' : 'ring-green-500'} hover:scale-105`}>
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-slate-700 mb-2">
                                            {table.numero}
                                        </p>

                                        <div className="space-y-2">
                                            <div className="flex justify-center items-center gap-2">
                                                <div className={`w-2.5 h-2.5 rounded-full ${!table.disponible ? 'bg-red-500' : 'bg-green-500'}`} />
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                                    {table.estado}
                                                </p>
                                            </div>

                                            {/* {table.partner && (
                                            <p className="text-xs text-emerald-300 font-semibold truncate">
                                                {table.partner}
                                            </p>
                                        )}

                                        {table.orders.length > 0 && (
                                            <p className="text-xs text-amber-300 font-semibold">
                                                {table.orders.reduce((sum, item) => sum + item.quantity, 0)} items
                                            </p>
                                        )} */}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
