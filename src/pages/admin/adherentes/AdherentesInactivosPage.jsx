import React from 'react';
import DataTableAdherente from '../../../components/admin/adherentes/DataTableAdherente';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import FormAsociados from '../../../components/admin/asociados/FormAsociados';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import MenuAsociadosInactivos from '../../../components/admin/asociados/MenuAsociadosInactivos';
import useAdherente from '../../../hooks/useAdherente';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AdherentesInactivosPage() {

    const { titulo2, tituloModal, openModal, listaInactivo, adherente, loading, busquedaInactivo, tituloModalImage,
        openModalImage, titulo3, openModalEstado, toggleModalEstado, handleChangeEstado, handleUpdateEstado,
        goActivos, cambiarEstado, handleUpdateImage, handleChangeImagen, toggleModalImage, handleBusquedaInactivos,
        toggleModal, handleChange, handleSubmit, cargarAdherente, handleUpdate, eliminarAdherente, cargarImagen
    } = useAdherente();
    const handler = adherente.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo2} />
            <Container>
                <MenuAsociadosInactivos busqueda={busquedaInactivo} handleBusqueda={handleBusquedaInactivos}
                    go={goActivos} data={listaInactivo} titulo={titulo2} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormAsociados asociado={adherente} hanleChange={handleChange} />
                </VentanaModal>
                <DataTableAdherente cargarAsociado={cargarAdherente} usuarios={listaInactivo} eliminar={eliminarAdherente}
                    change={cambiarEstado} loading={loading} cargar={cargarImagen} />
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

export default AdherentesInactivosPage;