import React from 'react'

export default function MenuPagos({ cuotas, mensualidades, user }) {

    return (
        <div>
            <button className='bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-6'
                onClick={() => mensualidades(user.Documento)}  >
                Mensualidades
            </button>
            <button className='bg-orange-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-6'
                onClick={() => cuotas(user.Documento)} >
                Cuota de baile
            </button>
        </div>
    )
}
