import axios from "axios";

const URL_INVITADO = "https://www.apiclubsincelejo.prismau.co/api/invitados";
// const URL_INVITADO = "http://127.0.0.1:8000/api/invitados";

export async function createInvitado(invitado) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.post(URL_INVITADO, invitado, options);
    return res.data;
};

export async function getInvitados() {
    const res = await axios.get(URL_INVITADO);
    return res.data;
};

export async function getCantidadInvitados() {
    const res = await axios.get(URL_INVITADO + "/cantidad");
    return res.data;
};
