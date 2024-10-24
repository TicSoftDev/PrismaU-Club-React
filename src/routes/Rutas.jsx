import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Plantilla from '../components/layouts/Plantilla';
import { PrivateRoutes, PublicRoutes } from '../models/RutasModel';
import AccesosPage from '../pages/admin/accesos/AccesosPage';
import AdherentesPage from '../pages/admin/adherentes/AdherentesPage';
import AsociadosPage from '../pages/admin/asociados/AsociadosPage';
import BusquedaUserPage from '../pages/admin/busquedaUser/BusquedaUserPage';
import DisponibilidadEspacioPage from '../pages/admin/disponibilidad_espacios/DisponibilidadEspacioPage';
import EmpleadosPage from '../pages/admin/empleados/EmpleadosPage';
import EncuestasPage from '../pages/admin/encuestas/EncuestasPage';
import PreguntasPage from '../pages/admin/encuestas/PreguntasPage';
import RespuestasEncuestaPage from '../pages/admin/encuestas/RespuestasEncuestaPage';
import RespuestasPage from '../pages/admin/encuestas/RespuestasPage';
import RespuestasUserEncuestaPage from '../pages/admin/encuestas/RespuestasUserEncuestaPage';
import EspaciosPage from '../pages/admin/espacios/EspaciosPage';
import LogEstadosPage from '../pages/admin/estados/LogEstadosPage';
import FamiliaresAdherentePage from '../pages/admin/familiares/FamiliaresAdherentePage';
import FamiliaresAsociadoPage from '../pages/admin/familiares/FamiliaresAsociadoPage';
import InvitacionesPage from '../pages/admin/invitaciones/InvitacionesPage';
import NoticiasPage from '../pages/admin/noticias/NoticiasPage';
import PagarPage from '../pages/admin/pagos/pagar/PagarPage';
import HistorialPagosCuotasPage from '../pages/admin/pagos/pagos/HistorialPagosCuotasPage';
import HistorialPagosPage from '../pages/admin/pagos/pagos/HistorialPagosPage';
import PagosPage from '../pages/admin/pagos/PagosPage';
import ProgramacionPagosPage from '../pages/admin/pagos/programacion/ProgramacionPagosPage';
import RubrosPage from '../pages/admin/pagos/RubrosPage';
import SociosPage from '../pages/admin/pagos/usuarios/SociosPage';
import ReservasPage from '../pages/admin/reservas/ReservasPage';
import SolicitudesPage from '../pages/admin/solicitudes/SolicitudesPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import Page403 from '../pages/errors/Page403';
import LoginPage from '../pages/login/LoginPage';
import PerfilPage from '../pages/perfil/PerfilPage';
import ChangePassword from '../pages/reset/ChangePassword';
import RecuperacionPage from '../pages/reset/RecuperacionPage';
import VerifyCodePage from '../pages/reset/VerifyCodePage';
import FamiliaresPage from '../pages/socio/familiares/FamiliaresPage';
import InvitadosPage from '../pages/socio/invitados/InvitadosPage';
import CuotasBaileSocioPage from '../pages/socio/pagos/CuotasBaileSocioPage';
import MensualidadesSocioPage from '../pages/socio/pagos/MensualidadesSocioPage';
import AdministradoresPage from '../pages/superAdmin/administradores/AdministradoresPage';
import ContratacionesPage from '../pages/superAdmin/contrataciones/ContratacionesPage';
import HobbiesPage from '../pages/superAdmin/hobbies/HobbiesPage';
import RolesPage from '../pages/superAdmin/roles/RolesPage';
import AuthGuard from '../utilities/guards/AuthGuard';
import { AdminGuard, AdminSocioGuard, SocioGuard, SuperadminGuard } from '../utilities/guards/RolGuard';
import { VerifyGuard } from '../utilities/guards/VerifyGuard';


