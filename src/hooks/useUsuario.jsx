import { useState } from "react";
import { alertError, alertSucces, alertWarning } from "../utilities/alerts/Alertas";
import { changePassword, getByDocumento } from "../services/usuariosService";
import { useSelector } from "react-redux";

function useUsuario() {

    const titulo = "Busqueda de usuarios";
    const id = useSelector((state) => state.credenciales.id);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [usuario, setUsuario] = useState({
        Documento: "",
        password: ""
    })

    const recargar = () => {
        setUsuario({
            Documento: "",
            password: ""
        });
        setUserData(null);
        setBusqueda('');
    };

    const handleChange = ({ target }) => {
        setUsuario({
            ...usuario,
            [target.name]: target.value
        });
    };

    const handleChangeBusqueda = ({ target }) => {
        setBusqueda(target.value);
    }

    const buscarUsuario = async () => {
        if (!busqueda) {
            return alertWarning('Se debe ingresar un valor');
        }
        try {
            setLoading(true);
            const data = await getByDocumento(busqueda);
            setLoading(false);
            setUserData(data);
        } catch (error) {
            setLoading(false);
            alertError("Busqueda: ", error.message);
        }
    }

    const cambiarClave = async () => {
        try {
            const resultado = await changePassword(id, usuario);
            console.log(resultado)
            if (resultado.message === "hecho") {
                alertSucces("Contraseña actualizada correctamente");
                recargar();
            }

        } catch (error) {
            alertError("Algo salio mal");
        }
    }

    return {
        titulo, usuario, userData, busqueda, loading, handleChange, handleChangeBusqueda, buscarUsuario, cambiarClave, recargar
    };
}

export default useUsuario;