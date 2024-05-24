import React from 'react';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableAsociado from '../../../components/admin/asociados/DataTableAsociado';
import FormAsociados from '../../../components/admin/asociados/FormAsociados';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import MenuAsociados from '../../../components/admin/asociados/MenuAsociados';
import useAsociados from '../../../hooks/useAsociados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AsociadosPage() {

    const { titulo, tituloModal, openModal, lista, busqueda, asociado, loading, changePage, tituloModalImage, openModalImage,
        openModalEstado, titulo3, touched, handleChangeEstado, toggleModalEstado, handleUpdateEstado, cambiarAdherente,
        goInactivos, cambiarEstado, toggleModalImage, cargarImagen, handleUpdateImage, handleChangeImagen,
        toggleModal, handleChange, handleSubmit, handleBusqueda, cargarAsociado, handleUpdate, eliminarAsociado
    } = useAsociados();
    const handler = asociado.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuAsociados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda}
                    go={goInactivos} change={changePage} data={lista} titulo={titulo} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormAsociados asociado={asociado} hanleChange={handleChange} touched={touched} />
                </VentanaModal>
                <DataTableAsociado cargarAsociado={cargarAsociado} usuarios={lista} eliminar={eliminarAsociado}
                    change={cambiarEstado} loading={loading} cargar={cargarImagen} cambiar={cambiarAdherente} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage} loading={loading}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
                <VentanaModal size={'4xl'} titulo={titulo3} openModal={openModalEstado} cerrarModal={toggleModalEstado}
                    hanleSubmit={handleUpdateEstado} loading={loading}>
                    <FormMotivo handleChangeEstado={handleChangeEstado} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default AsociadosPage;