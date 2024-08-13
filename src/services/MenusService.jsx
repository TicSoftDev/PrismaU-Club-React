import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL = EndPoints.MENUS;

export async function createMenu(data) {
    const res = await axios.post(URL, data);
    return res.data;
}

export async function createMenuRol(data) {
    const res = await axios.post(URL + "/rol", data);
    return res.data;
}

export async function getMenus(id) {
    const res = await axios.get(URL);
    return res.data;
};

export async function getMenusRol(id) {
    const res = await axios.get(URL + "/rol/" + id);
    return res.data;
};

export async function updateMenu(id, data) {
    const res = await axios.put(URL + "/" + id, data);
    return res.data;
};

export async function deleteMenu(id) {
    const res = await axios.delete(URL + "/" + id);
    return res.data;
};

export async function deleteMenuRol(id, codigo) {
    const res = await axios.delete(URL + "/rol/" + id + "/" + codigo);
    return res.data;
};

