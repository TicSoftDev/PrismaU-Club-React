import React from 'react';
import { useSelector } from 'react-redux';
import DataTableNoticias from '../../../components/admin/noticias/DataTableNoticias';
import FormNoticias from '../../../components/admin/noticias/FormNoticias';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useNoticia from '../../../hooks/useNoticia';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function EventosPage() {

    const rol = useSelector((state) => state.credenciales.Rol);
    const { titulo, lista, loading, tituloModal, openModal, noticia, touched, busqueda,
        toggleModal, handleChange, handleChangeImage, handleSubmit, cargarNoticia, handleUpdate, eliminarNoticia,
        handleChangeCheck, handleBusqueda } = useNoticia();
    const handler = !noticia.id ? handleSubmit : handleUpdate;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuSencillo toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda} />
                <DataTableNoticias data={lista} loading={loading} editar={cargarNoticia} eliminar={eliminarNoticia} rol={rol} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormNoticias hanleChange={handleChange} noticia={noticia} touched={touched}
                        handleChangeCheck={handleChangeCheck} handleChangeImage={handleChangeImage} />
                </VentanaModal>
            </Container>
        </>
    )
}

export default EventosPage