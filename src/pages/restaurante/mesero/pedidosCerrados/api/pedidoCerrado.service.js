import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.PEDIDOS;

export const PedidoCerradoService = {

    getPedidos: async () => {
        const response = await axios.get(`${URL}/cerrados`);
        return response.data;
    },

};