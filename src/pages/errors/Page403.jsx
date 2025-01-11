import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/403.css';
import Svg from '../../components/errors/Svg';
import { PrivateRoutes } from '../../models/RutasModel';

function Page403() {

    return (
        <div className='contenedor-403'>
            <Svg />
            <h1 className='message-403'>No tienes permiso para acceder a esta página.</h1>
            <Link className='link-403' to={PrivateRoutes.DASHBOARD}>Volver</Link>
        </div>
    )
}

export default Page403