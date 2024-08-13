import React from 'react';

function CardsRoles({ consultar }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-10">
            <div className="flex flex-row gap-4 items-center bg-gradient-to-b from-red-200 to-gray-100 rounded-xl shadow-elegant p-2 transform transition duration-500 hover:scale-105 cursor-pointer" onClick={() => consultar(1)}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 text-red-500 text-2xl my-2">
                    <i className="fas fa-user-shield"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Admin</h3>
            </div>
            <div className="flex flex-row gap-4 items-center bg-gradient-to-b from-yellow-100 to-gray-100 rounded-xl shadow-elegant p-2 transform transition duration-500 hover:scale-105 cursor-pointer" onClick={() => consultar(2)}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 text-yellow-400 text-2xl my-2">
                    <i className="fas fa-user-tie"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Asociado</h3>
            </div>
            <div className="flex flex-row gap-4 items-center bg-gradient-to-b from-green-200 to-gray-100 rounded-xl shadow-elegant p-2 transform transition duration-500 hover:scale-105 cursor-pointer" onClick={() => consultar(3)}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 text-green-500 text-2xl my-2">
                    <i className="fas fa-user-tie"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Adherente</h3>
            </div>
            <div className="flex flex-row gap-4 items-center bg-gradient-to-b from-purple-200 to-gray-100 rounded-xl shadow-elegant p-2 transform transition duration-500 hover:scale-105 cursor-pointer" onClick={() => consultar(4)}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 text-purple-500 text-2xl my-2">
                    <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Familiar</h3>
            </div>
            <div className="flex flex-row gap-4 items-center bg-gradient-to-b from-pink-200 to-gray-100 rounded-xl shadow-elegant p-2 transform transition duration-500 hover:scale-105 cursor-pointer" onClick={() => consultar(5)}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 text-pink-500 text-2xl my-2">
                    <i className="fas fa-user"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Empleado</h3>
            </div>
            <div className="flex flex-row gap-4 items-center bg-gradient-to-b from-gray-300 to-gray-100 rounded-xl shadow-elegant p-2 transform transition duration-500 hover:scale-105 cursor-pointer" onClick={() => consultar(6)}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 text-gray-500 text-2xl my-2">
                    <i className="fas fa-user"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Portero</h3>
            </div>
        </div>
    );
}

export default CardsRoles;