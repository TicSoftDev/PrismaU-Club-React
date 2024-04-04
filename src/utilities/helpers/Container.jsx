import React from 'react';

function Container(props) {
    return (
        <div className="p-4 border-2 bg-white rounded-lg dark:border-gray-700 mt-5">
            {props.children}
        </div>
    );
}

export default Container;