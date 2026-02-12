import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.PEDIDOS;

export const DetallePedidoService = {
    crear: async (pedido) => {
        const res = await axios.post(`${URL}/add-items`, pedido);
        return res.data;
    },
    getPedido: async (mesa_id) => {
        const res = await axios.get(`${URL}/mesa/${mesa_id}`);
        return res.data;
    },
    update: async (detalle) => {
        const res = await axios.put(`${URL}/detalle/${detalle.id}`, detalle);
        return res.data;
    },
    cambiarEstadoPlato: async (id, estado) => {
        const response = await axios.put(`${URL}/estado-plato/${id}/${estado}`, {});
        return response.data;
    },
    cambiarEstado: async (id, estado) => {
        const response = await axios.put(`${URL}/estado/${id}/${estado}`, {});
        return response.data;
    },
    delete: async (data) => {
        const res = await axios.delete(`${URL}/detalle/${data.id}/${data.inventario_id}`);
        return res.data;
    }
}