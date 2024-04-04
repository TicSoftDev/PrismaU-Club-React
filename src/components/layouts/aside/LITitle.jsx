import React from 'react';

function LITitle(props) {
    return (
        <li>
            <span className="text-sm font-light">
                {props.texto}
            </span>
        </li>
    );
}

export default LITitle;