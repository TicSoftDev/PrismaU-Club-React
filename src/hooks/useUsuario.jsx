import { useState } from "react";
import { alertError, alertSucces } from "../utilities/alerts/Alertas";
import { changePassword } from "../services/usuariosService";
import { useSelector } from "react-redux";

function useUsuario() {

    const id = useSelector((state) => state.credenciales.id);
    const [usuario, setUsuario] = useState({
        Documento: "",
        password: ""
    })

    const recargar = () => {
        setUsuario({
            Documento: "",
            password: ""
        });
    };

    const handleChange = ({ target }) => {
        setUsuario({
            ...usuario,
            [target.name]: target.value
        });
    };

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
        usuario, handleChange, cambiarClave
    };
}

export default useUsuario;