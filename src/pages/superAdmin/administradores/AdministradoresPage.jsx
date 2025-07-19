import MenuEmpleados from '../../../components/admin/empleados/MenuEmpleados';
import FormAdmin from '../../../components/superAdmin/administradores/FormAdmin';
import FormClave from '../../../components/superAdmin/administradores/FormClave';
import useAdministradores from '../../../hooks/useAdministradores';
import AdministradoresColumns from '../../../models/columns/AdministradoresColumns';
import DataTableComponent from '../../../utilities/dataTable/DataTableComponent';
import Contenido from '../../../utilities/helpers/Contenido';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

function AdministradoresPage() {

    const { titulo, tituloModal, openModal, lista, busqueda, admin, isLoading, isCreating, isUpdating, usuario,
        handleChange, handleSubmit, toggleModal, cargar, handleDelete, handleUpdate, handleBusqueda, changeState,
        openModalClave, loading, handleChangeClave, cargarUser, toggleModalClave, cambiarClave } = useAdministradores();
    const handler = admin.id ? handleUpdate : handleSubmit;
    const loading2 = admin.id ? isUpdating : isCreating;
    const columns = AdministradoresColumns(cargar, handleDelete, changeState, cargarUser);
    return (
        <>
            <TituloPage titulo={titulo} />
            <Contenido>
                <MenuEmpleados toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda}
                    entidad={true} titulo={titulo} data={lista} />
                <DataTableComponent columns={columns} data={lista} loading={isLoading} />
                <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                    hanleSubmit={handler} loading={loading2}>
                    <FormAdmin admin={admin} hanleChange={handleChange} />
                </VentanaModal>
                <VentanaModal size={'xl'} titulo={'Cambiar Clave'} openModal={openModalClave} cerrarModal={toggleModalClave}
                    hanleSubmit={cambiarClave} loading={loading}>
                    <FormClave usuario={usuario} hanleChange={handleChangeClave} />
                </VentanaModal>
            </Contenido>
        </>
    );
}

export default AdministradoresPage;