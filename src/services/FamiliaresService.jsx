import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_FAMILIAR = EndPoints.FAMILIARES;

export async function createFamiliarAsociado(familiar) {
    const res = await axios.post(URL_FAMILIAR + "/asociado", familiar);
    return res.data;
};

export async function createFamiliarAdherente(familiar) {
    const res = await axios.post(URL_FAMILIAR + "/adherente", familiar);
    return res.data;
};

export async function getFamiliares(id, rol) {
    const res = await axios.get(URL_FAMILIAR + "/" + id + "/" + rol);
    return res.data;
};

export async function getCantidadFamiliares() {
    const res = await axios.get(URL_FAMILIAR + "/cantidad");
    return res.data;
};

export async function getCantidadFamiliaresSocio(id, rol) {
    const res = await axios.get(URL_FAMILIAR + "/cantidad/" + id + "/" + rol);
    return res.data;
};

export async function updateFamiliar(familiar, id) {
    const res = await axios.put(URL_FAMILIAR + "/" + id, familiar);
    return res.data;
};

export async function updateImageFamiliar(foto, id) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await axios.post(URL_FAMILIAR + "/imagen/" + id, foto, options);
    return res.data;
};

export async function deleteFamiliar(id) {
    const res = await axios.delete(URL_FAMILIAR + "/" + id);
    return res.data;
};