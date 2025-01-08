import React from 'react';

function ContenedorDashboard(props) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animated-element mt-5">
            {props.children}
        </div>
    );
}

export default ContenedorDashboard;