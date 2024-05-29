import axios from "axios";

const URL_ENTRADAS = "https://www.apiclubsincelejo.prismau.co/api/entradas";
// const URL_ENTRADAS = "http://127.0.0.1:8000/api/entradas";

export async function getEntradas() {
    const res = await axios.get(URL_ENTRADAS);
    return res.data;
};

