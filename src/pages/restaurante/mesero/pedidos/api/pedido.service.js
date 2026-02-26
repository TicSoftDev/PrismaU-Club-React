import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.PEDIDOS;
const URL2 = EndPoints.VENTAS;

export const PedidoService = {

    getAbiertos: async () => {
        const response = await axios.get(`${URL}/abiertos`);
        return response.data;
    },

    cambiarMesa: async (pedido) => {
        const response = await axios.put(`${URL}/cambiar-mesa/${pedido.id}`, pedido);
        return response.data;
    },

    pagar: async (data) => {
        const response = await axios.post(`${URL2}`, data);
        return response.data;
    },

    cancelarPedido: async (id) => {
        const response = await axios.delete(`${URL}/cancelar/${id}`);
        return response.data;
    },
};