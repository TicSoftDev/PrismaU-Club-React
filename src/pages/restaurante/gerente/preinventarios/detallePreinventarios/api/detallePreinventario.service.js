import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.PREINVENTARIO;

export const DetallePreinventarioService = {

    guardarDetalle: async (id, items) => {
        const response = await axios.post(`${URL}/${id}/items`, { items });
        return response.data;
    },
    getProductos: async (id) => {
        const response = await axios.get(`${URL}/${id}/productos`);
        return response.data;
    },

};