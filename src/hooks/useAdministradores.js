import { useState } from "react";
import Swal from "sweetalert2";
import apiQueryAdministradores from "../api/apiQueryAdministradores";
import { normalizeText } from "../models/FormateadorModel";
import { alertError, alertSucces, alertWarning } from "../utilities/alerts/Alertas";

function useAdministradores() {
    let lista = [];
    const titulo = "Administradores";
    const [openModal, setOpenModal] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [admin, setAdmin] = useState({
        Nombre: "",
        Apellidos: "",
        Documento: "",
        Clave: "",
        Correo: "",
        Telefono: "",
        Rol: 1,
    });
    const tituloModal = admin.id ? "Editar Administrador" : "Crear Administrador";
    const { admins, isLoading, isCreating, isUpdating, cambiarEstadoMutation,
        createAdminMutation, actualizarAdminMutation, eliminarAdminMutation } = apiQueryAdministradores(setOpenModal);

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setAdmin({
            Nombre: "",
            Apellidos: "",
            Documento: "",
            Clave: "",
            Correo: "",
            Telefono: "",
            Rol: 1,
        });
    };

    /*=========== Agregar ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    };

    const handleChange = ({ target }) => {
        setAdmin({
            ...admin,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (admin.Nombre === "" || admin.Apellidos === "" || admin.Correo === "" || admin.Telefono === "" || admin.Estado === null) {
            return alertWarning("Por favor, ingrese todos los campos");
        }
        createAdminMutation(admin, {
            onSuccess: (data) => {
                if (data.status) {
                    toggleModal();
                    alertSucces("Administrador creado con éxito");
                } else {
                    data.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (error) => { alertError(`Error al crear el administrador: ${error.message}`); },
        });
    };

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const filterAdmin = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreNormalizado = normalizeText(
                `${dato.admin.Nombre} ${dato.admin.Apellidos}`
            );

            return palabrasBusqueda.every((palabra) =>
                nombreNormalizado.includes(palabra)
            );
        });
    };

    lista = filterAdmin(admins, busqueda);

    /*=========== Actualizar ==============================*/

    const cargar = async (admin) => {
        setAdmin(admin);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        if (admin.Nombre === "" || admin.Apellidos === "" || admin.Correo === "" || admin.Telefono === "" || admin.Estado === null) {
            alertWarning("Por favor, ingrese todos los campos");
            return;
        }
        actualizarAdminMutation(admin, {
            onSuccess: () => {
                toggleModal();
                alertSucces("Admin actualizado correctamente");
            },
            onError: (error) => { alertError(`Error al actualizar el administrador: ${error.message}`); },
        });
    };

    /*=========== Cambiar estado ==============================*/

    const changeState = async (id) => {
        try {
            Swal.fire({
                title: "¿Seguro que quiere cambiar el estado de este admin?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, cambiar",
                cancelButtonText: "No, cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    cambiarEstadoMutation(id, {
                        onSuccess: () => alertSucces("Estado cambiado con éxito"),
                        onError: (error) => alertError(`Error al cambiar el estado: ${error.message}`),
                    });
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    };

    /*=========== Eliminar ==============================*/

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "¿Seguro que quiere eliminar este admin?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    eliminarAdminMutation(id, {
                        onSuccess: () => alertSucces("Administrador eliminado con éxito"),
                        onError: (error) => alertError(`Error al eliminar el administrador: ${error.message}`),
                    });
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    };

    return {
        titulo,
        admin,
        tituloModal,
        openModal,
        lista,
        isLoading,
        isCreating,
        isUpdating,
        handleChange,
        handleSubmit,
        toggleModal,
        handleUpdate,
        handleDelete,
        cargar,
        handleBusqueda,
        changeState,
    };
}

export default useAdministradores;
