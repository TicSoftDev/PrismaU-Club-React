import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { PublicRoutes } from "../models/RutasModel";
import { alertOk } from "../utilities/alerts/Alertas";
import { marcarSesionExpirada } from "../utilities/guards/VerifyGuard";
import { usarStorageString } from "../utilities/localstorage/localstorage";
import { cerrarSesion } from "../utilities/logout/logout.utility";

let tokenGuardTriggered = false;

const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};

export const AxiosInterceptor = () => {
    axios.interceptors.request.use(
        async (request) => {
            const token = usarStorageString("@token");
            if (token) {
                if (isTokenExpired(token)) {
                    if (!tokenGuardTriggered) {
                        tokenGuardTriggered = true;
                        await alertOk("Sesión expirada", "Tu sesión ha expirado. Por favor inicia sesión nuevamente.", "Iniciar sesión");
                        cerrarSesion();
                        window.location.href = PublicRoutes.LOGIN;
                    }
                    return Promise.reject({ code: "TOKEN_EXPIRED", message: "Token expirado" });
                }

                request.headers['Authorization'] = `Bearer ${token}`;
            }

            return request;
        },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        response => response,
        async (error) => {
            if (error.response?.status === 401 && !tokenGuardTriggered) {
                tokenGuardTriggered = true;
                await alertOk("No autorizado", "Tu sesión ha caducado o el acceso no está autorizado.", "Iniciar sesión");
                cerrarSesion();
                marcarSesionExpirada();
                window.location.href = PublicRoutes.LOGIN;
            }
            return Promise.reject(error);
        }
    );
};
