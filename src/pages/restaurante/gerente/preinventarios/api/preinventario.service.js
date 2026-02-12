import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.PREINVENTARIO;

export const PreinventarioService = {

    create: async (data) => {
        const response = await axios.post(URL, data);
        return response.data;
    },

    get: async () => {
        const response = await axios.get(URL);
        return response.data;
    },

    update: async (data) => {
        const response = await axios.put(URL + "/" + data.id, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await axios.delete(URL + "/" + id);
        return response.data;
    }
};