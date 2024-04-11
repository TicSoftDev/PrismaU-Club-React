import { useEffect, useState } from 'react';
import { getCantidadAsociados } from '../services/AsociadosService';
import { alertWarning } from '../utilities/alerts/Alertas';
import { getCantidadAdherentes } from '../services/AdherentesService';
// import { getCantidadEmpleados } from '../services/EmpleadosService';
import { getCantidadFamiliares } from '../services/FamiliaresService';
import { getCantidadEspacios } from '../services/EspaciosService';
import { getCantidadInvitados } from '../services/InvitadosService';

function useCantidad() {

    const [contAsociados, setContAsociados] = useState(0);
    const [contAdherentes, setContAdherentes] = useState(0);
    const [contEmpleados, setContEmpleados] = useState(0);
    const [contFamiliares, setContFamiliares] = useState(0);
    const [contEspacios, setContEspacios] = useState(0);
    const [contInvitados, setContInvitados] = useState(0);

    const cantidadAsociados = async () => {
        try {
            const data = await getCantidadAsociados();
            setContAsociados(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };
    // const cantidadEmpleados = async () => {
    //     try {
    //         const data = await getCantidadEmpleados();
    //         setContEmpleados(data);
    //     } catch (error) {
    //         alertWarning("Count", error.message);
    //     }
    // };
    const cantidadAdherentes = async () => {
        try {
            const data = await getCantidadAdherentes();
            setContAdherentes(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };
    const cantidadFamiliares = async () => {
        try {
            const data = await getCantidadFamiliares();
            setContFamiliares(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };
    const cantidadInvitados = async () => {
        try {
            const data = await getCantidadInvitados();
            setContInvitados(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };
    const cantidadEspacios = async () => {
        try {
            const data = await getCantidadEspacios();
            setContEspacios(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };

    useEffect(() => {
        cantidadAsociados();
        cantidadAdherentes();
        // cantidadEmpleados();
        cantidadFamiliares();
        cantidadEspacios();
        cantidadInvitados();
    }, []);

    return {
        contAdherentes, contAsociados, contEmpleados, contFamiliares, contEspacios, contInvitados
    };
}

export default useCantidad;