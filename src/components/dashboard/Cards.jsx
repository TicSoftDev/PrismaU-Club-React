import React from 'react';

function Cards({ card }) {

    return (
        <div className="size-card">
            <div className={`card border bg-white border-${card.color}-${card.opacidad} text-${card.color}-${card.opacidad}`}>
                <div className="card-description">
                    <h3> {card.cantidad} </h3>
                    <p className="font-normal">{card.titulo}</p>
                </div>
                <div className="card-icon">
                    <i className={`fa fa-${card.icono}`}></i>
                </div>
            </div>
        </div>
    );
}

export default Cards;