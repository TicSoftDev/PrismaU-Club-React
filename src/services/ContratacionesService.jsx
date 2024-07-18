import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.CONTRATOS;

export async function getContrataciones() {
    const res = await axios.get(URL);
    return res.data;
};

export async function getCantidadContrataciones() {
    const res = await axios.get(URL + "/cantidad");
    return res.data;
};

