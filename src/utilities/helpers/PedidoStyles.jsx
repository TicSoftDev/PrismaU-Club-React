export const getStylePedidoBadge = (status) => {
    switch (status) {
        case 'Abierto':
        case 'Pendiente':
            return 'bg-yellow-50 text-yellow-400 ring-yellow-300';
        case 'En Preparacion':
            return 'bg-indigo-50 text-indigo-500 ring-indigo-300';
        case 'Preparado':
            return 'bg-emerald-50 text-emerald-500 ring-emerald-300';
        case 'Rechazado':
        case 'Cancelado':
            return 'bg-red-50 text-red-500 ring-red-300';
        default:
            return 'bg-gray-500 text-white ring-gray-300';
    }
};

export const LOCATION_COLORS = [
    { gradient: "from-green-600 via-emerald-500 to-emerald-600", ring: "ring-teal-400/30", shadow: "shadow-teal-500/20", glow: "bg-teal-500/10", accent: "from-green-500 to-emerald-600" },
    { gradient: "from-purple-500 via-purple-600 to-blue-600", ring: "ring-purple-400/30", shadow: "shadow-purple-500/20", glow: "bg-purple-500/10", accent: "from-violet-400 to-blue-600" },
    { gradient: "from-pink-400 via-pink-500 to-rose-400", ring: "ring-pink-400/30", shadow: "shadow-pink-500/20", glow: "bg-pink-500/10", accent: "from-pink-400 to-rose-400" },
    { gradient: "from-red-500 via-rose-500 to-rose-600", ring: "ring-rose-400/30", shadow: "shadow-rose-500/20", glow: "bg-rose-500/10", accent: "from-red-500 to-rose-600" },
    { gradient: "from-yellow-400 via-yellow-500 to-yellow-600", ring: "ring-yellow-400/30", shadow: "shadow-yellow-500/20", glow: "bg-yellow-500/10", accent: "from-yellow-400 to-yellow-600" }
];