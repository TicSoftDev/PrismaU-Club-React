import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAppSelector } from '../hooks/useStore';
import { getCantidadAdherentes } from '../services/AdherentesService';
import { getCantidadAdmins } from '../services/AdminsService';
import { getCantidadAsociados } from '../services/AsociadosService';
import { getCantidadContrataciones } from '../services/ContratacionesService';
import { getCantidadEmpleados } from '../services/EmpleadosService';
import { getCantidadEncuestas } from '../services/EncuestasService';
import { getCantidadEspacios } from '../services/EspaciosService';
import { getCantidadFamiliares, getCantidadFamiliaresSocio } from '../services/FamiliaresService';
import { getCantidadInvitados, getCantidadInvitadosSocio } from '../services/InvitadosService';
import { getCantidadNoticias } from '../services/NoticiasService';
import { getCantidadReservas } from '../services/ReservasService';
import { getCantidadSolicitudes } from '../services/SolicitudesService';

export default function useCantidad() {

    const id = useAppSelector(state => state.user.id);
    const user = useAppSelector(state => state.credenciales);
    const rol = user.Rol;

    const handleError = (message) => (error) => {
        toast.error(`${message}: ${error.message}`);
    };

    const { data: contContrataciones } = useQuery({
        queryKey: ['contContrataciones'],
        queryFn: getCantidadContrataciones,
        enabled: rol === 0,
        onError: handleError('Error al cargar la cantidad de contrataciones'),
    });

    const { data: contAdmins } = useQuery({
        queryKey: ['contAdmins'],
        queryFn: getCantidadAdmins,
        enabled: rol === 0,
        onError: handleError('Error al cargar la cantidad de admins'),
    });

    const { data: contSolicitudes } = useQuery({
        queryKey: ['contSolicitudes'],
        queryFn: getCantidadSolicitudes,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de solicitudes'),
    });

    const { data: contReservas } = useQuery({
        queryKey: ['contReservas'],
        queryFn: getCantidadReservas,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de reservas'),
    });

    const { data: contEncuestas } = useQuery({
        queryKey: ['contEncuestas'],
        queryFn: getCantidadEncuestas,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de encuestas'),
    });

    const { data: contFamiliares } = useQuery({
        queryKey: ['contFamiliares'],
        queryFn: getCantidadFamiliares,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de familiares'),
    });

    const { data: contAsociados } = useQuery({
        queryKey: ['contAsociados'],
        queryFn: getCantidadAsociados,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de asociados'),
    });

    const { data: contAdherentes } = useQuery({
        queryKey: ['contAdherentes'],
        queryFn: getCantidadAdherentes,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de adherentes'),
    });

    const { data: contEmpleados } = useQuery({
        queryKey: ['contEmpleados'],
        queryFn: getCantidadEmpleados,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de empleados'),
    });

    const { data: contEspacios } = useQuery({
        queryKey: ['contEspacios'],
        queryFn: getCantidadEspacios,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de espacios'),
    });

    const { data: contNoticias } = useQuery({
        queryKey: ['contNoticias'],
        queryFn: getCantidadNoticias,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de noticias'),
    });

    const { data: contInvitados } = useQuery({
        queryKey: ['contInvitados'],
        queryFn: getCantidadInvitados,
        enabled: rol === 0 || rol === 1,
        onError: handleError('Error al cargar la cantidad de invitados'),
    });

    const { data: contInvitadosSocio } = useQuery({
        queryKey: ['contInvitadosSocio', id],
        queryFn: () => getCantidadInvitadosSocio(id),
        enabled: rol === 2 || rol === 3,
        onError: handleError('Error al cargar la cantidad de invitados del socio'),
    });

    const { data: contFamiliaresSocio } = useQuery({
        queryKey: ['contFamiliaresSocio', id],
        queryFn: () => getCantidadFamiliaresSocio(id, rol === 2 ? 'Asociado' : 'Adherente'),
        enabled: rol === 2 || rol === 3,
        onError: handleError('Error al cargar la cantidad de familiares del socio'),
    });

    return {
        contAdherentes,
        contAsociados,
        contEmpleados,
        contEspacios,
        contNoticias,
        contContrataciones,
        contAdmins,
        contFamiliares,
        contSolicitudes,
        contReservas,
        contEncuestas,
        contFamiliaresSocio,
        contInvitadosSocio,
        contInvitados,
    };
}
