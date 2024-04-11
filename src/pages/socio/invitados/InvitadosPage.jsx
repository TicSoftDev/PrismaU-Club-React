import React from 'react';
import FormInvitacion from '../../../components/socio/invitados/FormInvitacion';
import QrInvitacion from '../../../components/socio/invitados/QrInvitacion';
import useInvitado from '../../../hooks/useInvitado';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function InvitadosPage() {

    const { titulo, handleChange, invitado, handleSubmit, dataString, generado, recargar, loading } = useInvitado();
    const handler = generado ? recargar : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6'>
                    <div className="flex-grow">
                        <FormInvitacion hanleChange={handleChange} invitado={invitado} hanleSubmit={handler}
                            generado={generado} loading={loading} />
                    </div>

                    {
                        generado ?
                            <div className="flex-shrink md:w-1/3 flex justify-center">
                                <QrInvitacion data={dataString} />
                            </div> :
                            null
                    }
                </div>
            </Container>
        </>
    );
}

export default InvitadosPage;