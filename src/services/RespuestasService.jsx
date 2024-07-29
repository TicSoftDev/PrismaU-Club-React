import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.RESPUESTAS;

export async function createRespuesta(data) {
    const res = await axios.post(URL, data);
    return res.data;
}

export async function getRespuestas(id) {
    const res = await axios.get(URL + "/" + id);
    return res.data;
};

export async function updateRespuesta(id, data) {
    const res = await axios.put(URL + "/" + id, data);
    return res.data;
};

export async function deleteRespuesta(id) {
    const res = await axios.delete(URL + "/" + id);
    return res.data;
};