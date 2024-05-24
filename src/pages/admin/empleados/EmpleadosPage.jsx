import React from 'react';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableEmpleados from '../../../components/admin/empleados/DataTableEmpleados';
import FormEmpleados from '../../../components/admin/empleados/FormEmpleados';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import useEmpleado from '../../../hooks/useEmpleado';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function EmpleadosPage() {

    const { titulo, tituloModal, openModal, lista, busqueda, empleado, loading, openModalImage, tituloModalImage, touched,
        toggleModal, handleChange, handleSubmit, handleBusqueda, cargarEmpleado, handleUpdate, eliminarEmpleado,
        handleChangeImagen, handleUpdateImage, toggleModalImage, cargarImagen
    } = useEmpleado();
    const handler = empleado.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda}
                    entidad={true} titulo={titulo} data={lista} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} 
                hanleSubmit={handler} loading={loading}>
                    <FormEmpleados touched={touched} empleado={empleado} hanleChange={handleChange} />
                </VentanaModal>
                <DataTableEmpleados cargarEmpleado={cargarEmpleado} usuarios={lista} eliminar={eliminarEmpleado}
                    cargar={cargarImagen} loading={loading} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage} loading={loading}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
            </Container>
        </>
    );
}

export default EmpleadosPage;