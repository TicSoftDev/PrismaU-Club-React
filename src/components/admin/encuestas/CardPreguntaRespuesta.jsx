import React from 'react'

function CardPreguntaRespuesta({ texto }) {
    return (
        <div className='w-full bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-lg p-4 my-5 font-semibold'>
            {texto}
        </div>
    )
}

export default CardPreguntaRespuesta