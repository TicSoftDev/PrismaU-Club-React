import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../models/RutasModel';
import { changePassword, sendCode, validateCode } from '../services/ResetService';
import { alertError, alertSucces, alertWarning } from '../utilities/alerts/Alertas';

function useReset() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [documento, setDocumento] = useState('');
    const [codigo, setCodigo] = useState('');
    const [password, setPassword] = useState('');

    /*=========== Enviar Codigo ==============================*/

    const handleChangeDocumento = (e) => {
        setDocumento(e.target.value);
    }

    const enviarCodigo = async () => {
        setLoading(true);
        if (documento === '') {
            alertWarning("Por favor, ingrese el documento");
            setLoading(false);
            return;
        }
        try {
            const data = await sendCode(documento);
            if (data.status) {
                alertSucces("Se envio el código correctamente");
                navigate(PublicRoutes.VALIDAR);
            }
            else {
                setDocumento('');
                alertWarning("No se encontró ningún usuario");
            }
        } catch (error) {
            alertError("Error al enviar el código " + error.message);
        }
        setLoading(false);
    }

    /*=========== Enviar Codigo ==============================*/

    const handleChangeCode = (e) => {
        setCodigo(e.target.value);
    }

    const verificarCodigo = async () => {
        setLoading(true);
        if (codigo === '') {
            alertWarning("Por favor, ingrese el código");
            setLoading(false);
            return;
        }
        try {
            const data = await validateCode(codigo);
            if (data.status) {
                localStorage.setItem('code', codigo);
                navigate(PublicRoutes.RESET);
            }
            else {
                setCodigo('');
                alertWarning("Codigo invalido");
            }
        } catch (error) {
            alertError("Error al enviar el código " + error.message);
        }
        setLoading(false);
    }

    /*=========== Cambiar Password ==============================*/

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const cambiarPassword = async () => {
        const code = localStorage.getItem('code');
        setLoading(true);
        if (password === '') {
            alertWarning("Por favor, ingrese la contraseña");
            setLoading(false);
            return;
        }
        try {
            const data = await changePassword(code, password);
            if (data.status) {
                alertSucces("Contraseña actualizada correctamente");
                navigate(PublicRoutes.LOGIN);
            }
            else {
                setPassword('');
                alertWarning("No se pudo cambiar la contraseña");
            }
        } catch (error) {
            alertError("Error al cambiar el password " + error.message);
        }
        setLoading(false);
    }

    return {
        documento, codigo, loading, password,
        handleChangeDocumento, handleChangeCode, enviarCodigo, verificarCodigo, handleChangePassword, cambiarPassword
    }
}

export default useReset