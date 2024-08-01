import React from 'react';
import { useSelector } from 'react-redux';
import Cards from '../../components/dashboard/Cards';
import ContenedorDashboard from '../../components/dashboard/ContenedorDashboard';
import useCantidad from '../../hooks/useCantidad';
import TituloPage from '../../utilities/helpers/TituloPage';
import './../../assets/styles/cards.css';


function DashboardPage() {
    const titulo = 'Dashboard';
    const credenciales = useSelector((state) => state.credenciales);
    const { contAsociados, contAdherentes, contEmpleados, contFamiliares, contEspacios, contInvitados, contSolicitudes,
        contAdmins, contFamiliaresSocio, contInvitadosSocio, contNoticias, contContrataciones, contEncuestas, contReservas
    } = useCantidad();

    const adminCards = [
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

    const superAdmin = [
        { color: "purple", cantidad: contContrataciones, titulo: "Contrataciones", icono: "check-square", opacidad: "500" },
        { color: "red", cantidad: contAdmins, titulo: "Admistradores", icono: "user-shield", opacidad: "600" },
        { color: "yellow", cantidad: '5', titulo: "Roles", icono: "user-cog", opacidad: "400" },
        { color: "green", cantidad: '12', titulo: "Hobbies", icono: "magic", opacidad: "500" },
    ];

    const superAdminCards = [...superAdmin, ...adminCards];

    const asociadoCards = [
        { color: "purple", cantidad: contFamiliaresSocio, titulo: "Familiares", icono: "user-friends", opacidad: "500" },
        { color: "red", cantidad: contInvitadosSocio, titulo: "Invitados", icono: "user-clock", opacidad: "600" },
        { color: "yellow", cantidad: contEspacios, titulo: "Espacios", icono: "map-marked-alt", opacidad: "400" },
        { color: "green", cantidad: '12', titulo: "Hobbies", icono: "magic", opacidad: "500" },
    ];

    const cards = credenciales.Rol == 0 ? superAdminCards : credenciales.Rol == 1 ? adminCards : asociadoCards;

    return (
        <>
            <TituloPage titulo={titulo} />
            <ContenedorDashboard>
                {
                    cards.map((card) => (
                        <Cards card={card} key={card.titulo} />
                    ))
                }
            </ContenedorDashboard>
        </>
    );
}

export default DashboardPage;