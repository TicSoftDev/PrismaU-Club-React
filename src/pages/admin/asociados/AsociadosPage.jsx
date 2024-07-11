import React from 'react';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableAsociado from '../../../components/admin/asociados/DataTableAsociado';
import FormAsociados from '../../../components/admin/asociados/FormAsociados';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import MenuAsociados from '../../../components/admin/asociados/MenuAsociados';
import useAsociados from '../../../hooks/useAsociados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AsociadosPage() {

    const { titulo, titulo2, tituloModal, openModal, lista, busqueda, asociado, loading, tituloModalImage, openModalImage,
        openModalEstado, touched, estado,
        handleChangeEstado, toggleModalEstado, handleUpdateEstado, cargarAsociado, handleUpdate, handleSubmit, handleBusqueda,
        cambiarEstado, toggleModalImage, cargarImagen, handleUpdateImage, handleChangeImagen, toggleModal, handleChange,
        eliminarAsociado, setEstadoFiltro
    } = useAsociados();
    const handler = asociado.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuAsociados data={lista} busqueda={busqueda} titulo={titulo} handleBusqueda={handleBusqueda}
                    toggleModal={toggleModal} filtro={setEstadoFiltro} />
                <DataTableAsociado cargarAsociado={cargarAsociado} usuarios={lista} eliminar={eliminarAsociado}
                    change={cambiarEstado} loading={loading} cargar={cargarImagen} />
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
                    <FormMotivo estado={estado} handleChangeEstado={handleChangeEstado} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default AsociadosPage;