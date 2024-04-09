import axios from "axios";

// const URL_USUARIO = "https://www.apiclubsincelejo.prismau.co/api/usuario";
const URL_USUARIO = "http://127.0.0.1:8000/api/usuario";

export async function changePassword(id, usuario) {
    const res = await axios.put(URL_USUARIO + "/" + id, usuario);
    return res.data;
};
