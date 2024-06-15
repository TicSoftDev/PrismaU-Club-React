import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_NOTICIA = EndPoints.NOTICIAS;

export async function createNoticia(noticia) {
    try {
        const res = await axios.post(URL_NOTICIA, noticia);
        return res.data
    } catch (error) {
        throw error;
    }
};

export async function getNoticias() {
    const res = await axios.get(URL_NOTICIA);
    return res.data;
};

export async function getCantidadNoticias() {
    const res = await axios.get(URL_NOTICIA + "/cantidad");
    return res.data;
};

export async function updateNoticia(noticia, id) {
    try {
        const res = await axios.put(URL_NOTICIA + "/" + id, noticia);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function deleteNoticia(id) {
    const res = await axios.delete(URL_NOTICIA + "/" + id);
    return res.data;
};