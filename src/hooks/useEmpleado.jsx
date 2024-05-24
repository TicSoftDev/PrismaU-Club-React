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
            if (empleado.Nombre === "" || empleado.Apellidos === "" || empleado.Documento === "" || empleado.TipoDocumento === "" || empleado.Correo === "" || empleado.Telefono === "" || empleado.FechaNacimiento === "" || empleado.LugarNacimiento === "" || empleado.Sexo === "" || empleado.DireccionResidencia === "" || empleado.CiudadResidencia === "" || empleado.Cargo === "" || empleado.Estado === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            setLoading(true);
            const data = await createEmpleado(empleado);
            setLoading(false);
            if (data.status) {
                toggleModal();
                alertSucces("Creado correctamente");
                await getListadoEmpleados();
            } else if (data.status === false && data.message === 'Existe') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertWarning("No se pudo crear el Empleado");
            }
        } catch (error) {
            setLoading(false);
            alertError("Ocurrió un error al crear el empleado: " + error.message);
        }
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        const updatedEmpleado = {
            ...empleado,
            [name]: value
        };
        if (name === 'Rol' && value === '6') {
            updatedEmpleado.Cargo = 'Portero';
        } else if (name === 'Rol' && value !== '6') {
            updatedEmpleado.Cargo = '';
        }
        setEmpleado(updatedEmpleado);
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
        setEmpleado({
            ...empleado,
            Rol: empleado.Cargo === 'Portero' ? '6' : '4'
        });
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            setTouched(true);
            if (empleado.Nombre === "" || empleado.Apellidos === "" || empleado.Documento === "" || empleado.TipoDocumento === "" || empleado.Correo === "" || empleado.Telefono === "" || empleado.FechaNacimiento === "" || empleado.LugarNacimiento === "" || empleado.Sexo === "" || empleado.DireccionResidencia === "" || empleado.CiudadResidencia === "" || empleado.Cargo === "" || empleado.Estado === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            e.preventDefault();
            setLoading(true);
            const resultado = await updateEmpleado(empleado, empleado.user_id);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await getListadoEmpleados();
            } else if (resultado.status === false && resultado.message === 'Existe') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
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