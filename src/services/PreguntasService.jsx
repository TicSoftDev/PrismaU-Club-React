import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.PREGUNTAS;

export async function createPregunta(data) {
    const res = await axios.post(URL, data);
    return res.data;
}

export async function getPreguntas(id) {
    const res = await axios.get(URL+"/encuesta/" + id);
    return res.data;
};

export async function updatePregunta(id, data) {
    const res = await axios.put(URL + "/" + id, data);
    return res.data;
};

export async function deletePregunta(id) {
    const res = await axios.delete(URL + "/" + id);
    return res.data;
};