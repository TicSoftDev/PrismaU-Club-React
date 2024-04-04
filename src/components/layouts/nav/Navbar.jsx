import React from 'react';
import Nav from './Nav';
import Contenedor from './Contenedor';
import Hamburguer from './Hamburguer';
import Logo from './Logo';
import Container from './Container';
import User from './User';
import Opciones from './Opciones';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PublicRoutes } from '../../../models/RutasModel';
import Swal from 'sweetalert2';
import { removerStorage } from '../../../utilities/localstorage/localstorage';
import { resetUser } from '../../../redux/userSlice';
import { resetAcceso } from '../../../redux/credencialSlice';

function Navbar({ toggleNav, toggleAside, open }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        toggleNav();
        Swal.fire({
            title: '¿Desea salir del sistema?',
            text: "Si, lo hace tendra que iniciar sesion nuevamente",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, salir!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                removerStorage("token");
                dispatch(resetUser());
                dispatch(resetAcceso());
                navigate(PublicRoutes.LOGIN, { replace: true });
            }
        })
    }
    return (
        <Nav>
            <Contenedor>
                <Hamburguer toggleAside={toggleAside} />
                <Logo />
            </Contenedor>
            <Container>
                <Container clase={"ms-3"}>
                    <User toggleNav={toggleNav} />
                    <Opciones open={open} logout={logout} />
                </Container>
            </Container>
        </Nav>
    );
}

export default React.memo(Navbar);