import React from 'react';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableAsociado from '../../../components/admin/asociados/DataTableAsociado';
import FormAsociados from '../../../components/admin/asociados/FormAsociados';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import MenuAsociadosInactivos from '../../../components/admin/asociados/MenuAsociadosInactivos';
import useAsociados from '../../../hooks/useAsociados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AsociadosInactivosPage() {

    const { titulo2, tituloModal, openModal, loading, listaInactivo, busquedaInactivo, asociado, tituloModalImage, openModalImage,
        titulo3, openModalEstado, toggleModalEstado, handleChangeEstado, handleUpdateEstado,
        cambiarEstado, toggleModalImage, cargarImagen, handleUpdateImage, handleChangeImagen,
        handleBusquedaInactivo, cargarAsociado, eliminarAsociado, goActivos, handleUpdate, toggleModal, handleChange
    } = useAsociados();

    return (
        <>
            <TituloPage titulo={titulo2} />
            <Container>
                <MenuAsociadosInactivos busqueda={busquedaInactivo} handleBusqueda={handleBusquedaInactivo}
                    go={goActivos} data={listaInactivo} titulo={titulo2} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handleUpdate}>
                    <FormAsociados asociado={asociado} hanleChange={handleChange} />
                </VentanaModal>
                <DataTableAsociado cargarAsociado={cargarAsociado} usuarios={listaInactivo} cargar={cargarImagen}
                    change={cambiarEstado} eliminar={eliminarAsociado} loading={loading} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
                <VentanaModal size={'4xl'} titulo={titulo3} openModal={openModalEstado} cerrarModal={toggleModalEstado}
                    hanleSubmit={handleUpdateEstado}>
                    <FormMotivo handleChangeEstado={handleChangeEstado} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default AsociadosInactivosPage;