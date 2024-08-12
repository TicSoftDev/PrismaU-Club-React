import React from 'react';

function Contenedor(props) {

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            {props.children}
        </div>
    );
}

export default Contenedor; 