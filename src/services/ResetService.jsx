import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_SEND_CODE = EndPoints.RESET;
const URL_VERIFY = EndPoints.VERIFY_CODE;
const URL_CHANGE = EndPoints.CHANGE_PASSWORD;

export async function sendCode(documento) {
    const res = await axios.post(URL_SEND_CODE, { Documento: documento });
    return res.data;
};

export async function validateCode(codigo) {
    const res = await axios.post(URL_VERIFY, { code: codigo });
    return res.data;
};

export async function changePassword(codigo, clave) {
    const res = await axios.post(URL_CHANGE, { code: codigo, new_password: clave });
    return res.data;
};

