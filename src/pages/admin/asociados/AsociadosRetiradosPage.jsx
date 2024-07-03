import React from 'react';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableAsociado from '../../../components/admin/asociados/DataTableAsociado';
import FormAsociados from '../../../components/admin/asociados/FormAsociados';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import MenuAsociadosRetirados from '../../../components/admin/asociados/MenuAsociadosRetirados';
import useAsociados from '../../../hooks/useAsociados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AsociadosRetiradosPage() {

    const { titulo4, busquedaRetirados, listaRetirados, loading, tituloModalImage, openModalImage, titulo3, openModalEstado,
        asociado, openModal, tituloModal, touched, titulo5, openModalRetirar,
        goActivos, handleBusquedaRetirados, goInactivos, cargarAsociado, eliminarAsociado, cambiarAdherente, cambiarEstado, cargarImagen,
        handleUpdateImage, handleChangeImagen, handleUpdateEstado, toggleModalEstado, toggleModalImage, handleChangeEstado,
        toggleModal, handleUpdate, handleChange, handleUpdateRetirar, toggleModalRetirar, retirar
    } = useAsociados();

    return (
        <>
            <TituloPage titulo={titulo4} />
            <Container>
                <MenuAsociadosRetirados busqueda={busquedaRetirados} activos={goActivos} inactivos={goInactivos} data={listaRetirados}
                    handleBusqueda={handleBusquedaRetirados} titulo={titulo4} />
                <DataTableAsociado cargarAsociado={cargarAsociado} usuarios={listaRetirados} eliminar={eliminarAsociado}
                    change={cambiarEstado} loading={loading} cargar={cargarImagen} cambiar={cambiarAdherente} retirar={retirar} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handleUpdate} loading={loading}>
                    <FormAsociados asociado={asociado} hanleChange={handleChange} touched={touched} />
                </VentanaModal>
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

export default AsociadosRetiradosPage