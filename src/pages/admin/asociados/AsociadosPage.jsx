import React from 'react';
import { useSelector } from 'react-redux';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableAsociado from '../../../components/admin/asociados/DataTableAsociado';
import FormAsociados from '../../../components/admin/asociados/FormAsociados';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import MenuAsociados from '../../../components/admin/asociados/MenuAsociados';
import useAsociados from '../../../hooks/useAsociados';
import useUsuario from '../../../hooks/useUsuario';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AsociadosPage() {

    const rol = useSelector((state) => state.credenciales.Rol);
    const { titulo, titulo2, tituloModal, openModal, lista, busqueda, asociado, loading, tituloModalImage, openModalImage,
        openModalEstado, touched,
        handleChangeEstado, toggleModalEstado, handleUpdateEstado, cargarAsociado, handleUpdate, handleSubmit, handleBusqueda,
        cambiarEstado, toggleModalImage, cargarImagen, handleUpdateImage, handleChangeImagen, toggleModal, handleChange,
        eliminarAsociado, setEstadoFiltro
    } = useAsociados();
    const { resetearPassword } = useUsuario();
    const handler = asociado.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuAsociados data={lista} busqueda={busqueda} titulo={titulo} handleBusqueda={handleBusqueda}
                    toggleModal={toggleModal} filtro={setEstadoFiltro} />
                <DataTableAsociado cargarAsociado={cargarAsociado} usuarios={lista} eliminar={eliminarAsociado}
                    change={cambiarEstado} loading={loading} cargar={cargarImagen} rol={rol} reset={resetearPassword} />
                {/* Ventana para agregar y editar */}
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormAsociados asociado={asociado} hanleChange={handleChange} touched={touched} />
                </VentanaModal>
                {/* Ventana para cambiar imagen */}
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage} loading={loading}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
                {/* Ventana para cambiar estado */}
                <VentanaModal size={'4xl'} titulo={titulo2} openModal={openModalEstado} cerrarModal={toggleModalEstado}
                    hanleSubmit={handleUpdateEstado} loading={loading}>
                    <FormMotivo handleChangeEstado={handleChangeEstado} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default AsociadosPage;