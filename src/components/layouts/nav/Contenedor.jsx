import React from 'react';

function Contenedor(props) {
    return (
        <div className="flex items-center justify-start rtl:justify-end">
            {props.children}
        </div>
    );
}

export default Contenedor;