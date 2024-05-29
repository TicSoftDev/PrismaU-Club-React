import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_USUARIOS = EndPoints.LOGIN;

export async function iniciarSesion(usuario) {
    const options = {
        headers: {
            "Content-type": "application/json",
        },
    };
    const res = await axios.post(URL_USUARIOS, usuario, options);
    return res.data;
}