import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import { PrivateRoutes } from "../../models/RutasModel";

export const RedirectByRol = () => {

    const credenciales = useAppSelector((state) => state.credenciales);
    const rol = credenciales?.Rol;

    if (rol === undefined) return null;

    switch (rol) {
        case 9:
            return <Navigate to={PrivateRoutes.PEDIDOS} replace />;
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 10:
            return <Navigate to={PrivateRoutes.DASHBOARD} replace />;

        default:
            return <Navigate to={PrivateRoutes.PAGE403} replace />;
    }
};