import React from 'react';

function ContenedorDashboard(props) {
    return (
        <div className="flex flex-wrap my-6 font-semibold animated-element">
            {props.children}
        </div>
    );
}

export default ContenedorDashboard;