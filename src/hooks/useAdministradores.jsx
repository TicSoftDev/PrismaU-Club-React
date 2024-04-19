import { useEffect, useState } from 'react';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';
import Swal from 'sweetalert2';
import { createAdmin, deleteAdmin, getAdmins, updateAdmin } from '../services/AdminsService';

function useAdministradores() {

    const titulo = 'Administradores';
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [administradores, setAdministradores] = useState([]);
    const [admin, setAdmin] = useState({
        Nombre: "",
        Apellidos: "",
        Documento: "",
        Clave: "",
        Correo: "",
        Telefono: "",
        Rol: 1
    });
    const tituloModal = admin.id ? 'Editar Administrador' : 'Crear Administrador';

    const recargar = () => {
        setAdmin({
            Nombre: "",
            Apellidos: "",
            Documento: "",
            Clave: "",
            Correo: "",
            Telefono: "",
            Rol: 1
        });
    };

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const getListadoAdmins = async () => {
        try {
            setLoading(true);
            let data = await getAdmins();
            setLoading(false);
            setAdministradores(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        try {
            if (admin.Nombre === "" || admin.Apellidos === "" || admin.Correo === "" || admin.Telefono === "" || admin.Estado === null) {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            const data = await createAdmin(admin);
            if (data.status) {
                alertSucces("Creado correctamente");
                recargar();
                toggleModal();
                await getListadoAdmins();
            } else {
                alertWarning("No se pudo crear.");
            }
        } catch (error) {
            if (error.message === 'Duplicado') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertError("Ocurrió un error al crear el administrador: " + error.message);
            }
        }
    };

    const handleChange = ({ target }) => {
        setAdmin({
            ...admin,
            [target.name]: target.value
        });
    };

    const cargar = async (admin) => {
        setAdmin(admin);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            if (admin.Nombre === "" || admin.Apellidos === "" || admin.Correo === "" || admin.Telefono === "" || admin.Estado === null) {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            const data = await updateAdmin(admin, admin.user_id);
            if (data.status) {
                alertSucces("Actualizado correctamente");
                toggleModal();
                recargar();
                await getListadoAdmins();
            } else {
                alertWarning("No se pudo actualizar.");
            }
        } catch (error) {
            if (error.message === 'Duplicado') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertError("Ocurrió un error al crear el administrador: " + error.message);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este admin?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await deleteAdmin(id);
                    if (data.status) {
                        alertSucces("Eliminado correctamente");
                        await getListadoAdmins();
                    } else {
                        alertWarning("No se pudo eliminar.");
                    }
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    };

    useEffect(() => {
        getListadoAdmins();
    }, []);

    return {
        titulo, loading, admin, tituloModal, openModal, administradores,
        handleChange, handleSubmit, toggleModal, handleUpdate, handleDelete, cargar
    };
}

export default useAdministradores;