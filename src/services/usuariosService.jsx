import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_USUARIO = EndPoints.USUARIOS;

export async function getSocios() {
    const res = await axios.get(URL_USUARIO + "/socios");
    return res.data;
}

export async function changePassword(id, usuario) {
    const res = await axios.put(URL_USUARIO + "/" + id, usuario);
    return res.data;
};

export async function getByDocumento(documento) {
    try {
        const res = await axios.get(URL_USUARIO + "/" + documento);
        return res.data;
    } catch (e) {
        throw e;
    }
};
