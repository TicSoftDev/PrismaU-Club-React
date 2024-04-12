import { useEffect, useState } from 'react';
import { createCargo, deleteCargo, getcCargos, updateCargo } from '../services/CargosService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';
import Swal from 'sweetalert2';

function useCargos() {

    const titulo = 'Cargos de empleados';
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cargos, setCargos] = useState([]);
    const [cargo, setCargo] = useState({
        Descripcion: "",
    });
    const tituloModal = cargo.id ? 'Editar cargo' : 'Crear cargo';

    const recargar = () => {
        setCargo({
            Descripcion: "",
        });
    };

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const getListadoCargos = async () => {
        try {
            setLoading(true);
            let data = await getcCargos();
            setLoading(false);
            setCargos(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        try {
            if (cargo.Descripcion === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            const data = await createCargo(cargo);
            if (data.status) {
                alertSucces("Creado correctamente");
                recargar();
                toggleModal();
                await getListadoCargos();
            } else {
                alertWarning("No se pudo crear.");
            }
        } catch (error) {
            alertError(error.message);
        }
    };

    const handleChange = ({ target }) => {
        setCargo({
            ...cargo,
            [target.name]: target.value
        });
    };

    const cargar = async (cargo) => {
        setCargo(cargo);
        setOpenModal(true);
    };

    const handleUpdate = async (e) => {
        try {
            if (cargo.Descripcion === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            const data = await updateCargo(cargo, cargo.id);
            if (data.status) {
                alertSucces("Actualizado correctamente");
                toggleModal();
                recargar();
                await getListadoCargos();
            } else {
                alertWarning("No se pudo actualizar.");
            }
        } catch (error) {
            alertError(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este cargo?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await deleteCargo(id);
                    if (data.status) {
                        alertSucces("Eliminado correctamente");
                        await getListadoCargos();
                    } else {
                        alertWarning("No se pudo eliminar.");
                    }
                }
            });
        } catch (error) {
            alertError(error.message);
        }
    };

    useEffect(() => {
        getListadoCargos();
    }, []);

    return {
        titulo, loading, cargos, cargo, tituloModal, openModal,
        handleChange, handleSubmit, toggleModal, handleUpdate, handleDelete, cargar
    };
}

export default useCargos;