import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.MENSUALIDADES;
const URL2 = EndPoints.PREFERENCIA;

export async function createPreferencia(data) {
    const res = await axios.post(URL2 + "-mensualidad", { id: data.mensualidad_id, valor: data.valor });
    return res.data;
}

export async function pagarManual(data) {
    const res = await axios.post(URL, data);
    return res.data;
}

export async function getMensualidadesUser(documento) {
    const res = await axios.get(URL + "/" + documento);
    return res.data;
}

export async function updateValorMensualidadesUser(documento, valor) {
    const res = await axios.put(URL + "/valor", { documento, valor });
    return res.data;
}
