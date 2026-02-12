import { AlertCircle, ChefHat, Package, XCircle } from "lucide-react";

export const getOrderStatusConfig = (status) => {
    switch (status) {
        case 'Abierto':
            return {
                label: 'Pedido Abierto',
                gradient: 'from-amber-50 via-orange-50 to-amber-50',
                borderColor: 'border-amber-200',
                shadow: 'shadow-amber-100',
                icon: Package,
                iconBg: 'from-amber-400 to-orange-500',
                textColor: 'text-amber-900'
            };
        case 'En Preparacion':
            return {
                label: 'En Preparación',
                gradient: 'from-blue-50 via-indigo-50 to-blue-50',
                borderColor: 'border-blue-200',
                shadow: 'shadow-blue-100',
                icon: ChefHat,
                iconBg: 'from-blue-500 to-indigo-600',
                textColor: 'text-blue-900'
            };
        case 'Rechazado':
            return {
                label: 'Rechazado',
                gradient: 'from-red-50 via-rose-50 to-red-50',
                borderColor: 'border-red-200',
                shadow: 'shadow-red-100',
                icon: XCircle,
                iconBg: 'from-red-500 to-rose-600',
                textColor: 'text-red-900'
            };
        default:
            return {
                label: 'Desconocido',
                gradient: 'from-gray-50 via-slate-50 to-gray-50',
                borderColor: 'border-gray-200',
                shadow: 'shadow-gray-100',
                icon: AlertCircle,
                iconBg: 'from-gray-400 to-slate-500',
                textColor: 'text-gray-900'
            };
    }
};

export const getDishStatusStyle = (status) => {
    switch (status) {
        case 'Pendiente':
            return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
        case 'En Preparacion':
            return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
        case 'Preparado':
            return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white';
        case 'Rechazado':
            return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};