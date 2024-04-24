import axios from "axios";

const URL_USUARIOS = "https://www.apiclubsincelejo.prismau.co/api/login";
// const URL_USUARIOS = "http://127.0.0.1:8000/api/login";

export async function iniciarSesion(usuario) {
    const options = {
        headers: {
            "Content-type": "application/json",
        },
    };
    const res = await axios.post(URL_USUARIOS, usuario, options);
    return res.data;
}