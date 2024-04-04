import axios from "axios"
import { usarStorage } from "../utilities/localstorage/localstorage";
import { jwtDecode } from "jwt-decode";
import { TokenGuard } from "../utilities/guards/TokenGuard";

export const AxiosInterceptor = () => {

    const updateHeader = (request) => {
        const token = usarStorage("token");
        if (token && isTokenExpired(token)) {
            alert("Token expirado. Por favor, inicie sesión de nuevo.");
            TokenGuard();
            return Promise.reject(new axios.Cancel("Token de autenticación expirado"));
        }
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }

        return request;
    }

    axios.interceptors.request.use(updateHeader, error => Promise.reject(error));

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Error decodificando token:", error);
            return true;
        }
    };
}