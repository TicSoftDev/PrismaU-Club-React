import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_ESTADOS = EndPoints.ESTADOS;

export async function getEstados() {
    const res = await axios.get(URL_ESTADOS);
    return res.data;
};

