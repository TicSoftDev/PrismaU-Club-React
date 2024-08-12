import { Accordion } from 'flowbite-react';
import React from 'react';

function RespuestasUsuarios({ pregunta, respuesta }) {

    return (
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title>{pregunta}</Accordion.Title>
                <Accordion.Content>
                    <p className="text-gray-600 dark:text-gray-400">
                        {respuesta}
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}

export default RespuestasUsuarios