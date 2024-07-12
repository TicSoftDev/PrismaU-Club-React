import { useEffect, useState } from 'react';
import { getSolicitudes } from '../services/SolicitudesService';

function useSolicitudes() {

    const titulo = 'Solicitudes';
    const [busqueda, setBusqueda] = useState('');
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);

    /*=========== Consultar ==============================*/

    const consultarSolicitudes = async () => {
        try {
            setLoading(true);
            const res = await getSolicitudes();
            setSolicitudes(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alertError("cargar solicitudes", error.message);
        }
    }

    useEffect(() => {
        consultarSolicitudes();
    }, []);

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

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

    const lista = filterBusqueda(solicitudes, busqueda);

    return {
        titulo, lista, loading, busqueda, handleBusqueda
    };
}

export default useSolicitudes