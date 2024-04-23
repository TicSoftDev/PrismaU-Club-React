import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PrivateRoutes, PublicRoutes } from '../models/RutasModel';
import { createAcceso, resetAcceso } from '../redux/credencialSlice';
import { createUser, resetUser } from '../redux/userSlice';
import { iniciarSesion } from '../services/LoginService';
import { alertError, alertWarning } from '../utilities/alerts/Alertas';
import { crearStorage, removerStorage } from '../utilities/localstorage/localstorage';

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
                crearStorage("@token", resultado.token);
                dispatch(createAcceso(resultado.credenciales));
                navigate(PrivateRoutes.DASHBOARD, { replace: true });
            }
        } catch (error) {
            setLoading(false);
            alertError(error.message);
        }
    };

    const logout = (e) => {
        e.preventDefault();
        toggleNav();
        Swal.fire({
            title: '¿Quiere cerrar la sesión actual?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, salir!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                removerStorage("@token");
                dispatch(resetUser());
                dispatch(resetAcceso());
                navigate(PublicRoutes.LOGIN, { replace: true });
            }
        })
    }

    return {
        loading, usuario, visible, toggleVisible, handleSubmit, handleChange, logout,
    };
}

export default useLogin;