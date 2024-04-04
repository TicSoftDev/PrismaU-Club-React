import React from 'react';

function ContainerContenido(props) {
    return (
        <div className="p-4 sm:ml-64 mt-14">
            {props.children}
        </div>
    );
}

export default React.memo(ContainerContenido);