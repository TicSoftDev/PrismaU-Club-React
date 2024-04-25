import { useEffect, useState } from 'react';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';
import { changeStatusAsociado, getAsociados, getAsociadosInactivos } from '../services/AsociadosService';
import Swal from 'sweetalert2';
import { createPersonal, deletePersonal, updateImagePersonal, updatePersonal } from '../services/PersonalService';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../models/RutasModel';

function useAsociados() {

    const titulo = 'Asociados';
    const titulo2 = 'Asociados Inactivos';
    const titulo3 = 'Cambio de estado';
    let lista = [];
    let listaInactivo = [];
    const navigate = useNavigate();
    const [touched, setTouched] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEstado, setOpenModalEstado] = useState(false);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [busquedaInactivo, setBusquedaInactivo] = useState('');
    const [listadoAsociados, setListadoAsociados] = useState([]);
    const [listadoAsociadosInactivos, setListadoAsociadosInactivos] = useState([]);
    const [asociado, setAsociado] = useState({
        imagen: null,
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
        TiempoResidencia: "",
        EstadoCivil: "",
        Profesion: "",
        Trabajo: "",
        Cargo: "",
        TiempoServicio: "",
        TelOficina: "",
        DireccionOficina: "",
        CiudadOficina: "",
        Estado: "",
        Rol: 2
    });
    const [motivo, setMotivo] = useState({
        Motivo: ""
    });
    const [imagen, setImagen] = useState(null);
    const tituloModal = asociado.id ? "Actualizar asociado" : "Crear asociado";
    const tituloModalImage = "Actualizar Imagen";

    const goInactivos = async () => {
        navigate(PrivateRoutes.ASOCIADOSINACTIVOS);
    };

    const goActivos = async () => {
        navigate(PrivateRoutes.ASOCIADOS);
    };

    const recargar = () => {
        setAsociado({
            imagen: null,
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
            TiempoResidencia: "",
            EstadoCivil: "",
            Profesion: "",
            Trabajo: "",
            Cargo: "",
            TiempoServicio: "",
            TelOficina: "",
            DireccionOficina: "",
            CiudadOficina: "",
            Rol: 2
        });
        setTouched(false);
    };

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const handleBusquedaInactivo = ({ target }) => {
        setBusquedaInactivo(target.value);
    };

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleSubmit = async (e) => {
        try {
            setTouched(true);
            if (asociado.Nombre === "" || asociado.Apellidos === "" || asociado.Documento === "" || asociado.TipoDocumento === "" || asociado.Correo === "" || asociado.Telefono === "" || asociado.Sexo === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            const data = await createPersonal(asociado);
            if (data.message === 'hecho') {
                alertSucces("Creado correctamente");
                await getListadoAsociados();
                await getListadoAsociadosInactivos();
                toggleModal();
            } else if (data.message === 'error') {
                alertWarning("No se pudo crear el Asociado");
            }
        } catch (error) {
            if (error.message === 'Duplicado') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertError("Ocurrió un error al crear el asociado: " + error.message);
            }
        }
    };

    const handleChange = ({ target }) => {
        setAsociado({
            ...asociado,
            [target.name]: target.value
        });
    };

    const getListadoAsociadosInactivos = async () => {
        try {
            setLoading(true);
            const data = await getAsociadosInactivos();
            setLoading(false);
            setListadoAsociadosInactivos(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const getListadoAsociados = async () => {
        try {
            setLoading(true);
            const data = await getAsociados();
            setLoading(false);
            setListadoAsociados(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const cargarAsociado = async (asociado) => {
        setAsociado(asociado);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            setTouched(true);
            if (asociado.Nombre === "" || asociado.Apellidos === "" || asociado.Documento === "" || asociado.TipoDocumento === "" || asociado.Correo === "" || asociado.Telefono === "" || asociado.Sexo === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            let id = asociado.id;
            delete asociado.id;
            e.preventDefault();
            const resultado = await updatePersonal(asociado, asociado.user_id);
            if (resultado.message === 'hecho') {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await getListadoAsociados();
                await getListadoAsociadosInactivos();
            } else if (resultado.message === 'error') {
                asociado.id = id;
                alertWarning("No se pudo actualizar el Asociado");
            }
        } catch (error) {
            if (error.message === 'Duplicado') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertError("Ocurrió un error al crear el asociado: " + error.message);
            }
        }
    };

    const eliminarAsociado = async (id) => {
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
                    const resultado = await deletePersonal(id);
                    if (resultado.message === "hecho") {
                        alertSucces("Eliminado correctamente");
                        await getListadoAsociados();
                        await getListadoAsociadosInactivos();
                    } else {
                        alertWarning("No se pudo eliminar");
                    }
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    };

    const handleChangeEstado = ({ target }) => {
        setMotivo({
            ...motivo,
            [target.name]: target.value
        });
    };

    const toggleModalEstado = () => {
        setOpenModalEstado(!openModalEstado);
    }

    const cambiarEstado = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere cambiar el estado de este usuario?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cambiar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    toggleModalEstado();
                    asociado.id = id;
                    setMotivo("");
                }
            });

        } catch (error) {
            alertWarning("Error al cambiar ", error.message)
        }
    }

    const toggleModalImage = () => {
        setOpenModalImage(!openModalImage);
    }

    const handleUpdateEstado = async (e) => {
        try {
            e.preventDefault();
            const resultado = await changeStatusAsociado(asociado.id, motivo);
            if (resultado.message === "hecho") {
                toggleModalEstado();
                alertSucces("Se cambio correctamente");
                await getListadoAsociados();
                await getListadoAsociadosInactivos();
            } else {
                alertWarning("No se pudo cambiar");
            }
        } catch (error) {
            alertError("No se pudo conectar al servidor");
        }
    }

    const cargarImagen = async (id) => {
        asociado.id = id;
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
            const resultado = await updateImagePersonal(formData, asociado.id);
            if (resultado.message === 'hecho') {
                toggleModalImage();
                alertSucces("Imagen actualizada correctamente");
                await getListadoAsociados();
                await getListadoAsociadosInactivos();

            } else {
                alertWarning("No se pudo actualizar la imagen");
            }
        } catch (error) {
            alertError("No se pudo conectar al servidor");
        }
    }

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };
    
    const filterAsociados = (listado, busqueda) => {
        if (!busqueda) return listado;
        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);
    
        return listado.filter((dato) => {
            const nombreNormalizado = normalizeText(`${dato.personal.Nombre} ${dato.personal.Apellidos}`);
            return palabrasBusqueda.every(palabra => nombreNormalizado.includes(palabra));
        });
    };

    if (!busqueda) {
        lista = listadoAsociados;
    } else {
        lista = filterAsociados(listadoAsociados, busqueda);
    }

    if (!busquedaInactivo) {
        listaInactivo = listadoAsociadosInactivos;
    } else {
        listaInactivo = filterAsociados(listadoAsociadosInactivos, busquedaInactivo);
    }

    useEffect(() => {
        getListadoAsociados();
        getListadoAsociadosInactivos();

    }, []);

    return {
        titulo, titulo2, tituloModal, openModal, asociado, lista, busqueda, loading, busquedaInactivo, listaInactivo,
        openModalImage, tituloModalImage, imagen, openModalEstado, motivo, titulo3, touched, handleUpdateEstado,
        goInactivos, toggleModal, handleChange, handleSubmit, handleBusqueda, cargarAsociado, handleUpdate, toggleModalImage,
        eliminarAsociado, handleBusquedaInactivo, goActivos, cambiarEstado, cargarImagen, handleUpdateImage, handleChangeImagen,
        handleChangeEstado, toggleModalEstado
    };
}

export default useAsociados;