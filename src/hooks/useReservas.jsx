import React from 'react';
import { getReservas } from '../services/ReservasService';
import { format } from 'date-fns';

function useReservas() {

    const titulo = 'Reservas';
    const [busqueda, setBusqueda] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [reservas, setReservas] = React.useState([]);

    /*=========== Consultar ==============================*/

    const consultarReservas = async () => {
        setLoading(true);
        try {
            const data = await getReservas();
            setReservas(data);
        } catch (error) {
            console.log("Reservas", error.message);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        consultarReservas();
    }, []);

    /*=========== Buscar ==============================*/

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
            const fechaNormalizada = normalizeText(dato.Fecha);
            const espacioNormalizado = normalizeText(dato.espacio.Descripcion);

            return palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || fechaNormalizada.includes(palabra) || espacioNormalizado.includes(palabra)
            );
        });
    };

    const lista = filterBusqueda(reservas, busqueda);

    return {
        loading,
        titulo,
        lista,
        busqueda,
        handleBusqueda
    }
}

export default useReservas