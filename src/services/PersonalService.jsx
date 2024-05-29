import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_PERSONAL = EndPoints.PERSONAL;

export async function createPersonal(personal) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.post(URL_PERSONAL, personal, options);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            throw new Error('Duplicado');
        }
        throw error;
    }
};

export async function updatePersonal(personal, id) {
    try {
        const res = await axios.put(URL_PERSONAL + "/" + id, personal);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            throw new Error('Duplicado');
        }
        throw error;
    }
};

export async function updateImagePersonal(foto, id) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await axios.post(URL_PERSONAL + "/imagen/" + id, foto, options);
    return res.data;
};

export async function deletePersonal(id) {
    const res = await axios.delete(URL_PERSONAL + "/" + id);
    return res.data;
};