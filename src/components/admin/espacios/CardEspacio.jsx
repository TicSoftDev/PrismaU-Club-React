import React from 'react';
import { FaCalendarAlt, FaEdit, FaRegImage, FaTrashAlt } from 'react-icons/fa';
import imagen from '../../../assets/img/imagen';
import { PrivateRoutes, RouteBack } from '../../../models/RutasModel';
import CardSkeleton from '../../../utilities/skeletons/CardSkeleton';
import { useNavigate } from 'react-router-dom';

function CardEspacio({ espacios, rol, cargar, eliminar, loading, change }) {

    const navigate = useNavigate();

    if (loading) {
        return <CardSkeleton />;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 mb-5">
                {espacios.length > 0 ? espacios.map((espacio) => (
                    <div key={espacio.id} className="flex flex-col border border-gray-200 rounded-xl items-center justify-center w-full mx-auto">
                        <div className="w-full bg-white dark:bg-gray-800">
                            <h3 className="pt-2 font-bold text-center text-gray-800 uppercase dark:text-white">
                                {espacio.Descripcion}
                            </h3>
                            <div className="p-2">
                                <img className={`w-full rounded-lg h-40 ${espacio.imagen ? 'object-cover' : 'object-contain'}`} alt="Imagen del espacio"
                                    src={espacio.imagen ? (RouteBack + espacio.imagen) : imagen.logoPrisma} />
                            </div>
                            <div className="flex items-center justify-between mt-2 p-2">
                                <div className="inline-flex w-full" role="group">
                                    <button onClick={() => cargar(espacio)} type="button" className="flex justify-center w-1/3 px-4 py-2 text-xl font-medium text-white bg-blue-600  rounded-l-lg hover:bg-gray-100 hover:border-2 hover:border-blue-600 hover:text-blue-700">
                                        <FaEdit />
                                    </button>
                                    {rol == 0 &&
                                        <button onClick={() => eliminar(espacio.id)} type="button" className="flex justify-center w-1/3 px-4 py-2 text-xl font-medium text-white bg-red-600 hover:bg-gray-100 hover:border-2 hover:border-red-600 hover:text-red-600">
                                            <FaTrashAlt />
                                        </button>
                                    }
                                    <button onClick={() => navigate(PrivateRoutes.DISPONIBILIDAD_ESPACIO)} type="button" className="flex justify-center w-1/3 px-4 py-2 text-xl font-medium text-white bg-orange-500 hover:bg-gray-100 hover:border-2 hover:border-orange-500 hover:text-orange-500">
                                        <FaCalendarAlt />
                                    </button>
                                    <button onClick={() => change(espacio.id)} type="button" className="flex justify-center w-1/3 px-4 py-2 text-xl font-medium text-white bg-pink-600 rounded-r-lg hover:bg-gray-100 hover:border-2 hover:border-pink-600 hover:text-pink-600">
                                        <FaRegImage />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center text-center text-gray-500 font-bold text-lg">
                        No hay datos
                    </div>
                )}
            </div>
        </>
    );
}

export default CardEspacio;
