import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.SOLICITUDES;

export async function getSolicitudes() {
    const res = await axios.get(URL);
    return res.data;
};

export async function getCantidadSolicitudes() {
    const res = await axios.get(URL + "/pendientes");
    return res.data;
};

export async function responderSolicitud(solicitud) {
    const res = await axios.put(URL + "/" + solicitud.id, solicitud);
    return res.data;
};

