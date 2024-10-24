import React from 'react';
import FormProgramacion from '../../../../components/admin/pagos/programacion/FormProgramacion';
import usePagos from '../../../../hooks/usePagos';
import useRubros from '../../../../hooks/useRubros';
import Container from '../../../../utilities/helpers/Container';
import TituloPage from '../../../../utilities/helpers/TituloPage';

export default function ProgramacionPagosPage() {

    const titulo = "Programación de pagos";
    const { programacion, loading, handleChangeProgramacion, handleProgramar } = usePagos();
    const { rubros } = useRubros();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <FormProgramacion programacion={programacion} handleChange={handleChangeProgramacion} rubros={rubros}
                    loading={loading} handleSubmit={handleProgramar} />
            </Container>
        </>
    )
}
