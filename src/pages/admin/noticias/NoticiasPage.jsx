import React from 'react'
import TituloPage from '../../../utilities/helpers/TituloPage'
import Container from '../../../utilities/helpers/Container'
import useNoticia from '../../../hooks/useNoticia'
import DataTableNoticias from '../../../components/admin/noticias/DataTableNoticias';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import FormNoticias from '../../../components/admin/noticias/FormNoticias';
import { useSelector } from 'react-redux';

function NoticiasPage() {

    const rol = useSelector((state) => state.credenciales.Rol);
    const { titulo, lista, loading, tituloModal, openModal, noticia, touched, busqueda,
        toggleModal, handleChange, handleChangeImage, handleSubmit, cargarNoticia, handleUpdate, eliminarNoticia, handleBusqueda
    } = useNoticia();
    const handler = !noticia.id ? handleSubmit : handleUpdate;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda} data={lista}
                    titulo={titulo} />
                <DataTableNoticias data={lista} loading={loading} editar={cargarNoticia} eliminar={eliminarNoticia} rol={rol} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormNoticias hanleChange={handleChange} noticia={noticia} touched={touched} handleChangeImage={handleChangeImage} />
                </VentanaModal>
            </Container>
        </>
    )
}

export default NoticiasPage