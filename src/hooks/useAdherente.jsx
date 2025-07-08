import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { changeStatusAdherente, changeToAsociado, createAdherente, deleteAdherente, getAdherentes, updateAdherente, updateImage } from '../services/AdherentesService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useAdherente() {

    const titulo = 'Adherentes';
    const titulo2 = 'Cambiar Estado';
    let lista = [];
    const [touched, setTouched] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEstado, setOpenModalEstado] = useState(false);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState('Todos');
    const [listadoAdherentes, setListadoAdherentes] = useState([]);
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
        Rol: 3
    });
    const [estado, setEstado] = useState({
        Estado: "",
        Motivo: ""
    });
    const [imagen, setImagen] = useState(null);
    const tituloModal = adherente.id ? "Actualizar adherente" : "Crear adherente";
    const tituloModalImage = "Actualizar Imagen";

    /*=========== Recargar ==============================*/

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
            Rol: 3
        });
        setTouched(false);
    };

    /*=========== Agregar ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setAdherente({
            ...adherente,
            [target.name]: target.value
        });
    };

    const handleSelectChange = (selectedOption) => {
        setAdherente(prev => ({
            ...prev,
            asociado_id: selectedOption.value
        }));
    };

    const handleSubmit = async (e) => {
        try {
            setTouched(true);
            e.preventDefault();
            setLoading(true);
            const data = await createAdherente(adherente);
            setLoading(false);
            if (data.status) {
                toggleModal();
                alertSucces("Creado correctamente");
                await getListadoAdherentes();
            } else {
                data.errors.forEach((err) => alertWarning(err));
            }
        } catch (error) {
            setLoading(false);
            alertError("Crear adherente: " + error.message);
        }
    };

    /*=========== Consultar ==============================*/

    const getListadoAdherentes = async () => {
        try {
            setLoading(true);
            const data = await getAdherentes();
            setListadoAdherentes(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alertError("Cargar adherentes " + error.message);
        }
    };

    useEffect(() => {
        getListadoAdherentes();
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
        lista = listadoAdherentes;
    } else {
        lista = filterAsociados(listadoAdherentes, busqueda, estadoFiltro);
    }

    /*=========== Actualizar ==============================*/

    const cargarAdherente = async (adherente) => {
        adherente.Rol = 3;
        setAdherente(adherente);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            setTouched(true);
            e.preventDefault();
            setLoading(true);
            const resultado = await updateAdherente(adherente, adherente.id);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await getListadoAdherentes();
            } else {
                resultado.errors.forEach((err) => alertWarning(err));
            }
        } catch (error) {
            setLoading(false);
            alertError("Update adherente: " + error.message);
        }
    };

    /*=========== Cambiar a asociado ==============================*/

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
                    } else {
                        alertWarning("No se pudo cambiar");
                    }
                }
            });
        } catch (error) {

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
                    adherente.id = id;
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
            const resultado = await changeStatusAdherente(adherente.id, estado);
            setLoading(false);
            if (resultado.status) {
                toggleModalEstado();
                alertSucces("Se cambio correctamente");
                await getListadoAdherentes();
            } else {
                alertWarning("No se pudo cambiar");
            }
        } catch (error) {
            setLoading(false);
            alertError("Update Estado " + error);
        }
    }

    /*=========== Cambiar Imagen ==============================*/

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
            setLoading(true);
            const resultado = await updateImage(formData, adherente.id);
            setLoading(false);
            if (resultado.status) {
                toggleModalImage();
                alertSucces("Imagen actualizada correctamente");
                await getListadoAdherentes();
            } else {
                alertWarning("No se pudo actualizar la imagen");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            alertError("Update imagen " + error.message);
        }
    }

    /*=========== Eliminar ==============================*/

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
                    const resultado = await deleteAdherente(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await getListadoAdherentes();
                    } else {
                        alertWarning("No se pudo eliminar");
                    }
                }
            });
        } catch (error) {
            alertError("Eliminar adherente " + error.message);
        }
    };

    return {
        titulo, titulo2, tituloModal, openModal, adherente, lista, busqueda, loading, imagen, openModalImage, tituloModalImage,
        touched, openModalEstado, estado, estadoFiltro,
        toggleModal, handleChange, handleSubmit, handleBusqueda, cargarAdherente, handleUpdate, toggleModalImage, cargarImagen,
        eliminarAdherente, cambiarEstado, handleUpdateImage, handleChangeImagen, handleChangeEstado, toggleModalEstado,
        cambiarAsociado, handleSelectChange, handleUpdateEstado, setEstadoFiltro
    };
}

export default useAdherente;