import { useState } from 'react';
import apiQueryContrataciones from '../api/apiQueryContrataciones';
import { normalizeText } from '../models/FormateadorModel';

function useContrataciones() {

    const titulo = 'Solicitudes App';
    const [busqueda, setBusqueda] = useState('');
    const { contrataciones, isLoading } = apiQueryContrataciones();

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const filterBusqueda = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreCompleto = `${dato.Nombres} ${dato.Apellidos}`;
            const nombreNormalizado = normalizeText(nombreCompleto);
            const empresa = normalizeText(dato.Empresa);

            return palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || empresa.includes(palabra)
            );
        });
    };

    const lista = filterBusqueda(contrataciones, busqueda);

    return {
        titulo,
        lista,
        isLoading,
        busqueda,
        handleBusqueda
    };
}

export default useContrataciones