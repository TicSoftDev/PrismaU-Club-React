import React from 'react';

function ContenedorDashboard(props) {
    return (
        <div className="flex flex-wrap my-6 font-semibold">
            {props.children}
        </div>
    );
}

export default ContenedorDashboard;