import React from 'react';
import DataTableEncuestas from '../../../components/admin/encuestas/DataTableEncuestas';
import FormEncuesta from '../../../components/admin/encuestas/FormEncuesta';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useEncuestas from '../../../hooks/useEncuestas';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import { useSelector } from 'react-redux';

function EncuestasPage() {

    const rol = useSelector((state) => state.credenciales.Rol);
    const { titulo, lista, loading, openModal, tituloModal, encuesta,
        handleChange, handleSubmit, toggleModal, cargarEncuesta, handleUpdate, handleDelete } = useEncuestas();
    const handler = encuesta.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuSencillo toggleModal={toggleModal} noBuscar={true} />
                <DataTableEncuestas data={lista} loading={loading} editar={cargarEncuesta} eliminar={handleDelete} rol={rol} />
                {/* Ventana para agregar y editar */}
                <VentanaModal size={'5xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormEncuesta encuesta={encuesta} handleChange={handleChange} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default EncuestasPage