import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { changeStatus, createAdmin, deleteAdmin, getAdmins, updateAdmin } from '../services/AdminsService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useAdministradores() {

    let lista = [];
    const titulo = 'Administradores';
    const [openModal, setOpenModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');
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

    /*=========== Recargar ==============================*/

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

    /*=========== Agregar ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setAdmin({
            ...admin,
            [target.name]: target.value
        });
    };

    const handleSubmit = async (e) => {
        try {
            if (admin.Nombre === "" || admin.Apellidos === "" || admin.Correo === "" || admin.Telefono === "" || admin.Estado === null) {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            setLoading(true);
            const data = await createAdmin(admin);
            setLoading(false);
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

    /*=========== Consultar ==============================*/

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

    useEffect(() => {
        getListadoAdmins();
    }, []);

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterAdmin = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreNormalizado = normalizeText(`${dato.admin.Nombre} ${dato.admin.Apellidos}`);

            return palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra)
            );
        });
    };

    if (!busqueda) {
        lista = administradores;
    } else {
        lista = filterAdmin(administradores, busqueda);
    }

    /*=========== Actualizar ==============================*/

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
            setLoading(true);
            const data = await updateAdmin(admin, admin.user_id);
            setLoading(false);
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

    /*=========== Cambiar estado ==============================*/

    const changeState = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere cambiar el estado de este admin?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cambiar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await changeStatus(id);
                    if (data.status) {
                        alertSucces("Cambiado correctamente");
                        await getListadoAdmins();
                    } else {
                        alertWarning("No se pudo cambiar el estado.");
                    }
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    }

    /*=========== Eliminar ==============================*/

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

    return {
        titulo, loading, admin, tituloModal, openModal, lista,
        handleChange, handleSubmit, toggleModal, handleUpdate, handleDelete, cargar, handleBusqueda, changeState
    };
}

export default useAdministradores;