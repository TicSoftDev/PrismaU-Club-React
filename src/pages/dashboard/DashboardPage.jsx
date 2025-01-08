import React from 'react';
import Cards from '../../components/dashboard/Cards';
import ContenedorDashboard from '../../components/dashboard/ContenedorDashboard';
import { useAppSelector } from '../../hooks/useStore';
import { getCardsByRole } from '../../models/ItemsCardsModel';
import TituloPage from '../../utilities/helpers/TituloPage';

function DashboardPage() {

    const titulo = 'Dashboard';
    const rol = useAppSelector((state) => state.credenciales.Rol);
    const items = getCardsByRole(rol)

    return (
        <>
            <TituloPage titulo={titulo} />
            <ContenedorDashboard>
                <Cards cards={items} />
            </ContenedorDashboard>
        </>
    );
}

export default DashboardPage;