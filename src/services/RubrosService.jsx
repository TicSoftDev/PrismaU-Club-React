import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.RUBROS;

export async function createRubro(data) {
    const res = await axios.post(URL, data);
    return res.data;
}

export async function getRubros() {
    const res = await axios.get(URL);
    return res.data;
};

export async function updateRubro(id, data) {
    const res = await axios.put(URL + "/" + id, data);
    return res.data;
};

export async function deleteRubro(id) {
    const res = await axios.delete(URL + "/" + id);
    return res.data;
};