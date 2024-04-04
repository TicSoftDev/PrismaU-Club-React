import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import CardEspacio from '../../../components/admin/espacios/CardEspacio';
import useEspacios from '../../../hooks/useEspacios';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import FormEspacio from '../../../components/admin/espacios/FormEspacio';
import FormImagenEspacio from '../../../components/admin/espacios/FormImagenEspacio';

function EspaciosPage() {

    const { titulo, tituloModal, openModal, espacio, lista, loading, openModalImage, tituloModalImage,
        handleChangeImage, handleChangeImagen, toggleModal, eliminarEspacio, handleChange, handleSubmit, handleUpdate,
        cargarEspacio, cambiarImagen, toggleModalImage, cargarImagen
    } = useEspacios();
    const handler = espacio.id ? handleUpdate : handleSubmit;

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} />
                <VentanaModal size={'2xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormEspacio espacio={espacio} hanleChange={handleChange} handleChangeImage={handleChangeImage} />
                </VentanaModal>
                <CardEspacio espacios={lista} cargar={cargarEspacio} eliminar={eliminarEspacio} loading={loading}
                    change={cargarImagen} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={cambiarImagen}>
                    <FormImagenEspacio handleChangeImage={handleChangeImagen} />
                </VentanaModal>
            </Container>
        </Plantilla>
    );
}

export default EspaciosPage;