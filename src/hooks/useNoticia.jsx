import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createNoticia, deleteNoticia, getNoticias, updateNoticia } from '../services/NoticiasService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useNoticia() {

    const titulo = 'Eventos';
    let lista = [];
    const [touched, setTouched] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [listadoNoticias, setListadoNoticias] = useState([]);
    const [noticia, setNoticia] = useState({
        Titulo: "",
        Descripcion: "",
        Imagen: null,
        Vencimiento: "",
    });
    const tituloModal = noticia.id ? "Actualizar Noticia" : "Crear Noticia";

    const recargar = () => {
        setNoticia({
            Titulo: "",
            Descripcion: "",
            Imagen: null,
            Vencimiento: "",
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

    const handleChange = ({ target }) => {
        setNoticia({
            ...noticia,
            [target.name]: target.value
        });
    };

    const handleChangeImage = ({ target }) => {
        const file = target.files[0];
        setNoticia({
            ...noticia,
            Imagen: file
        });
    };

    const handleSubmit = async (e) => {
        try {
            setTouched(true);
            e.preventDefault();
            if (!noticia.Titulo || !noticia.Descripcion || !noticia.Vencimiento) {
                alertWarning("Por favor, ingrese todos los campos. ");
                return;
            }
            // const formData = new FormData();
            // formData.append('Titulo', noticia.Titulo);
            // formData.append('Descripcion', noticia.Descripcion);
            // if (noticia.Imagen) {
            //     formData.append('Imagen', noticia.Imagen);
            // }
            // formData.append('Vencimiento', noticia.Vencimiento);
            setLoading(true);
            const data = await createNoticia(noticia);
            setLoading(false);
            if (data.status) {
                toggleModal();
                alertSucces("Creado correctamente");
                await getListadoNoticias();
            } else {
                alertWarning("No se pudo crear la noticia");
            }
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const getListadoNoticias = async () => {
        try {
            setLoading(true);
            const data = await getNoticias();
            setLoading(false);
            setListadoNoticias(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const cargarNoticia = async (noticia) => {
        setNoticia(noticia);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        setTouched(true);
        e.preventDefault();
        if (!noticia.Titulo || !noticia.Descripcion || !noticia.Vencimiento) {
            alertWarning("Por favor, ingrese todos los campos. ");
            return;
        }
        setLoading(true);
        try {
            const resultado = await updateNoticia(noticia, noticia.id);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await getListadoNoticias();
            } else {
                alertWarning("No se pudo actualizar la noticia");
            }
        } catch (error) {
            setLoading(false);
            console.log(error.message);
            alertError("No se pudo conectar al servidor");
        }
        setLoading(false);
    };

    const eliminarNoticia = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta noticia?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteNoticia(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await getListadoNoticias();
                    } else {
                        alertWarning("No se pudo eliminar");
                    }
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterNoticia = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const titulo = normalizeText(dato.Titulo);

            return palabrasBusqueda.every(palabra =>
                titulo.includes(palabra)
            );
        });
    };

    if (!busqueda) {
        lista = listadoNoticias;
    } else {
        lista = filterNoticia(listadoNoticias, busqueda);
    }

    useEffect(() => {
        getListadoNoticias();
    }, []);

    return {
        titulo, tituloModal, openModal, noticia, lista, busqueda, loading, touched,
        handleChangeImage, toggleModal, handleChange, handleBusqueda, handleSubmit, cargarNoticia, handleUpdate, eliminarNoticia
    };
}

export default useNoticia;