import { formatearFechaHora, formatearMoneda } from "../../../../../models/FormateadorModel";
import { getStylePedidoBadge } from "../../../../../utilities/helpers/PedidoStyles";

export default function PedidoInfo({ pedido, itemsCount, subtotalCalc, countsByState }) {

    const ubicacionLabel = `${pedido?.mesa?.ubicacion?.ubicacion ?? "N/A"}${pedido?.mesa?.numero ? ` · Mesa ${pedido.mesa.numero}` : ""}`;
    const estadoPedido = pedido?.estado || "Abierto";
    const pendientes = countsByState["Pendiente"] || 0;
    const preparando = countsByState["En Preparacion"] || 0;
    const preparados = countsByState["Preparado"] || 0;
    const servidos = countsByState["Servido"] || 0;
    const rechazados = countsByState["Rechazado"] || 0;

    return (
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
                            <InlineMeta label="Platos" value={pedido?.pedido_detalle?.length} />
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

            <div className="border-t border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
                    <MetricCard title="Pendientes" value={pendientes} />
                    <MetricCard title="En Preparación" value={preparando} />
                    <MetricCard title="Preparados" value={preparados} />
                    <MetricCard title="Servidos" value={servidos} />
                    <MetricCard title="No disponibles" value={rechazados} />
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

function MetricCard({ title, value }) {
    return (
        <div className="px-6 py-4 border-r border-slate-200 last:border-r-0 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">{title}</p>
            <p className="mt-1 text-2xl font-semibold whitespace-nowrap text-slate-900 dark:text-white">
                {value}
            </p>
        </div>
    );
}
