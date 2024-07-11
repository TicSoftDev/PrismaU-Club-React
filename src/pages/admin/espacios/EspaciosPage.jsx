import React from 'react';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import CardEspacio from '../../../components/admin/espacios/CardEspacio';
import FormEspacio from '../../../components/admin/espacios/FormEspacio';
import FormImagenEspacio from '../../../components/admin/espacios/FormImagenEspacio';
import useEspacios from '../../../hooks/useEspacios';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import { useSelector } from 'react-redux';

function EspaciosPage() {

    const rol = useSelector((state) => state.credenciales.Rol);
    const { titulo, tituloModal, openModal, espacio, lista, loading, openModalImage, tituloModalImage, touched,
        handleChangeImage, handleChangeImagen, toggleModal, eliminarEspacio, handleChange, handleSubmit, handleUpdate,
        cargarEspacio, cambiarImagen, toggleModalImage, cargarImagen
    } = useEspacios();
    const handler = espacio.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} />
                <VentanaModal size={'2xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormEspacio espacio={espacio} hanleChange={handleChange} handleChangeImage={handleChangeImage} touched={touched}/>
                </VentanaModal>
                <CardEspacio espacios={lista} cargar={cargarEspacio} eliminar={eliminarEspacio} loading={loading}
                    change={cargarImagen} rol={rol} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={cambiarImagen}>
                    <FormImagenEspacio handleChangeImage={handleChangeImagen} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default EspaciosPage;