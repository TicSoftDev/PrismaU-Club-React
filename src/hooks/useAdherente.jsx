import { useEffect, useState } from 'react';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';
import Swal from 'sweetalert2';
import { createPersonal, deletePersonal, updateImagePersonal, updatePersonal } from '../services/PersonalService';
import { changeStatusAdherente, changeToAsociado, getAdherentes, getAdherentesInactivos } from '../services/AdherentesService';
import { PrivateRoutes } from '../models/RutasModel';
import { useNavigate } from 'react-router-dom';

function useAdherente() {

    const titulo = 'Adherentes';
    const titulo2 = 'Adherentes Inactivos';
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
    const [listadoAdherentes, setListadoAdherentes] = useState([]);
    const [listadoAdherentesInactivos, setListadoAdherentesInactivos] = useState([]);
    const [adherente, setAdherente] = useState({
        asociado_id: null,
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
        Rol: 3
    });
    const [motivo, setMotivo] = useState({
        Motivo: ""
    });
    const [imagen, setImagen] = useState(null);
    const tituloModal = adherente.id ? "Actualizar adherente" : "Crear adherente";
    const tituloModalImage = "Actualizar Imagen";

    const goInactivos = async () => {
        navigate(PrivateRoutes.ADHERENTESINACTIVOS);
    };

    const goActivos = async () => {
        navigate(PrivateRoutes.ADHERENTES);
    };

    const recargar = () => {
        setAdherente({
            asociado_id: null,
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
            Rol: 3
        });
        setTouched(false);
    };

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const handleBusquedaInactivos = ({ target }) => {
        setBusquedaInactivo(target.value);
    };

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleSubmit = async (e) => {
        try {
            setTouched(true);
            if (adherente.asociado_id === null || adherente.Nombre === "" || adherente.Apellidos === "" || adherente.Documento === "" || adherente.TipoDocumento === "" || adherente.Correo === "" || adherente.Telefono === "" || adherente.Sexo === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            const data = await createPersonal(adherente);
            if (data.message === 'hecho') {
                toggleModal();
                alertSucces("Creado correctamente");
                await getListadoAdherentes();
                await getListadoAdherentesInactivos();
            } else if (data.message === 'error') {
                alertWarning("No se pudo crear el Adherente");
            }
        } catch (error) {
            if (error.message === 'Duplicado') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertError("Ocurrió un error al crear el adherente: " + error.message);
            }
        }
    };

    const handleSelectChange = (selectedOption) => {
        setAdherente(prev => ({
            ...prev,
            asociado_id: selectedOption.value
        }));
    };

    const handleChange = ({ target }) => {
        setAdherente({
            ...adherente,
            [target.name]: target.value
        });
    };

    const getListadoAdherentes = async () => {
        try {
            setLoading(true);
            const data = await getAdherentes();
            setListadoAdherentes(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const getListadoAdherentesInactivos = async () => {
        try {
            setLoading(true);
            const data = await getAdherentesInactivos();
            setListadoAdherentesInactivos(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const cargarAdherente = async (adherente) => {
        setAdherente(adherente);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            setTouched(true);
            if (adherente.asociado_id === null || adherente.Nombre === "" || adherente.Apellidos === "" || adherente.Documento === "" || adherente.TipoDocumento === "" || adherente.Correo === "" || adherente.Telefono === "" || adherente.Sexo === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            let id = adherente.id;
            delete adherente.id;
            e.preventDefault();
            const resultado = await updatePersonal(adherente, adherente.user_id);
            if (resultado.message === 'hecho') {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await getListadoAdherentes();
                await getListadoAdherentesInactivos();
            } else if (resultado.message === 'error') {
                adherente.id = id;
                alertWarning("No se pudo crear el Adherente");
            }
        } catch (error) {
            if (error.message === 'Duplicado') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertError("Ocurrió un error al crear el adherente: " + error.message);
            }
        }
    };

    const eliminarAdherente = async (id) => {
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
                        await getListadoAdherentes();
                        await getListadoAdherentesInactivos();
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
                    adherente.id = id;
                    setMotivo("");
                }
            });

        } catch (error) {
            alertWarning("Error al cambiar ", error.message)
        }
    }

    const handleUpdateEstado = async (e) => {
        try {
            e.preventDefault();
            const resultado = await changeStatusAdherente(adherente.id, motivo);
            if (resultado.message === "hecho") {
                toggleModalEstado();
                alertSucces("Se cambio correctamente");
                await getListadoAdherentes();
                await getListadoAdherentesInactivos();
            } else {
                alertWarning("No se pudo cambiar");
            }
        } catch (error) {
            alertError("No se pudo conectar al servidor");
        }
    }

    const cambiarAsociado = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere cambiar este Adherente a Asociado?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cambiar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await changeToAsociado(id);
                    if (resultado.message === "hecho") {
                        alertSucces("Se cambio correctamente");
                        await getListadoAdherentes();
                        await getListadoAdherentesInactivos();
                    } else {
                        alertWarning("No se pudo cambiar");
                    }
                }
            });
        } catch (error) {

        }
    };

    const toggleModalImage = () => {
        setOpenModalImage(!openModalImage);
    }

    const cargarImagen = async (id) => {
        adherente.id = id;
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
            const resultado = await updateImagePersonal(formData, adherente.id);
            if (resultado.message === 'hecho') {
                toggleModalImage();
                alertSucces("Imagen actualizada correctamente");
                await getListadoAdherentes();
                await getListadoAdherentesInactivos();

            } else {
                alertWarning("No se pudo actualizar la imagen");
            }
        } catch (error) {
            console.log(error);
            alertError("No se pudo conectar al servidor");
        }
    }

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    if (!busqueda) {
        lista = listadoAdherentes;
    } else {
        const busquedaNormalizada = normalizeText(busqueda);
        lista = listadoAdherentes.filter((dato) => {
            const nombreCompleto = normalizeText(`${dato.personal.Nombre} ${dato.personal.Apellidos}`);
            return nombreCompleto.includes(busquedaNormalizada) ||
                normalizeText(dato.personal.Documento).includes(busquedaNormalizada);
        });
    }

    if (!busquedaInactivo) {
        listaInactivo = listadoAdherentesInactivos;
    } else {
        const busquedaInactivosNormalizada = normalizeText(busquedaInactivo);
        listaInactivo = listadoAdherentesInactivos.filter((dato) => {
            const nombreCompletoInactivo = normalizeText(`${dato.personal.Nombre} ${dato.personal.Apellidos}`);
            return nombreCompletoInactivo.includes(busquedaInactivosNormalizada) ||
                normalizeText(dato.personal.Documento).includes(busquedaInactivosNormalizada);
        });
    }

    useEffect(() => {
        getListadoAdherentes();
        getListadoAdherentesInactivos();
    }, []);

    return {
        titulo, tituloModal, openModal, adherente, lista, busqueda, loading, listaInactivo, busquedaInactivo, titulo2,
        openModalImage, tituloModalImage, imagen, openModalEstado, motivo, titulo3, touched,
        toggleModal, handleChange, handleBusqueda, handleSubmit, cargarAdherente, handleUpdate, eliminarAdherente,
        goActivos, goInactivos, handleBusquedaInactivos, cambiarEstado, cambiarAsociado, toggleModalImage,
        cargarImagen, handleUpdateImage, handleChangeImagen, toggleModalEstado, handleUpdateEstado, handleChangeEstado,
        handleSelectChange

    };
}

export default useAdherente;