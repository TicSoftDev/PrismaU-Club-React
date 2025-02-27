import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_ADMIN = EndPoints.ADMINS;

export async function createAdmin(admin) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.post(URL_ADMIN, admin, options);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            throw new Error('Duplicado');
        }
        throw error;
    }
};

export async function getAdmins() {
    const res = await axios.get(URL_ADMIN);
    return res.data;
};

export async function getCantidadAdmins() {
    const res = await axios.get(URL_ADMIN + "/cantidad");
    return res.data;
};

export async function updateAdmin(admin) {
    try {
        const res = await axios.put(URL_ADMIN + "/" + admin.id, admin);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            throw new Error('Duplicado');
        }
        throw error;
    }
};

export async function changeStatus(id) {
    try {
        const res = await axios.put(URL_ADMIN + "/status/" + id, {});
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function deleteAdmin(id) {
    const res = await axios.delete(URL_ADMIN + "/" + id);
    return res.data;
};
