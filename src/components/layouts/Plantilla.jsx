import React from 'react';
import { Outlet } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { useAppSelector } from '../../hooks/useStore';
import Sidebar from './aside/Sidebar';
import ContainerContenido from './content/ContainerContenido';
import Navbar from './nav/Navbar';

function Plantilla() {

    const usuario = useAppSelector((state) => state.user);
    const credenciales = useAppSelector((state) => state.credenciales);
    const { openAside, toggleAside, logout, } = useLogin();

    return (
        <>
            <Navbar toggleAside={toggleAside} credenciales={credenciales} usuario={usuario} logout={logout} />
            <Sidebar open={openAside} />
            <ContainerContenido>
                <Outlet />
            </ContainerContenido>
        </>
    );
}

export default React.memo(Plantilla);