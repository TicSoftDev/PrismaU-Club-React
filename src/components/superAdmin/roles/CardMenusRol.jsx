import React from 'react'

function CardMenusRol({ menu, eliminar }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
            {menu.map((menu) => (
                <div className="flex flex-row justify-between items-center border rounded-xl shadow-elegant p-6" key={menu.id}>
                    <h3 className="text-xl font-semibold text-gray-800">{menu.Name}</h3>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white text-lg cursor-pointer" onClick={() => eliminar(menu.id)}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardMenusRol