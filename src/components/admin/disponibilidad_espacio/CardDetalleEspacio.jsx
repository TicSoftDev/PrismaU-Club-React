import React from 'react';
import imagen from '../../../assets/img/imagen';
import { RouteBack } from '../../../models/RutasModel';

function CardDetalleEspacio({ espacio }) {
    return (

        <div className="flex flex-col items-center bg-gray-200 border border-gray-200 rounded-t-lg shadow md:flex-row md:max-w-full dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-tl-lg h-40 md:h-auto md:w-40" src={espacio.imagen ? (RouteBack + espacio.imagen) : imagen.logoPrisma} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{espacio.Descripcion}</h5>
            </div>
        </div>
    );
}

export default CardDetalleEspacio