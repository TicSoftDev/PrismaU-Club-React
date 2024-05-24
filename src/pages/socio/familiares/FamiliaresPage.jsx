import React from 'react'
import TituloPage from '../../../utilities/helpers/TituloPage'
import useFamiliares from '../../../hooks/useFamiliares'
import { useSelector } from 'react-redux';
import Container from '../../../utilities/helpers/Container';
import TableFamiliaresSocio from '../../../components/socio/familiares/TableFamiliaresSocio';

function FamiliaresPage() {

    const rol = useSelector(state => state.credenciales.Rol) == 2 ? 'Asociado' : 'Adherente';
    const id = useSelector(state => state.user.id);
    const { titulo, familiares,loading } = useFamiliares(id, rol);
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