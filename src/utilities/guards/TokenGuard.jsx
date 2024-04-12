import { PublicRoutes } from "../../models/RutasModel";

export const TokenGuard = () => {
    localStorage.clear(); 
    window.location.assign(PublicRoutes.LOGIN); 
}