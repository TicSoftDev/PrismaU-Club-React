import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.INVENTARIO;

export const DetallePreinventarioService = {

    getDetalle: async (fecha) => {
        const response = await axios.get(`${URL}/fecha/${fecha}`);
        return response.data;
    },

};