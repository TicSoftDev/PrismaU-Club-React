import { formatearMoneda } from '../../../../../models/FormateadorModel'
import Spinner from '../../../../../utilities/spinner/Spinner'

export default function ResumenPedido({ pedido, loading, hayPedido, incrementar, disminuir, eliminar, editarObservacion,
    handleSubmit, noShowTotal }) {

    return (
        <>
            <h4 className="text-xl font-extrabold text-gray-800 mb-4 border-b pb-2">Resumen de Orden</h4>
            <div>
                <label className="block text-sm font-semibold mb-4 text-slate-700 dark:text-slate-300">
                    Platos Seleccionados ({pedido?.pedido_detalle?.length})
                </label>
                <div className="space-y-2">
                    {pedido?.pedido_detalle?.map((item, index) => (
                        <div key={index}
                            className="flex items-center justify-between p-4 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="flex-1">
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {item?.producto?.nombre ?? 'Producto sin nombre'}
                                </p>

                                <p className="text-xs text-slate-600">
                                    {formatearMoneda(item.precio_unitario)} x {item.cantidad}
                                </p>
                                <p className="text-xs text-slate-800 font-semibold">
                                    {formatearMoneda(item.subtotal)}</p>
                                <button type="button" onClick={() => editarObservacion(item)} className="text-blue-500 text-sm underline"
                                    disabled={hayPedido}>
                                    Observaciones
                                </button>
                            </div>
                            <div className="flex items-center gap-1">
                                <button disabled={hayPedido}
                                    type="button"
                                    onClick={() => disminuir(item.key)}
                                    className={`px-2 py-1 bg-slate-300 dark:bg-slate-600 hover:bg-red-500 hover:text-white rounded transition text-xs font-bold
                                    ${hayPedido ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    -
                                </button>
                                <span className="px-3 text-slate-900 dark:text-white font-semibold text-sm">{item.cantidad}</span>
                                <button disabled={hayPedido}
                                    type="button"
                                    onClick={() => incrementar(item.key)}
                                    className={`px-2 py-1 bg-slate-300 dark:bg-slate-600 hover:bg-green-500 hover:text-white rounded transition text-xs font-bold
                                    ${hayPedido ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    +
                                </button>
                                <button disabled={hayPedido}
                                    type="button"
                                    onClick={() => eliminar(item.key)}
                                    className={`px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs font-bold ml-2
                                    ${hayPedido ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div >
                {!noShowTotal &&
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-700 rounded-lg border border-blue-200 dark:border-slate-600">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-slate-900 dark:text-white">Total Pedido:</span>
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatearMoneda(pedido.total)}</span>
                        </div>
                    </div>
                }
                <div>
                    <button type="button" onClick={handleSubmit} disabled={loading || hayPedido}
                        className={`w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300
                        ${hayPedido ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {loading ? <Spinner /> : 'Guardar Pedido'}
                    </button>
                </div >
            </div >
        </>
    )
}
