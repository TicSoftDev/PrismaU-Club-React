import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../../models/RutasModel';

export const VerifyGuard = () => {
    const usuario = useSelector((state) => state.user);

    return usuario.Nombre ? <Navigate replace to={PrivateRoutes.DASHBOARD} /> : <Outlet />;
};

let sesionExpirada = false;

export const marcarSesionExpirada = () => {
    sesionExpirada = true;
};

export const sesionYaExpirada = () => sesionExpirada;

export const resetSesionExpirada = () => {
    sesionExpirada = false;
};

