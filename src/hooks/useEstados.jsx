import { useEffect, useState } from "react";
import { getEstados } from "../services/EstadosService";
import { alertError } from "../utilities/alerts/Alertas";

function useEstados() {

    const titulo = 'Log de estados';
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(false);

    const consultarEstados = async () => {
        try {
            setLoading(true);
            const res = await getEstados();
            setEstados(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alertError("useEstados", error.message);
        }
    }

    useEffect(() => {
        consultarEstados();
    }, []);

    return {
        titulo, estados, loading
    };
}

export default useEstados;