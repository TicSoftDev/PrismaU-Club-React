import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_ENTRADAS = EndPoints.ACCESOS;

export async function getEntradas() {
    const res = await axios.get(URL_ENTRADAS);
    return res.data;
};

