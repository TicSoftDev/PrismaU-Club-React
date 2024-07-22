import React from 'react';
import { useLocation } from 'react-router-dom';
import DataTableDisponibilidades from '../../../components/admin/disponibilidad_espacio/DataTabledisponibilidades';
import useDisponibilidadEspacio from '../../../hooks/useDisponibilidadEspacio';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import CardDetalleEspacio from '../../../components/admin/disponibilidad_espacio/CardDetalleEspacio';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import FormDisponibilidadEspacio from '../../../components/admin/disponibilidad_espacio/FormDisponibilidadEspacio';

const DisponibilidadEspacioPage = () => {

  const location = useLocation();
  const { espacio } = location.state || {};
  const { titulo, disponibilidades, loading, disponibilidad, openModal, tituloModal,
    handleChange, handleSubmit, toggleModal, handleUpdate, cargarDisponibilidad, eliminarDisponibilidad } = useDisponibilidadEspacio(espacio.id);
  const handler = disponibilidad.id ? handleUpdate : handleSubmit;

  return (
    <>
      <TituloPage titulo={titulo} />
      <Container>
        <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
        <CardDetalleEspacio espacio={espacio} />
        <DataTableDisponibilidades data={disponibilidades} loading={loading} editar={cargarDisponibilidad}
          eliminar={eliminarDisponibilidad} />
        {/* Ventana para agregar y editar */}
        <VentanaModal size={'xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler} loading={loading}>
          <FormDisponibilidadEspacio disponibilidad={disponibilidad} handleChange={handleChange} />
        </VentanaModal>
      </Container>
    </>
  )
}

export default DisponibilidadEspacioPage