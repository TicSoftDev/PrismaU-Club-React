import axios from "axios";

// const URL_ASOCIADOS = "https://www.apiclubsincelejo.prismau.co/api/asociados";
const URL_ASOCIADOS = "http://127.0.0.1:8000/api/asociados";

export async function getAsociados() {
    const res = await axios.get(URL_ASOCIADOS);
    return res.data;
};
export async function getAsociadosInactivos() {
    const res = await axios.get(URL_ASOCIADOS + "/inactivos");
    return res.data;
};

export async function getCantidadAsociados() {
    const res = await axios.get(URL_ASOCIADOS + "/cantidad");
    return res.data;
};

export async function changeStatusAsociado(id, motivo) {
    const res = await axios.put(URL_ASOCIADOS + "/status/" + id, motivo);
    return res.data;
};
