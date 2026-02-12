import { formatearFechaHora, formatearMoneda } from '../../../../../models/FormateadorModel';
import { RouteBack } from '../../../../../models/RutasModel';
import { getStylePedidoBadge } from '../../../../../utilities/helpers/PedidoStyles';

export default function FormPedido({ pedido }) {

    const ubicacionLabel = `${pedido?.mesa?.ubicacion?.ubicacion ?? "N/A"}${pedido?.mesa?.numero ? ` · Mesa ${pedido.mesa.numero}` : ""}`;
    const estadoPedido = pedido?.estado || "Abierto";
    const itemsCount = pedido?.detalle_pedido.reduce((acc, d) => acc + (Number(d?.cantidad) || 0), 0);
    const subtotalCalc = pedido?.detalle_pedido.reduce((acc, d) => acc + (Number(d?.precio) || 0) * (Number(d?.cantidad) || 0), 0);
    const imagen = pedido.usuario.imagen ? `${RouteBack + pedido.usuario.imagen}` : pedido.usuario.Sexo == "Femenino" ? "https://cdn-icons-png.flaticon.com/128/4140/4140047.png" : "https://cdn-icons-png.flaticon.com/128/3135/3135715.png";
    const usuario = pedido?.usuario ?? {};

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="px-6 py-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                            <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                                Pedido
                            </p>
                            <div className="mt-1 flex items-center gap-2 flex-nowrap overflow-x-auto">
                                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                                    {ubicacionLabel}
                                </h2>
                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset whitespace-nowrap ${getStylePedidoBadge(estadoPedido)}`}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                                    {estadoPedido}
                                </span>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
                                <InlineMeta label="Fecha" value={formatearFechaHora(pedido?.created_at)} />
                                <InlineMeta label="Platos" value={pedido?.detalle_pedido?.length} />
                                <InlineMeta label="Ítems" value={itemsCount} />
                            </div>
                        </div>

                        <div className="text-left lg:text-right">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total</p>
                            <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
                                {formatearMoneda(pedido?.total ?? 0)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Subtotal calculado: {formatearMoneda(subtotalCalc)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-4">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <img src={imagen} alt="Perfil" className="h-14 w-14 rounded-xl object-cover" />
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                                        Cliente
                                    </p>
                                    <p className="mt-0.5 text-lg font-semibold text-slate-900 dark:text-white truncate">
                                        {usuario?.Nombre} {usuario?.Apellidos}
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        {usuario?.Codigo ? `Código: ${usuario.Codigo}` : "Código: N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 space-y-3">
                                <InfoRow label="Identificación" value={usuario?.Documento || "N/A"} />
                                <InfoRow label="Teléfono" value={usuario?.Telefono || "N/A"} />
                                <InfoRow label="Email" value={usuario?.Correo || "N/A"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-8">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                                Platos ordenados
                            </h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Detalle de los platos ordenados en este pedido
                            </p>
                        </div>

                        {pedido?.detalle_pedido.length === 0 ? (
                            <div className="p-10 text-center text-slate-600 dark:text-slate-300">
                                No hay platos registrados en este pedido.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-slate-50 dark:bg-slate-900/40">
                                        <tr className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            <th className="px-6 py-3">Ítem</th>
                                            <th className="px-4 py-3">Estado</th>
                                            <th className="px-4 py-3 text-right">Cant</th>
                                            <th className="px-4 py-3 text-right">Unit</th>
                                            <th className="px-6 py-3 text-right">Subtotal</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                        {pedido?.detalle_pedido.map((dish, idx) => {
                                            const nombre = dish?.itemable?.comida || dish?.itemable?.bebida || "Ítem";
                                            const img = dish?.itemable?.imagen ? (RouteBack + dish.itemable.imagen) : null;

                                            const cantidad = Number(dish?.cantidad) || 0;
                                            const precio = Number(dish?.precio_unitario) || 0;
                                            const subtotal = cantidad * precio;

                                            return (
                                                <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
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
                                                                    {dish?.itemable_type === "comida" ? "Comida" : "Bebida"}
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
            </div>
        </div>
    )
}

function InlineMeta({ label, value }) {
    return (
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="text-slate-500 dark:text-slate-400">{label}:</span>
            <span className="font-medium text-slate-900 dark:text-white">{value}</span>
        </span>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/30">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white break-words">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

function mapDishState(estado) {
    if (estado === 'Abierto') return 'Pendiente';
    if (estado === 'En Preparacion') return 'Preparando';
    if (estado === 'Preparado') return 'Preparado';
    if (estado === 'Servido') return 'Servido';
    if (estado === 'Rechazado') return 'No disponible';
    return estado || 'N/A';
}