import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createEspacio, deleteEspacio, getEspacios, updateEspacio, updateImagenEspacio } from '../services/EspaciosService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useEspacios() {

    let lista = [];
    const titulo = 'Espacios';
    const [touched, setTouched] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [listadoEspacios, setListadoEspacios] = useState([]);
    const [imagen, setImagen] = useState(null);
    const [espacio, setEspacio] = useState({
        imagen: "",
        Descripcion: "",
        Estado: "",
    });
    const tituloModal = espacio.id ? "Actualizar Espacio" : "Crear Espacio";
    const tituloModalImage = "Actualizar Imagen";

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setEspacio({
            imagen: "",
            Descripcion: "",
            Estado: "",
        });
        setTouched(false);
    };

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setEspacio({
            ...espacio,
            [target.name]: target.value
        });
    };

    const handleSubmit = async (e) => {
        try {
            setTouched(true);
            e.preventDefault();
            if (espacio.Descripcion === "" || espacio.Estado === "") {
                alertWarning("Por favor, ingrese todos los campos. ");
                return;
            }
            setLoading(true);
            const data = await createEspacio(espacio);
            setLoading(false);
            if (data.status) {
                toggleModal();
                alertSucces("Creado correctamente");
                await getListadoEspacios();
            } else {
                alertWarning("No se pudo crear el Espacio");
            }
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    /*=========== Consultar ==============================*/

    const handleChangeImagen = (event) => {
        const file = event.target.files[0];
        setImagen(file);
    };

    /*=========== Consultar ==============================*/

    const getListadoEspacios = async () => {
        try {
            setLoading(true);
            const data = await getEspacios();
            setLoading(false);
            setListadoEspacios(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    useEffect(() => {
        getListadoEspacios();
    }, []);

    /*=========== Busqueda ==============================*/

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterEspacios = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const descripcion = normalizeText(dato.Descripcion);
            return palabrasBusqueda.every(palabra => descripcion.includes(palabra));
        });
    };

    if (!busqueda) {
        lista = listadoEspacios;
    } else {
        lista = filterEspacios(listadoEspacios, busqueda);
    }

    /*=========== Actualizar ==============================*/

    const cargarEspacio = async (espacio) => {
        setEspacio(espacio);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            setTouched(true);
            e.preventDefault();
            if (espacio.Descripcion === "" || espacio.Estado === "") {
                alertWarning("Por favor, ingrese todos los campos. ");
                return;
            }
            setLoading(true);
            const resultado = await updateEspacio(espacio, espacio.id);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await getListadoEspacios();
            } else {
                alertWarning("No se pudo actualizar el Espacio");
            }
        } catch (error) {
            setLoading(false);
            alertError("No se pudo conectar al servidor");
        }
    };

    /*=========== Cambiar imagen ==============================*/

    const cargarImagen = async (id) => {
        espacio.id = id;
        setOpenModalImage(true);
    }

    const toggleModalImage = () => {
        setOpenModalImage(!openModalImage);
    }

    const cambiarImagen = async () => {
        try {
            if (imagen === null) {
                alertWarning("Por favor, selecciona una imagen");
                return;
            }
            const formData = new FormData();
            formData.append('imagen', imagen);
            setLoading(true);
            const data = await updateImagenEspacio(formData, espacio.id);
            setLoading(false);
            if (data.status) {
                toggleModalImage();
                alertSucces("Imagen actualizada correctamente");
                await getListadoEspacios();
            } else {
                alertWarning("No se pudo actualizar la imagen");
            }
        } catch (error) {
            setLoading(false);
            alertError('change Image ', error.message);
        }
    };

    const handleChangeImage = ({ target }) => {
        const file = target.files[0];
        setEspacio({
            ...espacio,
            imagen: file
        });
    };

    /*=========== Eliminar ==============================*/

    const eliminarEspacio = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este Espacio?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteEspacio(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await getListadoEspacios();
                    } else {
                        alertWarning("No se pudo eliminar");
                    }
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    };

    return {
        titulo, tituloModal, openModal, espacio, lista, busqueda, loading, openModalImage, tituloModalImage, touched,
        handleChangeImage, handleChangeImagen, toggleModal, handleChange, handleBusqueda, handleSubmit, cargarEspacio,
        handleUpdate, eliminarEspacio, cambiarImagen, toggleModalImage, cargarImagen
    };
}

export default useEspacios;