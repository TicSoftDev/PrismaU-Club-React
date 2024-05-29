import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_ADHERENTES = EndPoints.ADHERENTES;

export async function createAdherente(adherente) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.post(URL_ADHERENTES, adherente, options);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function getAdherentes() {
    const res = await axios.get(URL_ADHERENTES);
    return res.data;
};

export async function getAdherentesInactivos() {
    const res = await axios.get(URL_ADHERENTES + "/inactivos");
    return res.data;
};

export async function getCantidadAdherentes() {
    const res = await axios.get(URL_ADHERENTES + "/cantidad");
    return res.data;
};

export async function changeStatusAdherente(id, motivo) {
    const res = await axios.put(URL_ADHERENTES + "/status/" + id, motivo);
    return res.data;
};

export async function changeToAsociado(id) {
    const res = await axios.put(URL_ADHERENTES + "/asociado/" + id);
    return res.data;
};

export async function updateAdherente(adherente, id) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.put(URL_ADHERENTES + "/" + id, adherente, options);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function updateImage(foto, id) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await axios.post(URL_ADHERENTES + "/imagen/" + id, foto, options);
    return res.data;
};

export async function deleteAdherente(id) {
    try {
        const res = await axios.delete(URL_ADHERENTES + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
};