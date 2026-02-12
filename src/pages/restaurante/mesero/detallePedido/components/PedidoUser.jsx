import { RouteBack } from '../../../../../models/RutasModel';

export default function PedidoUser({ usuario }) {

    const imagen = usuario?.imagen ? `${RouteBack + usuario.imagen}` : usuario?.Sexo === "Femenino" ? "https://cdn-icons-png.flaticon.com/128/4140/4140047.png" : "https://cdn-icons-png.flaticon.com/128/3135/3135715.png";

    return (
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
    )
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