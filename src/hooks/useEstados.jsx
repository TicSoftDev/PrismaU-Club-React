import { useEffect, useState } from "react";
import { getEstados } from "../services/EstadosService";
import { alertError } from "../utilities/alerts/Alertas";
import { format } from "date-fns";

function useEstados() {

    const titulo = 'Log de estados';
    const [busqueda, setBusqueda] = useState('');
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

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

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterBusqueda = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreCompleto = dato.user.asociado ?
                `${dato.user.asociado.Nombre} ${dato.user.asociado.Apellidos}` :
                `${dato.user.adherente.Nombre} ${dato.user.adherente.Apellidos}`;
            const nombreNormalizado = normalizeText(nombreCompleto);
            const fechaNormalizada = normalizeText(format(new Date(dato.created_at), 'dd/MM/yyyy'));

            return palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || fechaNormalizada.includes(palabra)
            );
        });
    };

    const lista = filterBusqueda(estados, busqueda);

    useEffect(() => {
        consultarEstados();
    }, []);

    return {
        titulo, lista, loading, busqueda, handleBusqueda
    };
}

export default useEstados;