import React from 'react';
import apiQueryReservas from '../api/apiQueryReservas';
import { normalizeText } from '../models/FormateadorModel';

function useReservas() {

    const titulo = 'Reservas';
    const [busqueda, setBusqueda] = React.useState('');
    const { reservas, isLoading } = apiQueryReservas();

    /*=========== Buscar ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
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
        isLoading,
        titulo,
        lista,
        busqueda,
        handleBusqueda
    }
}

export default useReservas