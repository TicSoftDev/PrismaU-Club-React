import React from 'react';
import DataTableAdherente from '../../../components/admin/adherentes/DataTableAdherente';
import FormAdherentes from '../../../components/admin/adherentes/FormAdherentes';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import MenuAsociadosInactivos from '../../../components/admin/asociados/MenuAsociadosInactivos';
import useAdherente from '../../../hooks/useAdherente';
import useAsociados from '../../../hooks/useAsociados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AdherentesInactivosPage() {

    const { titulo2, tituloModal, openModal, listaInactivo, adherente, loading, busquedaInactivo, tituloModalImage,
        openModalImage, titulo3, openModalEstado, touched,
        toggleModalEstado, handleChangeEstado, handleUpdateEstado, goActivos, cambiarEstado, handleUpdateImage,
        handleChangeImagen, toggleModalImage, handleBusquedaInactivos, toggleModal, handleChange, handleSubmit,
        cargarAdherente, handleUpdate, eliminarAdherente, cargarImagen, handleSelectChange, cambiarAsociado
    } = useAdherente();
    const handler = adherente.id ? handleUpdate : handleSubmit;
    const { lista: socio } = useAsociados();

    return (
        <>
            <TituloPage titulo={titulo2} />
            <Container>
                <MenuAsociadosInactivos busqueda={busquedaInactivo} handleBusqueda={handleBusquedaInactivos}
                    go={goActivos} data={listaInactivo} titulo={titulo2} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormAdherentes socio={socio} adherente={adherente} hanleChange={handleChange}
                        handleChangeSelect={handleSelectChange} touched={touched} />
                </VentanaModal>
                <DataTableAdherente cargarAdherente={cargarAdherente} usuarios={listaInactivo} eliminar={eliminarAdherente}
                    change={cambiarEstado} loading={loading} cargar={cargarImagen} cambiar={cambiarAsociado} />
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

export default AdherentesInactivosPage;