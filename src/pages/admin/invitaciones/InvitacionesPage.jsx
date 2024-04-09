import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import useInvitado from '../../../hooks/useInvitado';
import DataTableInvitaciones from '../../../components/admin/invitaciones/DataTableInvitaciones';
import FiltroInvitaciones from '../../../components/admin/invitaciones/FiltroInvitaciones';

function InvitacionesPage() {

    const { titulo2, loading, invitados, selectedMonth, setSelectedMonth } = useInvitado();

    return (
        <Plantilla>
            <TituloPage titulo={titulo2} />
            <Container>
                <FiltroInvitaciones selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                <DataTableInvitaciones data={invitados} loading={loading} />
            </Container>
        </Plantilla>
    );
}

export default InvitacionesPage;