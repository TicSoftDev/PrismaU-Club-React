import axios from "axios";
import { EndPoints } from "../../../../../models/RutasModel";

const URL = EndPoints.COCINA;
const URL2 = EndPoints.EMPLEADOS;

export const CocinaService = {

    create: async (data) => {
        const response = await axios.post(URL, data);
        return response.data;
    },

    get: async () => {
        try{

            const response = await axios.get(URL);
            return response.data;
        }catch(error){
            console.log(error);
        }
    },

    getCocineros: async () => {
        const response = await axios.get(URL2 + "/cocineros");
        return response.data;
    },

    update: async (data) => {
        const response = await axios.put(URL + "/" + data.id, data);
        return response.data;
    },

    asignCocinero: async (data) => {
        const response = await axios.put(`${URL}/cocinero/${data.id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await axios.delete(URL + "/" + id);
        return response.data;
    }
};