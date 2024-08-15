import { Tabs } from "flowbite-react";
import React from 'react';
import { FaCheck, FaList } from "react-icons/fa";
import MenuSencillo from "../../../components/layouts/menu/MenuSencillo";
import CardMenusRol from "../../../components/superAdmin/roles/CardMenusRol";
import CardsRoles from '../../../components/superAdmin/roles/CardsRoles';
import DataTableMenus from "../../../components/superAdmin/roles/DataTableMenus";
import FormAsignarMenu from "../../../components/superAdmin/roles/FormAsignarMenu";
import FormMenu from "../../../components/superAdmin/roles/FormMenu";
import useMenu from "../../../hooks/useMenu";
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from "../../../utilities/modals/VentanaModal";
import Spinner from "../../../utilities/spinner/Spinner";
function RolesPage() {

    const { titulo, loading, menus, tituloModal, openModal, menu, menusRol, touched, openModalAsignar, menuRol, tituloModal2,
        toggleModal, handleSubmit, handleChange, cargarMenu, handleUpdate, handleDelete, consultarMenusRol,
        handleDeleteMenuRol, toggleModalAsignar, handleChangeAsignar, handleSubmitAsignar } = useMenu();
    const handler = menu.id ? handleUpdate : handleSubmit;

    return (
        <>
            <TituloPage titulo={titulo} />
            <CardsRoles consultar={consultarMenusRol} />
            <Tabs aria-label="Default tabs" variant="default" className="mt-4">
                <Tabs.Item active title="Asignados" icon={FaCheck}>
                    <div className="p-4 border-2 bg-white rounded-lg dark:border-gray-700 w-full">
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <Spinner />
                            </div>
                        ) : touched ? (
                            <>
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-lg p-2 mb-5 font-semibold text-gray-800">Menus habilitados</h2>
                                    <button
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-600"
                                        onClick={toggleModalAsignar}
                                    >
                                        Asignar
                                    </button>
                                </div>
                                {menusRol.length > 0 ? (
                                    <CardMenusRol menu={menusRol} eliminar={handleDeleteMenuRol} />
                                ) : (
                                    <div className="flex justify-center items-center h-32">
                                        <p className="text-center text-gray-500">No hay menús asignados.</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex justify-center items-center h-32">
                                <p className="text-center text-gray-500">Seleccione un rol</p>
                            </div>
                        )}
                    </div>
                    <VentanaModal
                        size={'2xl'}
                        titulo={tituloModal2}
                        openModal={openModalAsignar}
                        cerrarModal={toggleModalAsignar}
                        hanleSubmit={handleSubmitAsignar}
                        loading={loading}
                    >
                        <FormAsignarMenu handleChange={handleChangeAsignar} menu={menuRol} menus={menus} />
                    </VentanaModal>
                </Tabs.Item>

                <Tabs.Item title="Menus" icon={FaList}>
                    <div className="p-4 border-2 bg-white rounded-lg dark:border-gray-700 w-full">
                        <MenuSencillo noBuscar={true} toggleModal={toggleModal} />
                        <DataTableMenus data={menus} loading={loading} cargar={cargarMenu} eliminar={handleDelete} />
                        <VentanaModal size={'4xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
                            hanleSubmit={handler} loading={loading}>
                            <FormMenu handleChange={handleChange} menu={menu} />
                        </VentanaModal>
                    </div>
                </Tabs.Item>
            </Tabs>

        </>
    );
}

export default RolesPage;