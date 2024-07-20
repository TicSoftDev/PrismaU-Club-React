import React from 'react';
import DataTableSolicitudes from '../../../components/admin/solicitudes/DataTableSolicitudes';
import FormSolicitudes from '../../../components/admin/solicitudes/FormSolicitudes';
import BuscadorAvanzado from '../../../components/layouts/buscador/BuscadorAvanzado';
import useSolicitudes from '../../../hooks/useSolicitudes';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function SolicitudesPage() {

  const options = [
    { label: "Todas", value: "Todos" },
    { label: "Pendiente", value: "1" },
    { label: "Aprobada", value: "0" },
  ]
  const { titulo, lista, loading, busqueda, openModal, tituloModal, solicitud,
    handleBusqueda, setEstadoFiltro, cargarSolicitud, toggleModal, handleChange, responder } = useSolicitudes();

  return (
    <>
      <TituloPage titulo={titulo} />
      <Container>
        <BuscadorAvanzado options={options} busqueda={busqueda} handleBusqueda={handleBusqueda} filtro={setEstadoFiltro} />
        <DataTableSolicitudes data={lista} loading={loading} responder={cargarSolicitud} />
        {/* Ventana para responder */}
        <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={responder} loading={loading}>
          <FormSolicitudes solicitud={solicitud} handleChange={handleChange} />
        </VentanaModal>
      </Container>
    </>
  );
}

export default SolicitudesPage