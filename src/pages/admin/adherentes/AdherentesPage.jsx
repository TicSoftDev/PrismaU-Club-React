import React from 'react';
import { useSelector } from 'react-redux';
import DataTableAdherente from '../../../components/admin/adherentes/DataTableAdherente';
import FormAdherentes from '../../../components/admin/adherentes/FormAdherentes';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import MenuAsociados from '../../../components/admin/asociados/MenuAsociados';
import useAdherente from '../../../hooks/useAdherente';
import useAsociados from '../../../hooks/useAsociados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AdherentesPage() {

    const rol = useSelector((state) => state.credenciales.Rol);
    const { titulo, titulo2, tituloModal, openModal, lista, busqueda, adherente, loading, tituloModalImage, openModalImage,
        openModalEstado, touched,
        handleChangeEstado, toggleModalEstado, handleUpdateEstado, handleSelectChange, cambiarEstado,
        cambiarAsociado, toggleModal, handleChange, handleSubmit, handleBusqueda, handleUpdate, handleChangeImagen,
        cargarAdherente, eliminarAdherente, toggleModalImage, cargarImagen, handleUpdateImage, setEstadoFiltro
    } = useAdherente();
    const handler = adherente.id ? handleUpdate : handleSubmit;
    const { lista: socio } = useAsociados();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuAsociados data={lista} busqueda={busqueda} titulo={titulo} handleBusqueda={handleBusqueda}
                    toggleModal={toggleModal} filtro={setEstadoFiltro} />
                <DataTableAdherente cargarAdherente={cargarAdherente} usuarios={lista} eliminar={eliminarAdherente} loading={loading}
                    change={cambiarEstado} cambiar={cambiarAsociado} cargar={cargarImagen} rol={rol} />
                {/* Ventana para agregar y editar */}
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormAdherentes socio={socio} adherente={adherente} hanleChange={handleChange} touched={touched}
                        handleChangeSelect={handleSelectChange} />
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

export default AdherentesPage;