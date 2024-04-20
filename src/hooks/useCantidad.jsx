import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCantidadAdherentes } from '../services/AdherentesService';
import { getCantidadAdmins } from '../services/AdminsService';
import { getCantidadAsociados } from '../services/AsociadosService';
import { getCantidadEmpleados } from '../services/EmpleadosService';
import { getCantidadEspacios } from '../services/EspaciosService';
import { getCantidadFamiliares, getCantidadFamiliaresSocio } from '../services/FamiliaresService';
import { getCantidadInvitados, getCantidadInvitadosSocio } from '../services/InvitadosService';
import { alertWarning } from '../utilities/alerts/Alertas';

function useCantidad() {

    const id = useSelector((state) => state.user.id);
    const [contAsociados, setContAsociados] = useState(0);
    const [contAdherentes, setContAdherentes] = useState(0);
    const [contEmpleados, setContEmpleados] = useState(0);
    const [contFamiliares, setContFamiliares] = useState(0);
    const [contFamiliaresSocio, setContFamiliaresSocio] = useState(0);
    const [contEspacios, setContEspacios] = useState(0);
    const [contInvitados, setContInvitados] = useState(0);
    const [contInvitadosSocio, setContInvitadosSocio] = useState(0);
    const [contAdmins, setContAdmins] = useState(0);

    const cantidadAsociados = async () => {
        try {
            const data = await getCantidadAsociados();
            setContAsociados(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };
    const cantidadEmpleados = async () => {
        try {
            const data = await getCantidadEmpleados();
            setContEmpleados(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };
    const cantidadAdherentes = async () => {
        try {
            const data = await getCantidadAdherentes();
            setContAdherentes(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };
    const cantidadFamiliaresSocio = async () => {
        try {
            const data = await getCantidadFamiliaresSocio(id);
            setContFamiliaresSocio(data);
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
    const cantidadInvitadosSocio = async () => {
        try {
            const data = await getCantidadInvitadosSocio(id);
            setContInvitadosSocio(data);
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
    const cantidadAdmins = async () => {
        try {
            const data = await getCantidadAdmins();
            setContAdmins(data);
        } catch (error) {
            alertWarning("Count", error.message);
        }
    };

    useEffect(() => {
        cantidadAsociados();
        cantidadAdherentes();
        cantidadEmpleados();
        cantidadFamiliares();
        cantidadFamiliaresSocio();
        cantidadEspacios();
        cantidadInvitados();
        cantidadInvitadosSocio();
        cantidadAdmins();
    }, []);

    return {
        contAdherentes, contAsociados, contEmpleados, contFamiliares, contEspacios, contInvitados,
        contAdmins, contFamiliaresSocio, contInvitadosSocio
    };
}

export default useCantidad;