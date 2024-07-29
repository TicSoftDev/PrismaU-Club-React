import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import DataTablePreguntasRespuestas from '../../../components/admin/encuestas/DataTablePreguntasRespuestas'
import FormPreguntasRespuesta from '../../../components/admin/encuestas/FormPreguntasRespuesta'
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo'
import useRespuestasEncuesta from '../../../hooks/useRespuestasEncuesta'
import Container from '../../../utilities/helpers/Container'
import TituloPage from '../../../utilities/helpers/TituloPage'
import VentanaModal from '../../../utilities/modals/VentanaModal'

function RespuestasPage() {

  const location = useLocation();
  const { id } = location.state || {};
  const rol = useSelector((state) => state.credenciales.Rol);
  const { titulo, tituloModal, lista, openModal, loading, respuesta,
    handleChange, handleSubmit, toggleModal, cargarRespuesta,handleUpdate ,handleDelete, } = useRespuestasEncuesta(id);
  const handler = respuesta.id ? handleUpdate : handleSubmit;

  return (
    <>
      <TituloPage titulo={titulo} />
      <Container>
        <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
        <DataTablePreguntasRespuestas data={lista} loading={loading} editar={cargarRespuesta} eliminar={handleDelete} rol={rol} name={'Respuesta'} />
        {/* Ventana para agregar y editar */}
        <VentanaModal size={'5xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler} loading={loading}>
          <FormPreguntasRespuesta entity={respuesta} handleChange={handleChange} name={'Respuesta'} />
        </VentanaModal>
      </Container>
    </>
  )
}

export default RespuestasPage