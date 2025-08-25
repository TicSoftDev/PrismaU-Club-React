import React from 'react';
import Swal from 'sweetalert2';
import { createMenu, createMenuRol, deleteMenu, deleteMenuRol, getMenus, getMenusRol, updateMenu } from '../services/MenusService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useMenu() {

    const titulo = 'Roles';
    const [idRol, setIdRol] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalAsignar, setOpenModalAsignar] = React.useState(false);
    const [touched, setTouched] = React.useState(false);
    const [busqueda, setBusqueda] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [menus, setMenus] = React.useState([]);
    const [menusRol, setMenusRol] = React.useState([]);
    const [menu, setMenu] = React.useState({
        Name: '',
        Type: '',
        Route: '',
        Icon: '',
        Color: '',
        Estado: ''
    });
    const [menuRol, setMenuRol] = React.useState({
        menu_id: null,
        role_id: null,
    });
    const tituloModal = menu.id ? 'Actualizar menu' : 'Crear menu';
    const tituloModal2 = 'Asignar menu';

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setMenu({
            Name: '',
            Type: '',
            Route: '',
            Icon: '',
            Color: '',
            Estado: ''
        })
        setMenuRol({
            menu_id: null,
            role_id: null,
        })
        setBusqueda('');
        setLoading(false);
    }

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setMenu({
            ...menu,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!menu.Name || !menu.Type || !menu.Route || !menu.Icon || !menu.Color) {
            alertWarning("Por favor, ingrese todos los campos.");
            return;
        }
        setLoading(true);
        try {
            const data = await createMenu(menu);
            if (data.status && data.message === "hecho") {
                toggleModal();
                await consultarMenus();
                alertSucces("Creado correctamente");
            } else if (!data.status && data.message === "Existe") {
                alertWarning("Ya existe un menu con ese nombre");
            } else {
                alertWarning("No se pudo crear el menu");
            }
        } catch (error) {
            console.log("Menu", error.message);
            alertError("Crear menu: " + error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==============================*/

    const consultarMenus = async () => {
        setLoading(true);
        try {
            const data = await getMenus();
            setMenus(data);
        } catch (error) {
            console.log("menus", error.message);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        consultarMenus();
    }, []);

    /*=========== Buscar ==============================*/

    const consultarMenusRol = async (id) => {
        setTouched(true);
        setLoading(true);
        try {
            if (id) {
                setIdRol(id);
                const data = await getMenusRol(id);
                setMenusRol(data);
            }
        } catch (error) {
            console.log("menus", error.message);
        }
        setLoading(false);
    }

    /*=========== Actualizar ==============================*/

    const cargarMenu = (menu) => {
        setMenu(menu);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            if (!menu.Name || !menu.Type || !menu.Route || !menu.Icon || !menu.Color) {
                alertWarning("Por favor, ingrese todos los campos.");
                return;
            }
            setLoading(true);
            const resultado = await updateMenu(menu.id, menu);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await consultarMenus();
            } else {
                alertWarning("No se pudo actualizar el menu");
            }
        } catch (error) {
            console.log("Pregunta", error.message);
            alertError("Actualizar menu: " + error.message);
        }
    }

    /*=========== Eliminar ==============================*/

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este menu?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteMenu(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await consultarMenus();
                    } else {
                        alertWarning("No se pudo eliminar el menu");
                    }
                }
            });

        } catch (error) {
            console.log("Menu", error.message);
            alertError("Eliminar menu: " + error.message);
        }
    }

    /*=========== Asignar Menu ==============================*/

    const toggleModalAsignar = () => {
        setOpenModalAsignar(!openModalAsignar);
        recargar();
    }

    const handleChangeAsignar = ({ target }) => {
        setMenuRol({
            ...menuRol,
            role_id: idRol,
            [target.name]: target.value
        });
    }

    const handleSubmitAsignar = async (e) => {
        if (!menuRol.menu_id || !menuRol.role_id) {
            alertWarning("Por favor, ingrese todos los campos.");
            return;
        }
        e.preventDefault();
        setLoading(true);
        try {
            const data = await createMenuRol(menuRol);
            if (data.status) {
                toggleModalAsignar();
                alertSucces("Asignado correctamente");
                await consultarMenusRol(idRol);
                recargar();
            } else {
                alertWarning("No se pudo asignar el menu");
            }
        } catch (error) {
            console.log("Menu", error.message);
            alertError("Asignar menu: " + error.message);
        }
        setLoading(false);
    }

    /*=========== Eliminar Menu de Rol ==============================*/

    const handleDeleteMenuRol = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este menu de este rol?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteMenuRol(id, idRol);
                    if (resultado.status) {
                        setIdRol(idRol);
                        setTouched(true);
                        alertSucces("Se ha quitado el menu de este rol");
                        await consultarMenusRol(idRol);
                    } else {
                        alertWarning("No se pudo quitar el menu");
                    }
                }
            });
        } catch (error) {
            console.log("Pregunta", error.message);
            alertError("Eliminar menu: " + error.message);
        }
    }

    return {
        titulo, tituloModal, menu, loading, openModal, menus, busqueda, menusRol, touched, openModalAsignar, menuRol, tituloModal2,
        toggleModal, handleChange, handleSubmit, cargarMenu, handleUpdate, handleDelete, consultarMenusRol,
        handleDeleteMenuRol, toggleModalAsignar, handleChangeAsignar, handleSubmitAsignar
    }
}

export default useMenu