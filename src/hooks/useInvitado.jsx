import { useEffect, useState } from 'react';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';
import { useSelector } from 'react-redux';
import { createInvitado, getInvitados } from '../services/InvitadosService';

function useInvitado() {

    const titulo = 'Formulario de invitación';
    const titulo2 = 'Listado de invitaciones';
    const usuario = useSelector((state) => state.credenciales);
    const [loading, setLoading] = useState(false);
    const [generado, setGenerado] = useState(false);
    const [invitados, setInvitados] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [invitado, setInvitado] = useState({
        user_id: usuario.id,
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        TipoDocumento: "",
        Documento: "",
        Status: false,

    });
    const [invitacion, setInvitacion] = useState({});
    const ahora = new Date();
    const vencimiento = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);
    const fechaVencimiento = vencimiento.toISOString();
    const datosQR = {
        usuario: invitacion,
        vencimiento: fechaVencimiento
    };
    const dataString = JSON.stringify(datosQR);

    const recargar = () => {
        setInvitado({
            personal_id: "",
            Nombre: "",
            Apellidos: "",
            Telefono: "",
            TipoDocumento: "",
            Documento: "",
            Status: false,
        });
        setInvitacion({});
        setGenerado(false);
        setLoading(false);
    };

    const getListadoInvitados = async () => {
        try {
            setLoading(true);
            let data = await getInvitados();
            const currentYear = new Date().getFullYear();
            data = data.filter(invitado => {
                const date = new Date(invitado.created_at);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return month === selectedMonth && year === currentYear;
            });
            setLoading(false);
            setInvitados(data);
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        try {
            if (invitado.Nombre === "" || invitado.Apellidos === "" || invitado.Documento === "" || invitado.TipoDocumento === "" || invitado.Telefono === "") {
                alertWarning("Por favor, ingrese todos los campos");
                return;
            }
            setLoading(true);
            const data = await createInvitado(invitado);
            setLoading(false);
            if (data.status) {
                setGenerado(true);
                setInvitacion(data.data);
                alertSucces("Se ha generado el codigo de invitación");
            } else {
                alertWarning("Esta persona superó el límite de invitaciones mensuales.");
            }
        } catch (error) {
            alertError(error.message);
        }
    };

    const handleChange = ({ target }) => {
        setInvitado({
            ...invitado,
            [target.name]: target.value
        });
    };

    useEffect(() => {
        getListadoInvitados();
    }, [selectedMonth]);

    return {
        titulo2, titulo, invitado, dataString, generado, loading, invitados, selectedMonth,
        setSelectedMonth, handleChange, handleSubmit, recargar
    };
}

export default useInvitado;