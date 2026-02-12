import React from 'react';

function ContainerContenido(props) {
    return (
        <div className={`p-4 ${Number(props.rol) === 9 ? 'lg:ml-0' : 'lg:ml-64'} mt-14`}>
            {props.children}
        </div>
    );
}

export default React.memo(ContainerContenido);