import { PrivateRoutes } from "./RutasModel";

const ADMIN_ITEMS = [
    { isTitle: true, texto: "Gestión de Solicitudes" },
    { icono: "envelope-open-text", texto: "Solicitudes", color: "purple", opacidad: '600', link: PrivateRoutes.SOLICITUDES },
    { icono: "calendar-check", texto: "Reservas", color: "red", opacidad: '600', link: PrivateRoutes.RESERVAS },
    { icono: "clipboard-list", texto: "Encuestas", color: "yellow", opacidad: '400', link: PrivateRoutes.ENCUESTAS, activeSubroutes: [PrivateRoutes.PREGUNTAS, PrivateRoutes.RESPUESTAS, PrivateRoutes.ENCUESTA] },
    { isTitle: true, texto: "Gestión de Usuarios" },
    { icono: "search", texto: "Buscar Usuario", color: "green", opacidad: '600', link: PrivateRoutes.BUSCAR_USER },
    { icono: "user-tie", texto: "Asociados", color: "purple", opacidad: '600', link: PrivateRoutes.ASOCIADOS, activeSubroutes: [PrivateRoutes.FAMILIARESASOCIADO] },
    { icono: "user-tie", texto: "Adherentes", color: "red", opacidad: '600', link: PrivateRoutes.ADHERENTES, activeSubroutes: [PrivateRoutes.FAMILIARESADHERENTE] },
    { icono: "users", texto: "Empleados", color: "yellow", opacidad: '400', link: PrivateRoutes.EMPLEADOS },
    { isTitle: true, texto: "Espacios y Comunicaciones" },
    { icono: "map-marked-alt", texto: "Espacios", color: "green", opacidad: '600', link: PrivateRoutes.ESPACIOS, activeSubroutes: [PrivateRoutes.DISPONIBILIDAD_ESPACIO] },
    { icono: "bullhorn", texto: "Eventos", color: "purple", opacidad: '600', link: PrivateRoutes.NOTICIAS },
    { isTitle: true, texto: "Seguridad y Finanzas" },
    { icono: "user-clock", texto: "Invitaciones", color: "red", opacidad: '600', link: PrivateRoutes.INVITACIONES },
    { icono: "id-badge", texto: "Control de Accesos", color: "yellow", opacidad: '400', link: PrivateRoutes.ACCESOS },
    { icono: "history", texto: "Historial de Estados", color: "green", opacidad: '600', link: PrivateRoutes.ESTADOS },
    { icono: "credit-card", texto: "Gestión de Pagos", color: "purple", opacidad: '600', link: PrivateRoutes.PAGOS, activeSubroutes: [PrivateRoutes.PAGAR, PrivateRoutes.RUBROS, PrivateRoutes.SOCIOS, PrivateRoutes.PROGRAMACION_PAGOS, PrivateRoutes.PAGOS_SOCIOS, PrivateRoutes.HISTORIAL_PAGOS, PrivateRoutes.PAGOS_CUOTAS_BAILE] },
];

const SUPER_ADMIN_ITEMS = [
    { isTitle: true, texto: "Configuraciónes" },
    { icono: "file-contract", texto: "Contrataciones", color: "purple", opacidad: '600', link: PrivateRoutes.CONTRATOS },
    { icono: "user-shield", texto: "Administradores", color: "red", opacidad: '600', link: PrivateRoutes.ADMINISTRADORES },
    { icono: "user-cog", texto: "Roles y Permisos", color: "yellow", opacidad: '400', link: PrivateRoutes.ROLES },
    { icono: "magic", texto: "Hobbies", color: "green", opacidad: '600', link: PrivateRoutes.HOBBIES },
];

const SOCIO_ITEMS = [
    { isTitle: true, texto: "Gestión de Miembros y Pagos" },
    { icono: "user-clock", texto: "Invitados", color: "purple", opacidad: '600', link: PrivateRoutes.INVITADOS },
    { icono: "users", texto: "Familiares", color: "red", opacidad: '600', link: PrivateRoutes.FAMILIARES },
    { icono: "credit-card", texto: "Mensualidades", color: "yellow", opacidad: '400', link: PrivateRoutes.PAGOS_SOCIOS },
    { icono: "credit-card", texto: "Cuotas de baile", color: "green", opacidad: '600', link: PrivateRoutes.PAGOS_CUOTAS_BAILE },
];

const GERENTE_RESTAURANTE_ITEMS = [
    { isTitle: true, texto: "Gestión de espacios" },
    { icono: "fire", texto: "Cocinas", color: "purple", opacidad: '600', link: PrivateRoutes.COCINAS },
    { icono: "map-marked-alt", texto: "Ubicaciones", color: "red", opacidad: '600', link: PrivateRoutes.UBICACIONES, activeSubroutes: [PrivateRoutes.MESA] },
    { isTitle: true, texto: "Productos" },
    { icono: "utensils", texto: "Comidas", color: "yellow", opacidad: '400', link: PrivateRoutes.COMIDAS },
    { icono: "glass-cheers", texto: "Bebidas", color: "green", opacidad: '600', link: PrivateRoutes.BEBIDAS },
    { isTitle: true, texto: "Inventario" },
    { icono: "clipboard-list", texto: "Preinventarios", color: "purple", opacidad: '600', link: PrivateRoutes.PREINVENTARIO, activeSubroutes: [PrivateRoutes.DETALLES_PREINVENTARIO] },
    { icono: "clipboard-check", texto: "Inventarios", color: "red", opacidad: '600', link: PrivateRoutes.INVENTARIO, activeSubroutes: [PrivateRoutes.DETALLES_INVENTARIO] },
];

const MESERO_RESTAURANTE_ITEMS = [
    { isTitle: true, texto: "Gestión de pedidos " },
    { icono: "plus", texto: "Crear Pedido", color: "purple", opacidad: '600', link: PrivateRoutes.CREAR_PEDIDO },
    { icono: "receipt", texto: "Pedidos Abiertos", color: "red", opacidad: '600', link: PrivateRoutes.PEDIDOS_ABIERTOS, activeSubroutes: [PrivateRoutes.DETALLE_PEDIDO] },
    { icono: "clipboard-check", texto: "Pedidos Cerrados", color: "yellow", opacidad: '400', link: PrivateRoutes.PEDIDOS_CERRADOS },
];

const COCINERO_RESTAURANTE_ITEMS = [
    { isTitle: true, texto: "Gestión de pedidos " },
    { icono: "receipt", texto: "Pedidos", color: "purple", opacidad: '600', link: PrivateRoutes.PEDIDOS },
];

export function getMenuItemsByRole(role) {
    const numericRole = Number(role);
    switch (numericRole) {
        case 0:
            return [...SUPER_ADMIN_ITEMS, ...ADMIN_ITEMS];
        case 1:
            return ADMIN_ITEMS;
        case 2:
            return SOCIO_ITEMS;
        case 3:
            return SOCIO_ITEMS;
        case 8:
            return GERENTE_RESTAURANTE_ITEMS;
        case 9:
            return COCINERO_RESTAURANTE_ITEMS;
        case 10:
            return MESERO_RESTAURANTE_ITEMS;
        default:
            return [];
    }
}
