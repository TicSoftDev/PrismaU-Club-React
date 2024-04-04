import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import MenuAsociados from '../../../components/admin/asociados/MenuAsociados';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import FormAsociados from '../../../components/admin/asociados/FormAsociados';
import useAdherente from '../../../hooks/useAdherente';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableAdherente from '../../../components/admin/adherentes/DataTableAdherente';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';

function AdherentesPage() {

    const { titulo, tituloModal, openModal, lista, busqueda, adherente, loading, tituloModalImage, openModalImage,
        titulo3, openModalEstado, toggleModalEstado, handleChangeEstado, handleUpdateEstado,
        goInactivos, cambiarEstado, cambiarAsociado, toggleModal, handleChange, handleSubmit, handleBusqueda, handleUpdate,
        cargarAdherente, eliminarAdherente, toggleModalImage, cargarImagen, handleUpdateImage, handleChangeImagen
    } = useAdherente();
    const handler = adherente.id ? handleUpdate : handleSubmit;

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuAsociados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda}
                    go={goInactivos} data={lista} titulo={titulo} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormAsociados asociado={adherente} hanleChange={handleChange} show={true} />
                </VentanaModal>
                <DataTableAdherente cargarAdherente={cargarAdherente} usuarios={lista} eliminar={eliminarAdherente} loading={loading}
                    change={cambiarEstado} cambiar={cambiarAsociado} cargar={cargarImagen} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
                <VentanaModal size={'4xl'} titulo={titulo3} openModal={openModalEstado} cerrarModal={toggleModalEstado}
                    hanleSubmit={handleUpdateEstado}>
                    <FormMotivo handleChangeEstado={handleChangeEstado} />
                </VentanaModal>
            </Container>
        </Plantilla>
    );
}

export default AdherentesPage;