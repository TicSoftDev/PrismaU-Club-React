import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.DISPONIBILIDADES_ESPACIOS;

export async function crearDisponibilidadEspacio(disponibilidad) {
    const res = await axios.post(URL, disponibilidad);
    return res.data;
};

export async function getDisponibilidadesEspacio(id) {
    const res = await axios.get(URL + "/" + id);
    return res.data;
};

export async function actualizarDisponibilidadEspacio(disponibilidad, id) {
    const res = await axios.put(URL + "/" + id, disponibilidad);
    return res.data;
};

export async function eliminarDisponibilidadEspacio(id) {
    const res = await axios.delete(URL + "/" + id);
    return res.data;
};
