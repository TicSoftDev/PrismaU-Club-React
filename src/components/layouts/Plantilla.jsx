import React, { useCallback, useState } from 'react';
import Navbar from './nav/Navbar';
import Sidebar from './aside/Sidebar';
import ContainerContenido from './content/ContainerContenido';

function Plantilla(props) {

    const [openAside, setOpenAside] = useState(false);
    const [openNav, setOpenNav] = useState(false);

    const toggleAside = useCallback(() => {
        setOpenAside(!openAside);
        setOpenNav(false);
    }, [openAside]);

    const toggleNav = useCallback(() => {
        setOpenNav(!openNav);
        setOpenAside(false);
    }, [openNav]);

    return (
        <>
            <Navbar toggleNav={toggleNav} toggleAside={toggleAside} open={openNav} />
            <Sidebar open={openAside} />            
            <ContainerContenido>
                {props.children}
            </ContainerContenido>
        </>
    );
}

export default React.memo(Plantilla);