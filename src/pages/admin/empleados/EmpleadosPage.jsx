import React from 'react';
import Plantilla from '../../../components/layouts/Plantilla';
import TituloPage from '../../../utilities/helpers/TituloPage';
import Container from '../../../utilities/helpers/Container';
import VentanaModal from '../../../utilities/modals/VentanaModal';
import FormEmpleados from '../../../components/admin/empleados/FormEmpleados';
import useEmpleado from '../../../hooks/useEmpleado';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import FormImagenAdherente from '../../../components/admin/adherentes/FormImagenAdherente';
import DataTableEmpleados from '../../../components/admin/empleados/DataTableEmpleados';

function EmpleadosPage() {

    const { titulo, tituloModal, openModal, lista, busqueda, empleado, loading, openModalImage, tituloModalImage,
        toggleModal, handleChange, handleSubmit, handleBusqueda, cargarEmpleado, handleUpdate, eliminarEmpleado,
        handleChangeImagen, handleUpdateImage, toggleModalImage, cargarImagen
    } = useEmpleado();
    const handler = empleado.id ? handleUpdate : handleSubmit;

    return (
        <Plantilla>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda} 
                entidad={true} titulo={titulo} data={lista} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormEmpleados empleado={empleado} hanleChange={handleChange} />
                </VentanaModal>
                <DataTableEmpleados cargarEmpleado={cargarEmpleado} usuarios={lista} eliminar={eliminarEmpleado}
                    cargar={cargarImagen} loading={loading} />
                <VentanaModal size={'2xl'} titulo={tituloModalImage} openModal={openModalImage} cerrarModal={toggleModalImage}
                    hanleSubmit={handleUpdateImage}>
                    <FormImagenAdherente handleChangeImage={handleChangeImagen} />
                </VentanaModal>
            </Container>
        </Plantilla>
    );
}

export default EmpleadosPage;