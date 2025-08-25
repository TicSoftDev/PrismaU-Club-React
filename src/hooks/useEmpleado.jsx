import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createEmpleado, deleteEmpleado, getEmpleados, updateEmpleado, updateImageEmpleado } from '../services/EmpleadosService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useEmpleado() {

    const titulo = 'Empleados';
    let lista = [];
    const [touched, setTouched] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [listadoEmpleados, setListadoEmpleados] = useState([]);
    const [empleado, setEmpleado] = useState({
        Nombre: "",
        Apellidos: "",
        Correo: "",
        Telefono: "",
        FechaNacimiento: "",
        LugarNacimiento: "",
        TipoDocumento: "",
        Documento: "",
        Sexo: "",
        DireccionResidencia: "",
        CiudadResidencia: "",
        EstadoCivil: "",
        Cargo: "",
        Estado: null,
        Rol: ""
    });
    const [imagen, setImagen] = useState(null);
    const tituloModal = empleado.id ? "Actualizar Empleado" : "Crear Empleado";
    const tituloModalImage = "Actualizar Imagen";

    const recargar = () => {
        setEmpleado({
            Nombre: "",
            Apellidos: "",
            Correo: "",
            Telefono: "",
            FechaNacimiento: "",
            LugarNacimiento: "",
            TipoDocumento: "",
            Documento: "",
            Sexo: "",
            DireccionResidencia: "",
            CiudadResidencia: "",
            EstadoCivil: "",
            Cargo: "",
            Estado: "",
            Rol: ""
        });
        setTouched(false);
    };

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setTouched(true);
            setLoading(true);
            const data = await createEmpleado(empleado);
            setLoading(false);
            if (data.status) {
                toggleModal();
                alertSucces(data.message);
                await getListadoEmpleados();
            } else {
                data.errors.forEach((err) => alertWarning(err));
            }
        } catch (error) {
            setLoading(false);
            alertError("Ocurrió un error al crear el empleado: " + error.message);
        }
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setEmpleado((prev) => {
            const parsedValue = name === "Rol" ? Number(value) : value;
            const updated = { ...prev, [name]: parsedValue };
            if (name === "Rol" && Number(value) === 6) {
                updated.Cargo = "Portero"
            } else if (name === "Rol" && Number(value) !== 6) {
                updated.Cargo = ""
            }
            return updated;
        });
    };

    const getListadoEmpleados = async () => {
        try {
            setLoading(true);
            const data = await getEmpleados();
            setLoading(false);
            setListadoEmpleados(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const cargarEmpleado = async (empleado) => {
        setEmpleado(empleado);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setTouched(true);
            setLoading(true);
            const resultado = await updateEmpleado(empleado, empleado.user_id);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces(resultado.message);
                await getListadoEmpleados();
            } else {
                resultado.errors.forEach((err) => alertWarning(err));
            }
        } catch (error) {
            setLoading(false);
            alertError("Ocurrió un error al crear el empleado: " + error.message);
        }
    };

    const eliminarEmpleado = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este usuario?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteEmpleado(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await getListadoEmpleados();
                    } else {
                        alertWarning("No se pudo eliminar");
                    }
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    };

    const toggleModalImage = () => {
        setOpenModalImage(!openModalImage);
    }

    const cargarImagen = async (id) => {
        empleado.id = id;
        setOpenModalImage(true);
    }

    const handleChangeImagen = (event) => {
        const file = event.target.files[0];
        setImagen(file);
    };

    const handleUpdateImage = async (e) => {
        try {
            e.preventDefault();
            if (imagen === null) {
                alertWarning("Por favor, selecciona una imagen");
                return;
            }
            const formData = new FormData();
            formData.append('imagen', imagen);
            setLoading(true);
            const resultado = await updateImageEmpleado(formData, empleado.id);
            setLoading(false);
            if (resultado.message === 'hecho') {
                toggleModalImage();
                alertSucces("Imagen actualizada correctamente");
                await getListadoEmpleados();
            } else {
                alertWarning("No se pudo actualizar la imagen");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            alertError("No se pudo conectar al servidor");
        }
    }

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterEmpleados = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreNormalizado = normalizeText(`${dato.Nombre} ${dato.Apellidos}`);
            const documentoNormalizado = normalizeText(dato.Documento);

            return palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || documentoNormalizado.includes(palabra)
            );
        });
    };

    if (!busqueda) {
        lista = listadoEmpleados;
    } else {
        lista = filterEmpleados(listadoEmpleados, busqueda);
    }

    useEffect(() => {
        getListadoEmpleados();
    }, []);

    return {
        titulo, tituloModal, openModal, empleado, lista, busqueda, loading, openModalImage, tituloModalImage, touched,
        toggleModal, handleChange, handleBusqueda, handleSubmit, cargarEmpleado, handleUpdate, eliminarEmpleado,
        toggleModalImage, cargarImagen, handleUpdateImage, handleChangeImagen
    };
}

export default useEmpleado;