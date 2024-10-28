import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.CUOTAS_BAILE;
const URL2 = EndPoints.PREFERENCIA;

export async function createPreferencia(data) {
    const res = await axios.post(URL2 + "-cuota-baile", { id: data.cuotas_baile_id, valor: data.valor });
    return res.data;
}

export async function pagarCuota(data) {
    const res = await axios.post(URL, data);
    return res.data;
}

export async function getCuotasUser(documento) {
    const res = await axios.get(URL + "/" + documento);
    return res.data;
}

export async function updateValorCuotasUser(documento, valor) {
    const res = await axios.put(URL + "/valor", { documento, valor });
    return res.data;
}
