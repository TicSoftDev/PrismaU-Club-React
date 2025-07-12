import React from 'react';
import FormProgramacion from '../../../../components/admin/pagos/programacion/FormProgramacion';
import usePagos from '../../../../hooks/usePagos';
import useRubros from '../../../../hooks/useRubros';
import Container from '../../../../utilities/helpers/Container';
import TituloPage from '../../../../utilities/helpers/TituloPage';

export default function ProgramacionPagosPage() {

    const titulo = "Programación de pagos";
    const { programacion, loading, handleChange, handleChangeRubro, handleProgramar } = usePagos();
    const { rubros } = useRubros();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <FormProgramacion programacion={programacion} handleChange={handleChange} rubros={rubros}
                    handleChangeRubro={handleChangeRubro} loading={loading} handleSubmit={handleProgramar} />
            </Container>
        </>
    )
}