const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<VerifyGuard />}>
                    <Route element={<LoginPage />} path={PublicRoutes.LOGIN} />
                </Route>
                <Route element={<RecuperacionPage />} path={PublicRoutes.RECUPERAR} />
                <Route element={<VerifyCodePage />} path={PublicRoutes.VALIDAR} />
                <Route element={<ChangePassword />} path={PublicRoutes.RESET} />
                <Route element={<AuthGuard />}>
                    <Route element={<Plantilla />}>
                        <Route element={<DashboardPage />} path={PrivateRoutes.DASHBOARD} />
                        <Route element={<PerfilPage />} path={PrivateRoutes.PERFIL} />
                        <Route element={<SuperadminGuard />}>
                            <Route element={<ContratacionesPage />} path={PrivateRoutes.CONTRATOS} />
                            <Route element={<AdministradoresPage />} path={PrivateRoutes.ADMINISTRADORES} />
                            <Route element={<HobbiesPage />} path={PrivateRoutes.HOBBIES} />
                            <Route element={<RolesPage />} path={PrivateRoutes.ROLES} />
                        </Route>
                        <Route element={<AdminGuard />}>
                            <Route element={<AccesosPage />} path={PrivateRoutes.ACCESOS} />
                            <Route element={<AsociadosPage />} path={PrivateRoutes.ASOCIADOS} />
                            <Route element={<AdherentesPage />} path={PrivateRoutes.ADHERENTES} />
                            <Route element={<EmpleadosPage />} path={PrivateRoutes.EMPLEADOS} />
                            <Route element={<FamiliaresAsociadoPage />} path={PrivateRoutes.FAMILIARESASOCIADO} />
                            <Route element={<FamiliaresAdherentePage />} path={PrivateRoutes.FAMILIARESADHERENTE} />
                            <Route element={<EspaciosPage />} path={PrivateRoutes.ESPACIOS} />
                            <Route element={<InvitacionesPage />} path={PrivateRoutes.INVITACIONES} />
                            <Route element={<LogEstadosPage />} path={PrivateRoutes.ESTADOS} />
                            <Route element={<NoticiasPage />} path={PrivateRoutes.NOTICIAS} />
                            <Route element={<BusquedaUserPage />} path={PrivateRoutes.BUSCAR_USER} />
                            <Route element={<SolicitudesPage />} path={PrivateRoutes.SOLICITUDES} />
                            <Route element={<ReservasPage />} path={PrivateRoutes.RESERVAS} />
                            <Route element={<EncuestasPage />} path={PrivateRoutes.ENCUESTAS} />
                            <Route element={<RespuestasEncuestaPage />} path={PrivateRoutes.ENCUESTA} />
                            <Route element={<RespuestasUserEncuestaPage />} path={PrivateRoutes.RESPUESTAS_ENCUESTA} />
                            <Route element={<PreguntasPage />} path={PrivateRoutes.PREGUNTAS} />
                            <Route element={<RespuestasPage />} path={PrivateRoutes.RESPUESTAS} />
                            <Route element={<DisponibilidadEspacioPage />} path={PrivateRoutes.DISPONIBILIDAD_ESPACIO} />
                            <Route element={<PagosPage />} path={PrivateRoutes.PAGOS} />
                            <Route element={<RubrosPage />} path={PrivateRoutes.RUBROS} />
                            <Route element={<SociosPage />} path={PrivateRoutes.SOCIOS} />
                            <Route element={<ProgramacionPagosPage />} path={PrivateRoutes.PROGRAMACION_PAGOS} />
                            <Route element={<HistorialPagosPage />} path={PrivateRoutes.HISTORIAL_PAGOS} />
                            <Route element={<HistorialPagosCuotasPage />} path={PrivateRoutes.HISTORIAL_PAGOS_CUOTAS} />
                            <Route element={<PagarPage />} path={PrivateRoutes.PAGAR} />
                        </Route>
                        <Route element={<SocioGuard />}>
                            <Route element={<InvitadosPage />} path={PrivateRoutes.INVITADOS} />
                            <Route element={<FamiliaresPage />} path={PrivateRoutes.FAMILIARES} />
                        </Route>
                        <Route element={<AdminSocioGuard />}>
                            <Route element={<MensualidadesSocioPage />} path={PrivateRoutes.PAGOS_SOCIOS} />
                            <Route element={<CuotasBaileSocioPage />} path={PrivateRoutes.PAGOS_CUOTAS_BAILE} />
                        </Route>
                    </Route>
                    <Route element={<Page403 />} path={PrivateRoutes.PAGE403} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Rutas;