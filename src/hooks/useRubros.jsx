import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createRubro, deleteRubro, getRubros, updateRubro } from '../services/RubrosService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useRubros() {

    const titulo = 'Rubros';
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rubros, setRubros] = useState([]);
    const [rubro, setRubro] = useState({
        rubro: '',
        valor: ''
    });
    const tituloModal = rubro.id ? 'Actualizar rubro' : 'Crear rubro';

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setRubros({
            rubro: '',
            valor: ''
        })
        setLoading(false);
    }

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
    }

    const handleChange = ({ target }) => {
        console.log(target.value)
        setRubro({
            ...rubro,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rubro.rubro || !rubro.valor) {
            alertWarning("Por favor, ingrese todos los campos.");
            return;
        }
        setLoading(true);
        try {
            const data = await createRubro(rubro);
            if (data.status) {
                toggleModal();
                await consultarRubros();
                alertSucces("Creado correctamente");
            } else {
                alertWarning("No se pudo crear el rubro");
            }
        } catch (error) {
            console.log("Rubros", error.message);
            alertError("Crear rubros: " + error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==============================*/

    const consultarRubros = async () => {
        setLoading(true);
        try {
            const data = await getRubros();
            setRubros(data);
        } catch (error) {
            console.log("Reservas", error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        consultarRubros();
    }, []);

    /*=========== Actualizar ==============================*/

    const cargarRubro = (rubro) => {
        setRubro(rubro);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            if (!rubro.rubro || !rubro.valor) {
                alertWarning("Por favor, ingrese todos los campos.");
                return;
            }
            setLoading(true);
            const resultado = await updateRubro(rubro.id, rubro);
            setLoading(false);
            if (resultado.status) {
                toggleModal();
                alertSucces("Actualizado correctamente");
                await consultarRubros();
            } else {
                alertWarning("No se pudo actualizar la rubros");
            }
        } catch (error) {
            console.log("Rubros", error.message);
            alertError("Actualizar rubros: " + error.message);
        }
    }

    /*=========== Eliminar ==============================*/

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta rubro?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteRubro(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await consultarRubros();
                    } else {
                        alertWarning("No se pudo eliminar la rubros");
                    }
                }
            });

        } catch (error) {
            console.log("Rubros", error.message);
            alertError("Eliminar rubros: " + error.message);
        }
    }

    return {
        titulo,
        loading,
        openModal,
        rubros,
        rubro,
        tituloModal,
        toggleModal,
        handleChange,
        handleSubmit,
        cargarRubro,
        handleUpdate,
        handleDelete
    }
}

export default useRubros