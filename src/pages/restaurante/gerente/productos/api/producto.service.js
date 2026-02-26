import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.PRODUCTOS;

export const ProductoService = {

    create: async (data) => {
        const response = await axios.post(URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    get: async () => {
        const response = await axios.get(URL);
        return response.data;
    },

    getDisponibles: async () => {
        const response = await axios.get(`${URL}/disponibles`);
        return response.data;
    },

    update: async (id, data) => {
        data.append("_method", "PUT");
        const response = await axios.post(`${URL}/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    delete: async (id) => {
        const response = await axios.delete(`${URL}/${id}`);
        return response.data;
    }
};