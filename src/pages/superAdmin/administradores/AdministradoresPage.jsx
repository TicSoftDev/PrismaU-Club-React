import React from 'react';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import useAdministradores from '../../../hooks/useAdministradores';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import DataTableAdmins from '../../../components/superAdmin/administradores/DataTableAdmins';
import FormAdmin from '../../../components/superAdmin/administradores/FormAdmin';

function AdministradoresPage() {

    const { titulo, tituloModal, openModal, lista, busqueda, handleBusqueda, administradores, loading, admin,
        handleChange, handleSubmit, toggleModal, cargar, handleDelete, handleUpdate } = useAdministradores();
        const handler = admin.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda}
                    entidad={true} titulo={titulo} data={lista} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormAdmin admin={admin} hanleChange={handleChange} />
                </VentanaModal>
                <DataTableAdmins loading={loading} cargarAdmin={cargar} data={administradores} eliminar={handleDelete} />
            </Container>
        </>
    );
}

export default AdministradoresPage;