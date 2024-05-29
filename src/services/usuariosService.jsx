import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_USUARIO = EndPoints.USUARIOS;

export async function changePassword(id, usuario) {
    const res = await axios.put(URL_USUARIO + "/" + id, usuario);
    return res.data;
};
