import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import MenuAsociados from '../../../components/admin/asociados/MenuAsociados';
import useAsociados from '../../../hooks/useAsociados';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import FormAsociados from '../../../components/admin/asociados/FormAsociados';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableAsociado from '../../../components/admin/asociados/DataTableAsociado';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';

function AsociadosPage() {

    const { titulo, tituloModal, openModal, lista, busqueda, asociado, loading, changePage, tituloModalImage, openModalImage,
        openModalEstado, titulo3, handleChangeEstado, toggleModalEstado, handleUpdateEstado,
        goInactivos, cambiarEstado, toggleModalImage, cargarImagen, handleUpdateImage, handleChangeImagen,
        toggleModal, handleChange, handleSubmit, handleBusqueda, cargarAsociado, handleUpdate, eliminarAsociado
    } = useAsociados();
    const handler = asociado.id ? handleUpdate : handleSubmit;

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuAsociados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda}
                    go={goInactivos} change={changePage} data={lista} titulo={titulo} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormAsociados asociado={asociado} hanleChange={handleChange} />
                </VentanaModal>
                <DataTableAsociado cargarAsociado={cargarAsociado} usuarios={lista} eliminar={eliminarAsociado}
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
        </Plantilla>
    );
}

export default AsociadosPage;