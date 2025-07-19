import { resetAcceso } from "../../redux/credencialSlice";
import { store } from "../../redux/store";
import { resetUser } from "../../redux/userSlice";

export const cerrarSesion = () => {
    store.dispatch(resetUser());
    store.dispatch(resetAcceso());
    localStorage.clear();
}