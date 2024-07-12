import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.SOLICITUDES;

export async function getSolicitudes() {
    const res = await axios.get(URL);
    return res.data;
};

