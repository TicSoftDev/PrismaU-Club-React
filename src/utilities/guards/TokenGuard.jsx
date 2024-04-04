import { PublicRoutes } from "../../models/RutasModel";

export const TokenGuard = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('credenciales');
    window.location.href = PublicRoutes.LOGIN;
}