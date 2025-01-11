import React from 'react';
import FormSolicitudes from '../../../components/admin/solicitudes/FormSolicitudes';
import BuscadorAvanzado from '../../../components/layouts/buscador/BuscadorAvanzado';
import useSolicitudes from '../../../hooks/useSolicitudes';
import SolicitudesColumns from '../../../models/columns/SolicitudesColumns';
import DataTableComponent from '../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../utilities/helpers/Contenido';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function SolicitudesPage() {

  const options = [
    { label: "Todas", value: "Todos" },
    { label: "Pendiente", value: "1" },
    { label: "Aprobada", value: "0" },
  ];
  const { titulo, lista, isLoading, busqueda, openModal, tituloModal, solicitud, isResponding,
    handleBusqueda, setEstadoFiltro, cargarSolicitud, toggleModal, handleChange, responder } = useSolicitudes();
  const columns = SolicitudesColumns({ cargarSolicitud });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <BuscadorAvanzado options={options} busqueda={busqueda} handleBusqueda={handleBusqueda} filtro={setEstadoFiltro} />
        <DataTableComponent data={lista} loading={isLoading} columns={columns} />
        {/* Ventana para responder */}
        <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={responder} loading={isResponding}>
          <FormSolicitudes solicitud={solicitud} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  );
}

export default SolicitudesPage