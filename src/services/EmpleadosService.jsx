import axios from "axios";

// const URL_EMPLEADOS = "https://www.apiclubsincelejo.prismau.co/api/empleados";
const URL_EMPLEADOS = "http://127.0.0.1:8000/api/empleados";

export async function createEmpleado(empleado) {
    try {
        const res = await axios.post(URL_EMPLEADOS, empleado);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            throw new Error('Duplicado');
        }
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
        if (error.response && error.response.status === 422) {
            throw new Error('Duplicado');
        }
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