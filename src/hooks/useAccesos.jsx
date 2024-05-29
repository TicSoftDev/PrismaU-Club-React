import { useEffect, useState } from "react";
import { getEntradas } from "../services/AccesosService";
import { alertError } from "../utilities/alerts/Alertas";

function useAccesos() {

    const titulo = 'Control de accesos';
    const [loading, setLoading] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const consultarAccesos = async () => {
        try {
            setLoading(true);
            let data = await getEntradas();
            if (busqueda) {
                const busquedaDate = new Date(busqueda);
                const busquedaDateString = busquedaDate.toISOString().split('T')[0]; 
                data = data.filter(entrada => {
                    const entradaDate = new Date(entrada.created_at);
                    const entradaDateString = entradaDate.toISOString().split('T')[0]; 
                    return entradaDateString === busquedaDateString;
                });
            }
            setLoading(false);
            setEntradas(data);
        } catch (e) {
            setLoading(false);
            alertError("useAccesos", e.message);
        }
    };

    useEffect(() => {
        consultarAccesos();
    }, [busqueda]);

    return {
        titulo, loading, entradas, busqueda, handleBusqueda
    };
}

export default useAccesos;
