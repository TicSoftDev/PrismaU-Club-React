import { format, isValid, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { actualizarDisponibilidadEspacio, crearDisponibilidadEspacio, eliminarDisponibilidadEspacio, getDisponibilidadesEspacio } from '../services/DisponibilidadEspacioService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useDisponibilidadEspacio(id) {

    let titulo = 'Disponibilidades';
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [disponibilidad, setDisponibilidad] = useState({
        espacio_id: id,
        Dia: "",
        Inicio: "",
        Fin: ""
    });
    const tituloModal = disponibilidad.id ? "Actualizar Disponibilidad" : "Crear Disponibilidad";

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setDisponibilidad({
            espacio_id: id,
            Dia: "",
            Inicio: "",
            Fin: ""
        })
        setLoading(false);
    };

    /*=========== Agregar ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setDisponibilidad({
            ...disponibilidad,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (disponibilidad.Dia === "" || disponibilidad.Inicio === "" || disponibilidad.Fin === "") {
            return alertWarning("Por favor, ingrese todos los campos");
        }
        setLoading(true);
        try {
            const data = await crearDisponibilidadEspacio(disponibilidad);
            if (data.status) {
                await getDisponibilidades();
                toggleModal();
                recargar();
                alertSucces("Creado correctamente");
            } else if (data.status === false && data.message === 'Existe') {
                alertWarning("Ya existe una disponibilidad para este espacio con el mismo día y horario");
            } else {
                alertWarning(data.errors.Fin && "La hora final debe ser mayor a la inicial");
            }
        } catch (error) {
            alertError("Crear disponibilidad " + error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==============================*/

    const getDisponibilidades = async () => {
        try {
            setLoading(true);
            const data = await getDisponibilidadesEspacio(id);
            setDisponibilidades(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alertError("consultar disponibilidad " + error.message);
        }
    }

    useEffect(() => {
        getDisponibilidades();
    }, [])

    /*=========== Actualizar ==============================*/

    const convertTo24HourFormat = (time) => {
        let parsedTime;

        parsedTime = parse(time, 'hh:mm a', new Date());
        if (isValid(parsedTime)) {
            return format(parsedTime, 'HH:mm');
        }

        parsedTime = parse(time, 'HH:mm:ss', new Date());
        if (isValid(parsedTime)) {
            return format(parsedTime, 'HH:mm');
        }

        parsedTime = parse(time, 'HH:mm', new Date());
        if (isValid(parsedTime)) {
            return format(parsedTime, 'HH:mm');
        }

        throw new Error(`Invalid time value: ${time}`);
    };

    const cargarDisponibilidad = (disponibilidad) => {
        setDisponibilidad(disponibilidad);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        try {
            if (disponibilidad.Dia === "" || disponibilidad.Inicio === "" || disponibilidad.Fin === "") {
                return alertWarning("Por favor, ingrese todos los campos");
            }
            e.preventDefault();
            setLoading(true);
            const nuevaDisponibilidad = {
                ...disponibilidad,
                Inicio: convertTo24HourFormat(disponibilidad.Inicio),
                Fin: convertTo24HourFormat(disponibilidad.Fin)
            };
            const data = await actualizarDisponibilidadEspacio(nuevaDisponibilidad, disponibilidad.id);
            setLoading(false);
            if (data.status) {
                await getDisponibilidades();
                toggleModal();
                recargar();
                alertSucces("Actualizado correctamente");
            } else if (data.status === false && data.message === 'Existe') {
                alertWarning("Ya existe una disponibilidad para este espacio con el mismo día y horario");
            } else {
                alertWarning(data.errors.Fin && "La hora final debe ser mayor a la inicial");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            alertError("Actualizar disponibilidad: " + error.message);
        }
    };

    /*=========== Eliminar ==============================*/

    const eliminarDisponibilidad = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta disponibilidad?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await eliminarDisponibilidadEspacio(id);
                    if (resultado.status) {
                        alertSucces("Eliminado correctamente");
                        await getDisponibilidades();
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
        titulo, tituloModal, openModal, disponibilidad, disponibilidades, loading,
        handleChange, handleSubmit, toggleModal, cargarDisponibilidad, handleUpdate, eliminarDisponibilidad
    }
}

export default useDisponibilidadEspacio