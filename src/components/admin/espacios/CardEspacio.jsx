import React from 'react';
import { FaEdit, FaRegImages, FaTrashAlt } from 'react-icons/fa';
import imagen from '../../../assets/img/imagen';
import { RouteBack } from '../../../models/RutasModel';
import CardSkeleton from '../../../utilities/skeletons/CardSkeleton';

function CardEspacio({ espacios, cargar, eliminar, loading, change }) {

    if (loading) {
        return <CardSkeleton />;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 flex-wrap">
                {espacios.length > 0 ? espacios.map((espacio) => (
                    <div className="w-full m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={espacio.id}>
                        <img
                            className="rounded-t-lg w-full h-40 object-cover"
                            src={espacio.imagen ? (RouteBack + '/images/espacio.png') : imagen.logoPrisma}
                            alt="Imagen del espacio"
                        />
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full ${espacio.Estado === 1 ? 'bg-green-600' : 'bg-red-600'} mr-2`}></div>
                                <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">{espacio.Descripcion}</h5>
                            </div>
                            <div className="inline-flex rounded-md shadow-sm mt-2" role="group">
                                <button onClick={() => cargar(espacio)} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10" title='Editar'>
                                    <FaEdit />
                                </button>
                                <button onClick={() => eliminar(espacio.id)} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 hover:bg-gray-100 hover:text-red-600 focus:z-10" title='Eliminar'>
                                    <FaTrashAlt />
                                </button>
                                <button onClick={() => change(espacio.id)} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-yellow-500 rounded-r-lg hover:bg-gray-100 hover:text-yellow-500 focus:z-10" title='Cambiar imagen'>
                                    <FaRegImages />
                                </button>
                            </div>
                        </div>
                    </div>
                )) : <div className="m-10 text-gray-500 col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4 flex justify-center items-center text-center font-bold text-lg">
                    No hay datos
                </div>}
            </div>
        </>
    );
}

export default CardEspacio;
