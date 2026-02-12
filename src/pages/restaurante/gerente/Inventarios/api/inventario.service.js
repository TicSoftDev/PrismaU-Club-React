import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.INVENTARIO;

export const InventarioService = {

    abrir: async (data) => {
        const response = await axios.post(URL, data);
        return response.data;
    },

    get: async () => {
        const response = await axios.get(URL);
        return response.data;
    },

};