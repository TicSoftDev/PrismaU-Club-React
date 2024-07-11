import React from 'react';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import DataTableAdmins from '../../../components/superAdmin/administradores/DataTableAdmins';
import FormAdmin from '../../../components/superAdmin/administradores/FormAdmin';
import useAdministradores from '../../../hooks/useAdministradores';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AdministradoresPage() {

    const { titulo, tituloModal, openModal, lista, busqueda, loading, admin,
        handleChange, handleSubmit, toggleModal, cargar, handleDelete, handleUpdate, handleBusqueda, changeState
    } = useAdministradores();
    const handler = admin.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda}
                    entidad={true} titulo={titulo} data={lista} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading}>
                    <FormAdmin admin={admin} hanleChange={handleChange} />
                </VentanaModal>
                <DataTableAdmins loading={loading} cargarAdmin={cargar} data={lista} eliminar={handleDelete}
                    change={changeState} />
            </Container>
        </>
    );
}

export default AdministradoresPage;