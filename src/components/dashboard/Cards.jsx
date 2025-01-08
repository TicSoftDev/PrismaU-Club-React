import React from "react";

function Cards({ cards }) {
    return (
        <>
            {cards.map((card) => (
                <div
                    className={`flex items-center justify-between border p-4 rounded-lg border-${card.color}-${card.opacidad} text-${card.color}-${card.opacidad} bg-${card.color}-50 overflow-hidden`}
                    key={card.titulo}
                >
                    <div className="p-2 font-bold flex-1">
                        <h3 className="text-3xl truncate mb-1">{card.cantidad}</h3>
                        <p className="font-normal text-sm truncate">{card.titulo}</p>
                    </div>
                    <div className="text-2xl sm:text-6xl flex-shrink-0">
                        <i className={`fa fa-${card.icono}`}></i>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Cards;
