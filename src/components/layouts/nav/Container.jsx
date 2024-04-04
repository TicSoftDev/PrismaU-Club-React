import React from 'react';

function Container(props) {
    return (
        <div className={`flex items-center ${props.clase}`}>
            {props.children}
        </div>
    );
}

export default Container;