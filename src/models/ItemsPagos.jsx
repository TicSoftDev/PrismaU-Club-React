import { FaCalendar, FaCreditCard, FaDollarSign, FaFile, FaUsers } from "react-icons/fa";
import { PrivateRoutes } from "./RutasModel";

export const menuItems = [
    {
        title: "Pagar",
        description: "Realiza tus pagos de forma segura",
        icon: FaCreditCard,
        path: PrivateRoutes.PAGAR,
    },
    {
        title: "Rubros",
        description: "Gestiona las categorías de gastos",
        icon: FaFile,
        path: PrivateRoutes.RUBROS,
    },
    {
        title: "Programación de pagos",
        description: "Programa tus pagos futuros",
        icon: FaCalendar,
        path: PrivateRoutes.PROGRAMACION_PAGOS,
    },
    {
        title: "Pagos Mensualidades",
        description: "Historial de transacciones",
        icon: FaDollarSign,
        path: PrivateRoutes.HISTORIAL_PAGOS,
    },
    {
        title: "Pagos Cuotas de baile",
        description: "Historial de pagos",
        icon: FaDollarSign,
        path: PrivateRoutes.HISTORIAL_PAGOS_CUOTAS,
    },
    {
        title: "Usuarios",
        description: "Administra los usuarios",
        icon: FaUsers,
        path: PrivateRoutes.SOCIOS,
    },
];