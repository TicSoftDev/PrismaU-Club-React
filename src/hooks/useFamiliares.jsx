import { useEffect, useState } from 'react';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';
import Swal from 'sweetalert2';
import { createFamiliar, deleteFamiliar, getFamiliares, updateFamiliar, updateImageFamiliar } from '../services/FamiliaresService';

function useFamiliares(id) {

    const titulo = 'Familiares';
    let lista = [];
    const [openModal, setOpenModal] = useState(false);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [listadoFamiliares, setListadoFamiliares] = useState([]);
    const [familiar, setFamiliar] = useState({
        personal_id: id,
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
        Parentesco: '',
        Rol: "5"
    });
    const [imagen, setImagen] = useState(null);
    const tituloModal = familiar.id ? "Actualizar Familiar" : "Crear Familiar";
    const tituloModalImage = "Actualizar Imagen";

    const recargar = () => {
        setFamiliar({
            personal_id: id,
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
            Parentesco: '',
            Rol: "5"
        });
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
            if (familiar.Nombre === "" || familiar.Apellidos === "" || familiar.Documento === "" || familiar.TipoDocumento === "" || familiar.Correo === "" || familiar.Telefono === "" || familiar.FechaNacimiento === "" || familiar.LugarNacimiento === "" || familiar.Sexo === "" || familiar.DireccionResidencia === "" || familiar.CiudadResidencia === "" || familiar.Cargo === "" || familiar.Parentesco === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            const data = await createFamiliar(familiar);
            if (data.message === 'hecho') {
                alertSucces("Creado correctamente");
                await getListadoFamiliares();
                toggleModal();
            } else if (data.message === 'error') {
                alertWarning("Por favor, revisa el formulario hay campos con valores que ya existen. ");
            } else {
                alertWarning("No se pudo crear el familiar");
            }
        } catch (error) {
            alertError(error.message);
        }
    };

    const handleChange = ({ target }) => {
        setFamiliar({
            ...familiar,
            [target.name]: target.value
        });
    };

    const getListadoFamiliares = async () => {
        try {
            setLoading(true);
            const data = await getFamiliares(id);
            setLoading(false);
            setListadoFamiliares(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const cargarFamiliar = async (familiar) => {
        setFamiliar(familiar);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            if (familiar.Nombre === "" || familiar.Apellidos === "" || familiar.Documento === "" || familiar.TipoDocumento === "" || familiar.Correo === "" || familiar.Telefono === "" || familiar.FechaNacimiento === "" || familiar.LugarNacimiento === "" || familiar.Sexo === "" || familiar.DireccionResidencia === "" || familiar.CiudadResidencia === "" || familiar.Cargo === "" || familiar.Parentesco === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            let id = familiar.id;
            delete familiar.id;
            e.preventDefault();
            const resultado = await updateFamiliar(familiar, familiar.user_id);
            console.log(resultado);
            if (resultado.message === 'hecho') {
                alertSucces("Actualizado correctamente");
                await getListadoFamiliares();
                toggleModal();
            } else if (resultado.message === 'error') {
                familiar.id = id;
                alertWarning("Por favor, revisa el formulario hay campos valores que ya existen. ");
            } else {
                alertWarning("No se pudo crear el familiar");
            }
        } catch (error) {
            alertError(error.message);
        }
    };

    const eliminarFamiliar = async (id) => {
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
                    const resultado = await deleteFamiliar(id);
                    console.log(resultado);
                    if (resultado.message === "hecho") {
                        alertSucces("Eliminado correctamente");
                        await getListadoFamiliares();
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
        familiar.id = id;
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
            const resultado = await updateImageFamiliar(formData, familiar.id);
            if (resultado.message === 'hecho') {
                alertSucces("Imagen actualizada correctamente");
                toggleModalImage();
                await getListadoFamiliares();
            } else {
                alertWarning("No se pudo actualizar la imagen");
            }
        } catch (error) {
            console.log(error);
            alertError("No se pudo conectar al servidor");
        }
    }

    if (!busqueda) {
        lista = listadoFamiliares;
    } else {
        lista = listadoFamiliares.filter((dato) =>
            dato.familiar.Nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            dato.familiar.Apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
            dato.familiar.Documento.toLowerCase().includes(busqueda.toLowerCase()))
    }

    useEffect(() => {
        getListadoFamiliares();
    }, []);

    return {
        titulo, tituloModal, openModal, familiar, listadoFamiliares, busqueda, loading, openModalImage, tituloModalImage,
        toggleModal, handleChange, handleBusqueda, handleSubmit, cargarFamiliar, handleUpdate, eliminarFamiliar,
        toggleModalImage, cargarImagen, handleUpdateImage, handleChangeImagen

    };
}

export default useFamiliares;