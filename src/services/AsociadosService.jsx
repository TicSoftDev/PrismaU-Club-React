import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_ASOCIADOS = EndPoints.ASOCIADOS;

export async function createAsociado(asociado) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.post(URL_ASOCIADOS, asociado, options);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function getAsociados() {
    const res = await axios.get(URL_ASOCIADOS);
    return res.data;
};

export async function getCantidadAsociados() {
    const res = await axios.get(URL_ASOCIADOS + "/cantidad");
    return res.data;
};

export async function updateAsociado(asociado, id) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.put(URL_ASOCIADOS + "/" + id, asociado, options);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function changeStatusAsociado(id, motivo) {
    const res = await axios.put(URL_ASOCIADOS + "/status/" + id, motivo);
    return res.data;
};

export async function updateImage(foto, id) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await axios.post(URL_ASOCIADOS + "/imagen/" + id, foto, options);
    return res.data;
};

export async function deleteAsociado(id) {
    try {
        const res = await axios.delete(URL_ASOCIADOS + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
};