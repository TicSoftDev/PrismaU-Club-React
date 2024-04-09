import axios from "axios";

// const URL_ESTADOS = "https://www.apiclubsincelejo.prismau.co/api/estados";
const URL_ESTADOS = "http://127.0.0.1:8000/api/estados";

export async function getEstados() {
    const res = await axios.get(URL_ESTADOS);
    return res.data;
};

