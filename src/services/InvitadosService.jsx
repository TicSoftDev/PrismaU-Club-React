import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_INVITADO = EndPoints.INVITADOS;

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

export async function getCantidadInvitadosSocio(id) {
    const res = await axios.get(URL_INVITADO + "/cantidad/" + id);
    return res.data;
};
