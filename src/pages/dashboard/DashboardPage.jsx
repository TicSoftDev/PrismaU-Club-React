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
    const { contAsociados, contAdherentes, contEmpleados, contFamiliares, contEspacios, contInvitados,
        contAdmins, contFamiliaresSocio, contInvitadosSocio, contNoticias } = useCantidad();

    const adminCards = [
        { color: "purple", cantidad: contFamiliares, titulo: "Familiares", icono: "user-friends", opacidad: "500" },
        { color: "red", cantidad: contAsociados, titulo: "Asociados", icono: "user-tie", opacidad: "600" },
        { color: "yellow", cantidad: contAdherentes, titulo: "Adherentes", icono: "user-tie", opacidad: "400" },
        { color: "green", cantidad: contEmpleados, titulo: "Empleados", icono: "users", opacidad: "500" },
        { color: "purple", cantidad: contEspacios, titulo: "Espacios", icono: "map-marked-alt", opacidad: "500" },
        { color: "red", cantidad: contNoticias, titulo: "Noticias", icono: "newspaper", opacidad: "600" },
        { color: "yellow", cantidad: contInvitados, titulo: "Invitados", icono: "user-clock", opacidad: "400" },
    ];

    const superAdmin = [
        { color: "purple", cantidad: 0, titulo: "Solicitudes", icono: "check-square", opacidad: "500" },
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