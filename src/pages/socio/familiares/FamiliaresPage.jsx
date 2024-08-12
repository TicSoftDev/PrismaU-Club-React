import React from 'react';
import { useSelector } from 'react-redux';
import TableFamiliaresSocio from '../../../components/socio/familiares/TableFamiliaresSocio';
import useFamiliares from '../../../hooks/useFamiliares';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';

function FamiliaresPage() {

    const rol = useSelector(state => state.credenciales.Rol) == 2 ? 'Asociado' : 'Adherente';
    const id = useSelector(state => state.user.id);
    const { titulo, familiares, loading } = useFamiliares(id, rol);

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <TableFamiliaresSocio familiares={familiares} loading={loading} />
            </Container>
        </>
    )
}

export default FamiliaresPage