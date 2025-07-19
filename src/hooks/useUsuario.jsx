import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { changePassword, getByDocumento, getSocios, resetPassword, } from "../services/usuariosService";
import { alertError, alertSucces, alertWarning, } from "../utilities/alerts/Alertas";

function useUsuario() {
    const titulo = "Busqueda de usuarios";
    const id = useSelector((state) => state.credenciales.id);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [socios, setSocios] = useState([]);
    const [usuario, setUsuario] = useState({
        Documento: "",
        password: "",
    });

    /*=========== Recargar ==============================*/
    const recargar = () => {
        setUsuario({
            Documento: "",
            password: "",
        });
        setUserData(null);
        setBusqueda("");
    };

    /*=========== Buscador usuario ==============================*/

    const handleChangeBusqueda = ({ target }) => {
        setBusqueda(target.value);
    };

    const buscarUsuario = async () => {
        if (!busqueda) {
            return alertWarning("Se debe ingresar un valor");
        }
        try {
            setLoading(true);
            const data = await getByDocumento(busqueda);
            setLoading(false);
            if (data.status) {
                setUserData(data);
            } else {
                alertWarning("No se encontro ningun usuario");
            }
        } catch (error) {
            setLoading(false);
            alertError("Busqueda: ", error.message);
        }
    };

    /*=========== Cambiar Clave ==============================*/

    const handleChange = ({ target }) => {
        setUsuario({
            ...usuario,
            [target.name]: target.value,
        });
    };

    const cambiarClave = async () => {
        try {
            const resultado = await changePassword(id, usuario);
            if (resultado.message === "hecho") {
                alertSucces("Contraseña actualizada correctamente");
                recargar();
            }
        } catch (error) {
            alertError("Algo salio mal");
        }
    };

    /*=========== Reseet Password ==============================*/

    const resetearPassword = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere resetear la contraseña de este usuario?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, resetear',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await resetPassword(id);
                    if (resultado.status) {
                        alertSucces("La contraseña es el numero de documento");
                    } else {
                        alertWarning("No se pudo resetear la contraseña");
                    }
                }
            });
        } catch (error) {
            alertError("Algo salio mal");
        }
    };

    /*=========== Consultar socios ==============================*/

    const consultarSocios = async () => {
        setLoading(true);
        try {
            const data = await getSocios();
            setSocios(data);
        } catch (e) {
            console.log("Socios", e.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        consultarSocios();
    }, []);

    /*=========== Consultar socios ==============================*/

    const normalizeText = (text) => {
        if (typeof text !== 'string') {
            return '';
        }
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterBusqueda = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreNormalizado = normalizeText(
                `${dato.nombre} ${dato.apellidos}`
            );
            const documentoNormalizado = normalizeText(dato.documento);
            const cumpleBusqueda = palabrasBusqueda.every(
                (palabra) =>
                    nombreNormalizado.includes(palabra) ||
                    documentoNormalizado.includes(palabra)
            );
            return cumpleBusqueda;
        });
    };

    const lista = filterBusqueda(socios, busqueda);

    return {
        titulo,
        usuario,
        userData,
        busqueda,
        loading,
        lista,
        handleChange,
        handleChangeBusqueda,
        buscarUsuario,
        cambiarClave,
        recargar,
        consultarSocios,
        resetearPassword,
    };
}

export default useUsuario;
