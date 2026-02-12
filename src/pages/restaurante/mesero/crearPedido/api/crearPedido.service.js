import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.PEDIDOS;
const URL2 = EndPoints.SOCIOS;

export const CrearPedidoService = {

    crear: async (pedido) => {
        const res = await axios.post(URL, pedido);
        return res.data;
    },
    getSocios: async () => {
        const res = await axios.get(URL2);
        return res.data;
    },
    getPedidoMesa: async (mesa_id) => {
        const res = await axios.get(`${URL}/mesa/${mesa_id}`);
        return res.data;
    },
    update: async (pedido) => {
        const res = await axios.put(`${URL}/${pedido.id}`, pedido);
        return res.data;
    }
} 