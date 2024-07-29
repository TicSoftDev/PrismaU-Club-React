import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.ENCUESTAS;

export async function createEncuesta(data) {
    const res = await axios.post(URL, data);
    return res.data;
}

export async function getEncuestas() {
    const res = await axios.get(URL);
    return res.data;
};

export async function getCantidadEncuestas() {
    const res = await axios.get(URL + "/cantidad");
    return res.data;
};

export async function updateEncuesta(id, data) {
    const res = await axios.put(URL + "/" + id, data);
    return res.data;
};

export async function deleteEncuesta(id) {
    const res = await axios.delete(URL + "/" + id);
    return res.data;
};