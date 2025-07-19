import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../../models/RutasModel";
import { alertOk } from "../alerts/Alertas";
import { usarStorageString } from "../localstorage/localstorage";
import { cerrarSesion } from "../logout/logout.utility";
import { marcarSesionExpirada, resetSesionExpirada, sesionYaExpirada } from "./VerifyGuard";

const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};

export const AuthGuard = () => {
    const usuario = useSelector((state) => state.user);
    const token = usarStorageString("@token");

    const [checking, setChecking] = useState(true);
    const [redirigir, setRedirigir] = useState(false);

    useEffect(() => {
        const verificar = async () => {
            const vencido = !token || isTokenExpired(token);
            const sinSesion = !usuario?.id;

            if ((vencido || sinSesion) && !sesionYaExpirada()) {
                marcarSesionExpirada();
                await alertOk("Sesión expirada", "Tu sesión ha expirado. Por favor inicia sesión nuevamente.", "Iniciar sesión");
                cerrarSesion();
                setRedirigir(true);
            } else {
                resetSesionExpirada();
            }

            setChecking(false);
        };

        verificar();
    }, [token, usuario]);

    if (checking) return null;
    if (redirigir) return <Navigate to={PublicRoutes.LOGIN} replace />;
    return <Outlet />;
};
