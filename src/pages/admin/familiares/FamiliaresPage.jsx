import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import useFamiliares from '../../../hooks/useFamiliares';
import { useParams } from 'react-router-dom';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import TablaFamiliares from '../../../components/admin/familiares/TablaFamiliares';
import FormFamiliar from '../../../components/admin/familiares/FormFamiliar';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';

function FamiliaresPage() {

    const { id } = useParams();
    const { titulo, tituloModal, openModal, listadoFamiliares, loading, familiar, tituloModalImage, openModalImage,
        toggleModal, handleChange, handleSubmit, handleUpdate, cargarFamiliar, eliminarFamiliar, toggleModalImage,
        handleChangeImagen, cargarImagen, handleUpdateImage,
    } = useFamiliares(id);
    const handler = familiar.id ? handleUpdate : handleSubmit;

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormFamiliar familiar={familiar} hanleChange={handleChange} />
                </VentanaModal>
                <TablaFamiliares cargarEmpleado={cargarFamiliar} usuarios={listadoFamiliares} eliminar={eliminarFamiliar}
                    loading={loading} cargar={cargarImagen } />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
            </Container>
        </Plantilla>
    );
}

export default FamiliaresPage;