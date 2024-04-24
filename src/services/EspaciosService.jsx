import axios from "axios";

// const URL_ESPACIOS = "https://www.apiclubsincelejo.prismau.co/api/espacios";
const URL_ESPACIOS = "http://127.0.0.1:8000/api/espacios";

export async function createEspacio(espacio) {
    const headers = {
        "Content-type": "multipart/form-data",
    }
    const res = await axios.post(URL_ESPACIOS, espacio, { headers: headers });
    return res.data
};

export async function getEspacios() {
    const res = await axios.get(URL_ESPACIOS);
    return res.data;
};

export async function getCantidadEspacios() {
    const res = await axios.get(URL_ESPACIOS + "/cantidad");
    return res.data;
};

export async function updateEspacio(espacio, id) {
    const res = await axios.put(URL_ESPACIOS + "/" + id, espacio);
    return res.data;
};

export async function updateImagenEspacio(espacio, id) {
    const res = await axios.post(URL_ESPACIOS + "/imagen/" + id, espacio);
    return res.data;
};

export async function deleteEspacio(id) {
    const res = await axios.delete(URL_ESPACIOS + "/" + id);
    return res.data;
};