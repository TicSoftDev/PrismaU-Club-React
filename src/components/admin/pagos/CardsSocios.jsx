import React from 'react';

function CardsSocios({ consultar }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-5">
            <div className="flex flex-row gap-4 items-center bg-gradient-to-b from-purple-100 to-gray-100 rounded-xl shadow-elegant p-2 transform transition duration-500 hover:scale-105 cursor-pointer"
                onClick={() => consultar(2)}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 text-purple-400 text-2xl my-2">
                    <i className="fas fa-user-tie"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Asociado</h3>
            </div>
            <div className="flex flex-row gap-4 items-center bg-gradient-to-b from-red-200 to-gray-100 rounded-xl shadow-elegant p-2 transform transition duration-500 hover:scale-105 cursor-pointer"
                onClick={() => consultar(3)}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 text-red-500 text-2xl my-2">
                    <i className="fas fa-user-tie"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Adherente</h3>
            </div>
        </div>
    );
}

export default CardsSocios;