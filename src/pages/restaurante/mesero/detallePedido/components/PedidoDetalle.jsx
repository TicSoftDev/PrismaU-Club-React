import { Check, Edit, Plus, Trash2 } from 'lucide-react';
import { formatearMoneda } from '../../../../../models/FormateadorModel';
import { RouteBack } from '../../../../../models/RutasModel';
import { getStylePedidoBadge } from '../../../../../utilities/helpers/PedidoStyles';

export default function PedidoDetalle({ pedido, detalle, itemsCount, loadingPlato, cargarDetalle, handleDelete,
    cambiarEstadoPlato, agregar }) {
    return (
        <div className="xl:col-span-8">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 overflow-hidden">
                <div className="flex justify-between items-center pe-4">
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                            Platos ordenados
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Detalle de los platos ordenados en este pedido
                        </p>
                    </div>
                    <button className='bg-blue-500 text-sm text-white flex items-center py-2 px-4 justify-center rounded-full'
                        onClick={() => agregar(pedido?.id)}>
                        <Plus size={18} /> Agregar
                    </button>
                </div>

                {detalle.length === 0 ? (
                    <div className="p-10 text-center text-slate-600 dark:text-slate-300">
                        No hay platos registrados en este pedido.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-slate-50 dark:bg-slate-900/40">
                                <tr className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    <th className="px-6 py-3"></th>
                                    <th className="px-6 py-3">Ítem</th>
                                    <th className="px-4 py-3">Estado</th>
                                    <th className="px-4 py-3 text-right">Cant</th>
                                    <th className="px-4 py-3 text-right">Unit</th>
                                    <th className="px-6 py-3 text-right">Subtotal</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {detalle.map((dish, idx) => {
                                    const nombre = dish?.producto.nombre;
                                    const img = RouteBack + dish?.producto.imagen;
                                    const presentacion_id = dish?.producto.insumo_presentacion_id;
                                    const cantidad = Number(dish?.cantidad) || 0;
                                    const precio = Number(dish?.precio_unitario) || 0;
                                    const subtotal = Number(dish?.subtotal) || 0;

                                    return (
                                        <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
                                            <td className="ps-4 py-4">
                                                <div className="flex">
                                                    {dish?.estado === 'Pendiente' && <>
                                                        <button className='flex items-center justify-center text-white bg-blue-600 rounded-full h-7 w-7 border hover:border-blue-600 hover:bg-white hover:text-blue-600'
                                                            onClick={() => cargarDetalle(dish, presentacion_id)}>
                                                            <Edit className='h-4 w-4' />
                                                        </button>
                                                        <button className='flex items-center justify-center text-white bg-red-600 rounded-full h-7 w-7 border hover:border-red-600 hover:bg-white hover:text-red-600'
                                                            onClick={() => handleDelete(dish.id, presentacion_id)}>
                                                            <Trash2 className='h-4 w-4' />
                                                        </button>
                                                    </>}
                                                    {dish?.estado !== 'Servido' && (
                                                        (dish?.producto?.tipo === 'COMIDA' && dish?.estado === 'Preparado') ||
                                                        dish?.producto?.tipo === 'BEBIDA'
                                                    ) &&
                                                        <button className='flex items-center justify-center text-white bg-green-600 rounded-full h-7 w-7 border hover:border-green-600 hover:bg-white hover:text-green-600'
                                                            onClick={() => cambiarEstadoPlato(dish?.id, 'Servido')}>
                                                            {loadingPlato ? '...' : <Check className='h-4 w-4' />}
                                                        </button>
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3 min-w-[280px]">
                                                    <div className="h-11 w-11 rounded-lg bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 overflow-hidden flex items-center justify-center">
                                                        {img ? (
                                                            <img src={img} className="h-full w-full object-contain" alt={String(dish?.itemable?.id ?? idx)} />
                                                        ) : (
                                                            <span className="text-[10px] text-slate-500 whitespace-nowrap">N/A</span>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                                                            {nombre}
                                                        </p>
                                                        <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
                                                            {dish?.producto?.tipo === "comida" ? "Comida" : "Bebida"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className={`${getStylePedidoBadge(dish?.estado)} inline-flex items-center ring-1 ring-inset px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}>
                                                    {mapDishState(dish?.estado)}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-right font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                                                {cantidad}
                                            </td>

                                            <td className="px-4 py-4 text-right font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                                                {formatearMoneda(precio)}
                                            </td>

                                            <td className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                                                {formatearMoneda(subtotal)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {itemsCount} ítem(s)
                        </p>
                        <p className="text-xl font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                            Total: <span className="text-blue-600 dark:text-blue-400">{formatearMoneda(pedido?.total)}</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

function mapDishState(estado) {
    if (estado === 'Abierto') return 'Pendiente';
    if (estado === 'En Preparacion') return 'Preparando';
    if (estado === 'Preparado') return 'Preparado';
    if (estado === 'Servido') return 'Servido';
    if (estado === 'Rechazado') return 'No disponible';
    return estado || 'N/A';
}