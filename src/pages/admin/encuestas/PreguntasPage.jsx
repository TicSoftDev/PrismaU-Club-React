import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import DataTablePreguntas from '../../../components/admin/encuestas/DataTablePreguntasRespuestas'
import FormPreguntasRespuesta from '../../../components/admin/encuestas/FormPreguntasRespuesta'
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo'
import usePreguntasEncuesta from '../../../hooks/usePreguntasEncuesta'
import Container from '../../../utilities/helpers/Container'
import TituloPage from '../../../utilities/helpers/TituloPage'
import VentanaModal from '../../../utilities/modals/VentanaModal'
import DataTablePreguntasRespuestas from '../../../components/admin/encuestas/DataTablePreguntasRespuestas'

function PreguntasPage() {

    const location = useLocation();
    const { id } = location.state || {};
    const rol = useSelector((state) => state.credenciales.Rol);
    const { titulo, tituloModal, openModal, pregunta, loading, lista,
        toggleModal, handleChange, cargarPregunta, handleSubmit, handleUpdate, handleDelete } = usePreguntasEncuesta(id);
    const handler = pregunta.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
                <DataTablePreguntasRespuestas data={lista} loading={loading} editar={cargarPregunta} eliminar={handleDelete} rol={rol} name={'Pregunta'} />
                {/* Ventana para agregar y editar */}
                <VentanaModal size={'5xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormPreguntasRespuesta entity={pregunta} handleChange={handleChange} name={'Pregunta'} />
                </VentanaModal>
            </Container>
        </>
    )
}

export default PreguntasPage