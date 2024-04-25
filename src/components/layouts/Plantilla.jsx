import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import Sidebar from './aside/Sidebar';
import ContainerContenido from './content/ContainerContenido';
import Navbar from './nav/Navbar';

function Plantilla() {

    const usuario = useSelector((state) => state.user);
    const credenciales = useSelector((state) => state.credenciales);
    const { openAside, toggleAside, openNav, toggleNav, logout, } = useLogin();

    return (
        <>
            <Navbar toggleNav={toggleNav} toggleAside={toggleAside} open={openNav} credenciales={credenciales}
                usuario={usuario} logout={logout} />
            <Sidebar open={openAside} />
            <ContainerContenido>
                <Outlet />
            </ContainerContenido>
        </>
    );
}

export default React.memo(Plantilla);