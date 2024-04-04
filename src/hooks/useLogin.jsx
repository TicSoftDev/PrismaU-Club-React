import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/LoginService';
import { alertError, alertWarning } from '../utilities/alerts/Alertas';
import { crearStorage } from '../utilities/localstorage/localstorage';
import { createUser } from '../redux/userSlice';
import { PrivateRoutes } from '../models/RutasModel';
import { createAcceso } from '../redux/credencialSlice';

function useLogin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState({
        Documento: "",
        password: ""
    });

    const handleChange = ({ target }) => {
        setUsuario({
            ...usuario,
            [target.name]: target.value
        });
    };

    const toggleVisible = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (usuario.Documento === "" || usuario.password === "") {
                alertWarning("Debe llenar todos los campos");
                return;
            }
            setLoading(true);
            const resultado = await iniciarSesion(usuario);
            setLoading(false);
            if (resultado.status === false) {
                setUsuario({ Documento: "", password: "" })
                alertWarning("Credenciales Invalidas");
            } else {
                dispatch(createUser(resultado.user));
                crearStorage("token", resultado.token);
                dispatch(createAcceso(resultado.credenciales));
                navigate(PrivateRoutes.DASHBOARD, { replace: true });
            }
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate(PrivateRoutes.DASHBOARD, { replace: true });
        }
    }, []);

    return {
        loading, usuario, visible, toggleVisible, handleSubmit, handleChange
    };
}

export default useLogin;