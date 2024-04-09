import React from 'react';
import Plantilla from '../../components/layouts/Plantilla';
import TituloPage from '../../utilities/helpers/TituloPage';
import ContenedorDashboard from '../../components/dashboard/ContenedorDashboard';
import Cards from '../../components/dashboard/Cards';
import useCantidad from '../../hooks/useCantidad';
import { useSelector } from 'react-redux';
import './../../assets/styles/cards.css';


function DashboardPage() {
    const titulo = 'Dashboard';
    const credenciales = useSelector((state) => state.credenciales);
    const { contAsociados, contAdherentes, contEmpleados, contFamiliares, contEspacios, contInvitados } = useCantidad();

    const adminCards = [
        { color: "yellow", cantidad: contAsociados, titulo: "Asociados", icono: "user-tie", opacidad: "400" },
        { color: "green", cantidad: contAdherentes, titulo: "Adherentes", icono: "user-tie", opacidad: "500" },
        { color: "purple", cantidad: contFamiliares, titulo: "Familiares", icono: "user-friends", opacidad: "500" },
        { color: "pink", cantidad: contEmpleados, titulo: "Empleados", icono: "users", opacidad: "500" },
        { color: "red", cantidad: contInvitados, titulo: "Invitados", icono: "user-clock", opacidad: "600" },
        { color: "yellow", cantidad: contEspacios, titulo: "Espacios", icono: "map-marked-alt", opacidad: "400" },
        { color: "yellow", cantidad: '12', titulo: "Hobbies", icono: "magic", opacidad: "400" },
        { color: "green", cantidad: '5', titulo: "Roles", icono: "user-cog", opacidad: "500" },
    ];

    const asociadoCards = [
        { color: "purple", cantidad: contFamiliares, titulo: "Familiares", icono: "user-friends", opacidad: "500" },
        { color: "red", cantidad: '0', titulo: "Invitados", icono: "user-clock", opacidad: "600" },
        { color: "yellow", cantidad: contEspacios, titulo: "Espacios", icono: "map-marked-alt", opacidad: "400" },
        { color: "green", cantidad: '12', titulo: "Hobbies", icono: "magic", opacidad: "500" },
    ];
    const cards = credenciales.Rol === '1' ? adminCards : asociadoCards;

    return (
        <Plantilla >
            <TituloPage titulo={titulo} />
            <ContenedorDashboard>
                {
                    cards.map((card) => (
                        <Cards card={card} key={card.titulo} />
                    ))
                }
            </ContenedorDashboard>
        </Plantilla>
    );
}

export default DashboardPage;