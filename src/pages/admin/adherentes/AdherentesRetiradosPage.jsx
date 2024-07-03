import React from 'react'
import useAdherente from '../../../hooks/useAdherente'
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import MenuAsociadosRetirados from '../../../components/admin/asociados/MenuAsociadosRetirados';
import DataTableAdherente from '../../../components/admin/adherentes/DataTableAdherente';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';

function AdherentesRetiradosPage() {

  const { titulo4, busquedaRetirados, listaRetirados, loading, openModalImage, openModalRetirar, titulo3, tituloModalImage,
    titulo5, openModalEstado,
    goActivos, goInactivos, handleBusquedaRetirados, eliminarAdherente, cargarAdherente, cambiarEstado, cambiarAsociado,
    cargarImagen, toggleModalImage, handleChangeImagen, handleUpdateImage, toggleModalRetirar, handleChangeEstado,
    handleUpdateRetirar, toggleModalEstado, handleUpdateEstado, retirar

  } = useAdherente();

  return (
    <>
      <TituloPage titulo={titulo4} />
      <Container>
        <MenuAsociadosRetirados busqueda={busquedaRetirados} activos={goActivos} inactivos={goInactivos} data={listaRetirados}
          handleBusqueda={handleBusquedaRetirados} titulo={titulo4} />
        <DataTableAdherente cargarAdherente={cargarAdherente} usuarios={listaRetirados} eliminar={eliminarAdherente}
          change={cambiarEstado} cambiar={cambiarAsociado} cargar={cargarImagen} loading={loading} retirar={retirar} />
        <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
          hanleSubmit={handleUpdateImage} loading={loading}>
          <FormImagenAdherente handleChangeImage={handleChangeImagen} />
        </VentanaModal>
        <VentanaModal size={'4xl'} titulo={titulo3} openModal={openModalEstado} cerrarModal={toggleModalEstado}
          hanleSubmit={handleUpdateEstado} loading={loading}>
          <FormMotivo handleChangeEstado={handleChangeEstado} />
        </VentanaModal>
        <VentanaModal size={'4xl'} titulo={titulo5} openModal={openModalRetirar} cerrarModal={toggleModalRetirar}
          hanleSubmit={handleUpdateRetirar} loading={loading}>
          <FormMotivo handleChangeEstado={handleChangeEstado} />
        </VentanaModal>
      </Container>
    </>
  )
}

export default AdherentesRetiradosPage