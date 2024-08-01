import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.RESERVAS;

export async function getReservas() {
    const res = await axios.get(URL);
    return res.data;
};

export async function getCantidadReservas() {
    const res = await axios.get(URL + "/cantidad");
    return res.data;
};


