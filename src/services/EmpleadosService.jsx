import axios from "axios";
import { EndPoints } from "../models/RutasModel";

const URL_EMPLEADOS = EndPoints.EMPLEADOS;

export async function createEmpleado(empleado) {
    try {
        const res = await axios.post(URL_EMPLEADOS, empleado);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function getEmpleados() {
    const res = await axios.get(URL_EMPLEADOS);
    return res.data;
};

export async function getCantidadEmpleados() {
    const res = await axios.get(URL_EMPLEADOS + "/cantidad");
    return res.data;
};

export async function updateEmpleado(empleado, id) {
    try {
        const res = await axios.put(URL_EMPLEADOS + "/" + id, empleado);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function updateImageEmpleado(foto, id) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await axios.post(URL_EMPLEADOS + "/imagen/" + id, foto, options);
    return res.data;
};

export async function deleteEmpleado(id) {
    const res = await axios.delete(URL_EMPLEADOS + "/" + id);
    return res.data;
};