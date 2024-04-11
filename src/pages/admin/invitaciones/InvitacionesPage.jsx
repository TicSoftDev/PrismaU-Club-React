import React from 'react';
import DataTableInvitaciones from '../../../components/admin/invitaciones/DataTableInvitaciones';
import FiltroInvitaciones from '../../../components/admin/invitaciones/FiltroInvitaciones';
import useInvitado from '../../../hooks/useInvitado';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function InvitacionesPage() {

    const { titulo2, loading, invitados, selectedMonth, setSelectedMonth } = useInvitado();

    return (
        <>
            <TituloPage titulo={titulo2} />
            <Container>
                <FiltroInvitaciones selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                <DataTableInvitaciones data={invitados} loading={loading} />
            </Container>
        </>
    );
}

export default InvitacionesPage;