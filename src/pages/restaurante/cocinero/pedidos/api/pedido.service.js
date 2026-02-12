import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.PEDIDOS;

export const PedidoService = {

    getPedidos: async (id) => {
        const response = await axios.get(`${URL}/cocina/${id}`);
        return response.data;
    },

    cambiarEstado: async (id, estado) => {
        const response = await axios.put(`${URL}/estado/${id}/${estado}`, {});
        return response.data;
    },
    
    cambiarEstadoPlato: async (id, estado) => {
        const response = await axios.put(`${URL}/estado-plato/${id}/${estado}`, {});
        return response.data;
    },

};