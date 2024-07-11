import React from 'react';
import DataTableAdherente from '../../../components/admin/adherentes/DataTableAdherente';
import FormAdherentes from '../../../components/admin/adherentes/FormAdherentes';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import MenuAsociados from '../../../components/admin/adherentes/MenuAsociados';
import FormMotivo from '../../../components/admin/asociados/FormMotivo';
import useAdherente from '../../../hooks/useAdherente';
import useAsociados from '../../../hooks/useAsociados';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import { useSelector } from 'react-redux';

function AdherentesPage() {

    const rol = useSelector((state) => state.credenciales.Rol);
    const { titulo, tituloModal, openModal, lista, busqueda, adherente, loading, tituloModalImage, openModalImage,
        titulo3, openModalEstado, touched, titulo5, openModalRetirar,
        toggleModalEstado, handleChangeEstado, handleUpdateEstado, handleSelectChange, goInactivos, cambiarEstado,
        cambiarAsociado, toggleModal, handleChange, handleSubmit, handleBusqueda, handleUpdate, handleChangeImagen,
        cargarAdherente, eliminarAdherente, toggleModalImage, cargarImagen, handleUpdateImage, goRetirados, retirar,
        toggleModalRetirar, handleUpdateRetirar
    } = useAdherente();
    const handler = adherente.id ? handleUpdate : handleSubmit;
    const { lista: socio } = useAsociados();

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuAsociados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda}
                    go={goInactivos} data={lista} titulo={titulo} retirados={goRetirados} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormAdherentes socio={socio} adherente={adherente} hanleChange={handleChange}
                        handleChangeSelect={handleSelectChange} touched={touched} />
                </VentanaModal>
                <DataTableAdherente cargarAdherente={cargarAdherente} usuarios={lista} eliminar={eliminarAdherente} loading={loading}
                    change={cambiarEstado} cambiar={cambiarAsociado} cargar={cargarImagen} retirar={retirar} rol={rol} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage} loading={loading}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
                <VentanaModal size={'4xl'} titulo={titulo3} openModal={openModalEstado} cerrarModal={toggleModalEstado}
                    hanleSubmit={handleUpdateEstado} loading={loading}>
                    <FormMotivo handleChangeEstado={handleChangeEstado} />
                </VentanaModal>
                <VentanaModal size={'4xl'} titulo={titulo5} openModal={openModalRetirar} cerrarModal={toggleModalRetirar}
                    hanleSubmit={handleUpdateRetirar} loading={loading}>
                    <FormMotivo handleChangeEstado={handleChangeEstado} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default AdherentesPage;