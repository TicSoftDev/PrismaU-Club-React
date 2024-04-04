import React from 'react';
import imagen from '../../../assets/img/imagen';


function Logo() {
    return (
        <p className="flex ms-2 md:me-24">
            <img src={imagen.logoPrisma} className="h-8 me-3" alt="FlowBite Logo" />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">PrismaU</span>
        </p>
    );
}

export default Logo; 