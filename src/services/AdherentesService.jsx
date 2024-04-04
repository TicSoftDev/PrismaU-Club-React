import axios from "axios";

const URL_ADHERENTES = "https://www.apiclubsincelejo.prismau.co/api/adherentes";
// const URL_ADHERENTES = "http://127.0.0.1:8000/api/adherentes";

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