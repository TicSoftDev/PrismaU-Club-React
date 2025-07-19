import apiQueryCantidad from "../api/apiQueryCantidad";

const SUPER_ADMIN_CARDS = (contContrataciones, contAdmins) => [
    { color: "purple", cantidad: contContrataciones, titulo: "Contrataciones", icono: "check-square", opacidad: "500" },
    { color: "red", cantidad: contAdmins, titulo: "Admistradores", icono: "user-shield", opacidad: "600" },
    { color: "yellow", cantidad: '5', titulo: "Roles", icono: "user-cog", opacidad: "400" },
    { color: "green", cantidad: '12', titulo: "Hobbies", icono: "magic", opacidad: "500" },
];

const ADMIN_CARDS = (
    contSolicitudes, contReservas, contEncuestas, contFamiliares, contAsociados, contAdherentes, contEmpleados,
    contEspacios, contNoticias, contInvitados
) => [
        { color: "purple", cantidad: contSolicitudes, titulo: "Solicitudes", icono: "envelope-open-text", opacidad: "500" },
        { color: "red", cantidad: contReservas, titulo: "Reservas", icono: "calendar-check", opacidad: "600" },
        { color: "yellow", cantidad: contEncuestas, titulo: "Encuestas", icono: "clipboard-list", opacidad: "400" },
        { color: "green", cantidad: contFamiliares, titulo: "Familiares", icono: "user-friends", opacidad: "500" },
        { color: "purple", cantidad: contAsociados, titulo: "Asociados", icono: "user-tie", opacidad: "500" },
        { color: "red", cantidad: contAdherentes, titulo: "Adherentes", icono: "user-tie", opacidad: "600" },
        { color: "yellow", cantidad: contEmpleados, titulo: "Empleados", icono: "users", opacidad: "400" },
        { color: "green", cantidad: contEspacios, titulo: "Espacios", icono: "map-marked-alt", opacidad: "500" },
        { color: "purple", cantidad: contNoticias, titulo: "Noticias", icono: "newspaper", opacidad: "500" },
        { color: "red", cantidad: contInvitados, titulo: "Invitados", icono: "user-clock", opacidad: "600" },
    ];

const SOCIOS_CARDS = (contFamiliaresSocio, contInvitadosSocio, contEspacios) => [
    { color: "purple", cantidad: contFamiliaresSocio, titulo: "Familiares", icono: "user-friends", opacidad: "500" },
    { color: "red", cantidad: contInvitadosSocio, titulo: "Invitados", icono: "user-clock", opacidad: "600" },
    { color: "yellow", cantidad: contEspacios, titulo: "Espacios", icono: "map-marked-alt", opacidad: "400" },
    { color: "green", cantidad: '12', titulo: "Hobbies", icono: "magic", opacidad: "500" },
];

export function getCardsByRole(role) {

    const { contSolicitudes = 0, contReservas = 0, contEncuestas = 0, contFamiliares = 0, contAsociados = 0,
        contAdherentes = 0, contEmpleados = 0, contEspacios = 0, contNoticias = 0, contInvitados = 0,
        contFamiliaresSocio = 0, contInvitadosSocio = 0, contContrataciones = 0, contAdmins = 0,
    } = apiQueryCantidad();
    const numericRole = Number(role);

    switch (numericRole) {
        case 0:
            return [...SUPER_ADMIN_CARDS(contContrataciones, contAdmins),
            ...ADMIN_CARDS(contSolicitudes, contReservas, contEncuestas, contFamiliares, contAsociados,
                contAdherentes, contEmpleados, contEspacios, contNoticias, contInvitados)];

        case 1:
            return ADMIN_CARDS(contSolicitudes, contReservas, contEncuestas, contFamiliares, contAsociados,
                contAdherentes, contEmpleados, contEspacios, contNoticias, contInvitados);
        case 2:
        case 3:
            return SOCIOS_CARDS(contFamiliaresSocio, contInvitadosSocio, contEspacios);
        default:
            return [];
    }
}   