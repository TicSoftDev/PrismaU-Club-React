import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.PAGOS;

export async function generarFactura(data) {
    const res = await axios.post(URL + "/facturas", data);
    return res.data;
}

export async function getPagos() {
    const res = await axios.get(URL);
    return res.data;
}

export async function getPagosCuotaBaile() {
    const res = await axios.get(URL + "-cuotas-baile");
    return res.data;
}