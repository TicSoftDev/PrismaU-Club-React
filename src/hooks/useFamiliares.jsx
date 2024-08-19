import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createFamiliarAdherente, createFamiliarAsociado, deleteFamiliar, getFamiliares, updateFamiliar, updateImageFamiliar } from '../services/FamiliaresService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useFamiliares(id, codigo, estado, type) {

    const titulo = 'Familiares';
    const [openModal, setOpenModal] = useState(false);
    const [touched, setTouched] = useState(false);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [familiares, setFamiliares] = useState([]);
    const [familiar, setFamiliar] = useState({
        [type === 'Asociado' ? 'asociado_id' : 'adherente_id']: id,
        Nombre: "",
        Apellidos: "",
        Correo: "",
        Telefono: "",
        FechaNacimiento: "",
        LugarNacimiento: "",
        TipoDocumento: "",
        Documento: "",
        Sexo: "",
        Codigo: codigo,
        DireccionResidencia: "",
        CiudadResidencia: "",
        EstadoCivil: "",
        Cargo: "",
        Parentesco: '',
        Rol: "5",
        type: type,
        Estado: estado
    });
    const [imagen, setImagen] = useState(null);
    const tituloModal = familiar.id ? "Actualizar Familiar" : "Crear Familiar";
    const tituloModalImage = "Actualizar Imagen";

    const recargar = () => {
        setFamiliar({
            [type === 'Asociado' ? 'asociado_id' : 'adherente_id']: id,
            Nombre: "",
            Apellidos: "",
            Correo: "",
            Telefono: "",
            FechaNacimiento: "",
            LugarNacimiento: "",
            TipoDocumento: "",
            Documento: "",
            Sexo: "",
            Codigo: codigo,
            DireccionResidencia: "",
            CiudadResidencia: "",
            EstadoCivil: "",
            Cargo: "",
            Parentesco: '',
            Rol: "5",
            type: type,
            Estado: estado
        });
        setTouched(false);
    };

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleSubmit = async (e) => {
        try {
            setTouched(true);
            e.preventDefault();
            if (familiar.Nombre === "" || familiar.Apellidos === "" || familiar.Documento === "" || familiar.TipoDocumento === "" || familiar.Sexo === "" || familiar.Parentesco === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            setLoading(true);
            let data;
            if (familiar.type === "Asociado") {
                setFamiliar({ ...familiar, asociado_id: id });
                data = await createFamiliarAsociado(familiar);
            } else if (familiar.type === "Adherente") {
                setFamiliar({ ...familiar, adherente_id: id });
                data = await createFamiliarAdherente(familiar);
            }
            setLoading(false);
            if (data.status) {
                toggleModal();
                alertSucces("Creado correctamente");
                await getListadoFamiliares();
            } else if (data.status === false && data.message === 'Existe') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertWarning("No se pudo crear el familiar");
            }
        } catch (error) {
            setLoading(false);
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
            const data = await getFamiliares(id, type);
            setLoading(false);
            setFamiliares(data);
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
            setTouched(true);
            if (familiar.Nombre === "" || familiar.Apellidos === "" || familiar.Documento === "" || familiar.TipoDocumento === "" || familiar.Sexo === "" || familiar.Parentesco === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            e.preventDefault();
            setLoading(true);
            const resultado = await updateFamiliar(familiar, familiar.user_id);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await getListadoFamiliares();
            } else if (resultado.status === false && resultado.message === 'Existe') {
                alertWarning("Por favor, revisa el formulario, hay campos con valores que ya existen. ");
            } else {
                alertWarning("No se pudo crear el familiar");
            }
        } catch (error) {
            setLoading(false);
            console.log(error.message);
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
                    if (resultado.status) {
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
            setLoading(true);
            const resultado = await updateImageFamiliar(formData, familiar.id);
            setLoading(false);
            if (resultado.status) {
                toggleModalImage();
                alertSucces("Imagen actualizada correctamente");
                await getListadoFamiliares();
            } else {
                alertWarning("No se pudo actualizar la imagen");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            alertError("No se pudo conectar al servidor");
        }
    }

    useEffect(() => {
        getListadoFamiliares();
    }, []);

    return {
        titulo, tituloModal, openModal, familiar, familiares, loading, openModalImage, tituloModalImage, touched,
        toggleModal, handleChange, handleSubmit, cargarFamiliar, handleUpdate, eliminarFamiliar, toggleModalImage,
        cargarImagen, handleUpdateImage, handleChangeImagen
    };
}

export default useFamiliares;