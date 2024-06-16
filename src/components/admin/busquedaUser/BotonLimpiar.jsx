import React from 'react'

function BotonLimpiar({ recargar }) {
    return (
        <button className='bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-6'
            onClick={recargar}>
            Limpiar
        </button>
    )
}

export default BotonLimpiar