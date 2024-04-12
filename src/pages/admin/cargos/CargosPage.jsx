import React from 'react';
import DataTableCargos from '../../../components/admin/cargos/DataTableCargos';
import FormCargo from '../../../components/admin/cargos/FormCargo';
import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import useCargos from '../../../hooks/useCargos';
import Container from '../../../utilities/helpers/Container';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function CargosPage() {

    const { titulo, tituloModal, cargos, loading, cargo, openModal,
        handleChange, handleSubmit, toggleModal, cargar, handleDelete, handleUpdate } = useCargos();
    const handler = cargo.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <Container>
                <MenuEmpleados toggleModal={toggleModal} />
                <VentanaModal size={'2xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}>
                    <FormCargo cargo={cargo} hanleChange={handleChange} />
                </VentanaModal>
                <DataTableCargos loading={loading} data={cargos} cargar={cargar} eliminar={handleDelete} />
            </Container>
        </>
    );
}

export default CargosPage;