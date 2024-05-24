import React from 'react';
import { useParams } from 'react-router-dom';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import FormFamiliar from '../../../components/admin/familiares/FormFamiliar';
import TablaFamiliares from '../../../components/admin/familiares/TablaFamiliares';
import useFamiliares from '../../../hooks/useFamiliares';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function FamiliaresAsociadoPage() {

    const { id } = useParams();
    const { titulo, tituloModal, openModal,familiares, loading, familiar, touched,
        tituloModalImage, openModalImage,
        toggleModal, handleChange, handleSubmit, handleUpdate, cargarFamiliar, eliminarFamiliar, toggleModalImage,
        handleChangeImagen, cargarImagen, handleUpdateImage } = useFamiliares(id,'Asociado');
    const handler = familiar.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} 
                hanleSubmit={handler} loading={loading}>
                    <FormFamiliar familiar={familiar} hanleChange={handleChange} touched={touched} />
                </VentanaModal>
                <TablaFamiliares cargarEmpleado={cargarFamiliar} usuarios={familiares} eliminar={eliminarFamiliar}
                    loading={loading} cargar={cargarImagen} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage} loading={loading}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default FamiliaresAsociadoPage;