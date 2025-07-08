import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { changeStatusAsociado, createAsociado, deleteAsociado, getAsociados, updateAsociado, updateImage } from '../services/AsociadosService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useAsociados() {

    const titulo = 'Asociados';
    const titulo2 = 'Cambiar Estado';
    let lista = [];
    const [touched, setTouched] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEstado, setOpenModalEstado] = useState(false);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState('Todos');
    const [listadoAsociados, setListadoAsociados] = useState([]);
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
        Codigo: "",
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
    const [estado, setEstado] = useState({
        Estado: "",
        Motivo: ""
    });
    const [imagen, setImagen] = useState(null);
    const tituloModal = asociado.id ? "Actualizar asociado" : "Crear asociado";
    const tituloModalImage = "Actualizar Imagen";

    /*=========== Recargar ==============================*/

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
            Codigo: "",
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
        setEstado({
            Estado: "",
            Motivo: ""
        });
        setTouched(false);
    };

    /*=========== Agregar ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setAsociado({
            ...asociado,
            [target.name]: target.value
        });
    };

    const handleSubmit = async (e) => {
        try {
            setTouched(true);
            setLoading(true);
            const data = await createAsociado(asociado);
            setLoading(false);
            if (data.status) {
                toggleModal();
                alertSucces("Creado correctamente");
                await getListadoAsociados();
            } else {
                data.errors.forEach((err) => alertWarning(err));
            }
        } catch (error) {
            alertError("Ocurrió un error al crear el asociado: " + error.message);
        }
    };

    /*=========== Consultar ==============================*/

    const getListadoAsociados = async () => {
        try {
            setLoading(true);
            const data = await getAsociados();
            setLoading(false);
            setListadoAsociados(data);
        } catch (error) {
            setLoading(false);
            alertError("Ocurrio un error al cargar el listado de asociados " + error.message);
        }
    };

    useEffect(() => {
        getListadoAsociados();
    }, []);

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterAsociados = (listado, busqueda, estadoFiltro) => {
        if (!busqueda && estadoFiltro === 'Todos') return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreNormalizado = normalizeText(`${dato.Nombre} ${dato.Apellidos}`);
            const documentoNormalizado = normalizeText(dato.Documento);
            const cumpleBusqueda = palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || documentoNormalizado.includes(palabra)
            );
            const cumpleEstado = estadoFiltro === 'Todos' || dato.Estado.toString() === estadoFiltro;

            return cumpleBusqueda && cumpleEstado;
        });
    };

    if (!busqueda && estadoFiltro === 'Todos') {
        lista = listadoAsociados;
    } else {
        lista = filterAsociados(listadoAsociados, busqueda, estadoFiltro);
    }

    /*=========== Actualizar ==============================*/

    const cargarAsociado = async (asociado) => {
        setAsociado(asociado);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            setTouched(true);
            e.preventDefault();
            setLoading(true);
            const resultado = await updateAsociado(asociado, asociado.id);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await getListadoAsociados();
            } else {
                resultado.errors.forEach((err) => alertWarning(err));
            }
        } catch (error) {
            setLoading(false);
            alertError("Ocurrió un error al actualizar el asociado: " + error.message);
        }
    };

    /*=========== Cambiar estado ==============================*/

    const toggleModalEstado = () => {
        setOpenModalEstado(!openModalEstado);
    }

    const handleChangeEstado = ({ target }) => {
        setEstado({
            ...estado,
            [target.name]: target.value
        });
    };

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
                    setEstado({ Estado: "", Motivo: "" });
                }
            });

        } catch (error) {
            alertWarning("Error al cambiar ", error.message)
        }
    }

    const handleUpdateEstado = async (e) => {
        try {
            e.preventDefault();
            if (estado.Estado === "" || estado.Motivo === "") {
                return alertWarning("Por favor, ingrese todos los campos");
            }
            setLoading(true);
            const resultado = await changeStatusAsociado(asociado.id, estado);
            setLoading(false);
            if (resultado.status) {
                alertSucces("Se cambio correctamente");
                toggleModalEstado();
                await getListadoAsociados();
            } else {
                alertWarning("No se pudo cambiar");
            }
        } catch (error) {
            setLoading(false);
            alertError("Update estado: " + error.message);
        }
    }

    /*=========== Cambiar Imagen ==============================*/

    const toggleModalImage = () => {
        setOpenModalImage(!openModalImage);
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
            setLoading(true);
            const resultado = await updateImage(formData, asociado.id);
            setLoading(false);
            if (resultado.status) {
                toggleModalImage();
                alertSucces("Imagen actualizada correctamente");
                await getListadoAsociados();
            } else {
                alertWarning("No se pudo actualizar la imagen");
            }
        } catch (error) {
            setLoading(false);
            alertError("update image: " + error.message);
        }
    }

    /*=========== Eliminar ==============================*/

    const eliminarAsociado = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este Asociado?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteAsociado(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await getListadoAsociados();
                    } else {
                        alertWarning("No se pudo eliminar");
                    }
                }
            });
        } catch (error) {
            alertError("Error al eliminar ", error.message);
        }
    };

    return {
        titulo, titulo2, tituloModal, openModal, asociado, lista, busqueda, loading, imagen, openModalImage, tituloModalImage,
        openModalEstado, estado, touched, estadoFiltro,
        toggleModal, handleChange, handleSubmit, handleBusqueda, cargarAsociado, handleUpdate, toggleModalImage, cargarImagen,
        eliminarAsociado, cambiarEstado, handleUpdateImage, handleChangeImagen, handleChangeEstado, toggleModalEstado,
        handleUpdateEstado, setEstadoFiltro
    };
}

export default useAsociados;