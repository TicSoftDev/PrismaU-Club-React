import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Plantilla from '../components/layouts/Plantilla';
import { PrivateRoutes, PublicRoutes } from '../models/RutasModel';
import AccesosPage from '../pages/admin/accesos/AccesosPage';
import AdherentesPage from '../pages/admin/adherentes/AdherentesPage';
import AsociadosPage from '../pages/admin/asociados/AsociadosPage';
import BusquedaUserPage from '../pages/admin/busquedaUser/BusquedaUserPage';
import EmpleadosPage from '../pages/admin/empleados/EmpleadosPage';
import EspaciosPage from '../pages/admin/espacios/EspaciosPage';
import LogEstadosPage from '../pages/admin/estados/LogEstadosPage';
import FamiliaresAdherentePage from '../pages/admin/familiares/FamiliaresAdherentePage';
import FamiliaresAsociadoPage from '../pages/admin/familiares/FamiliaresAsociadoPage';
import InvitacionesPage from '../pages/admin/invitaciones/InvitacionesPage';
import NoticiasPage from '../pages/admin/noticias/NoticiasPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import Page403 from '../pages/errors/Page403';
import LoginPage from '../pages/login/LoginPage';
import PerfilPage from '../pages/perfil/PerfilPage';
import ChangePassword from '../pages/reset/ChangePassword';
import RecuperacionPage from '../pages/reset/RecuperacionPage';
import VerifyCodePage from '../pages/reset/VerifyCodePage';
import FamiliaresPage from '../pages/socio/familiares/FamiliaresPage';
import InvitadosPage from '../pages/socio/invitados/InvitadosPage';
import AdministradoresPage from '../pages/superAdmin/administradores/AdministradoresPage';
import ContratacionesPage from '../pages/superAdmin/contrataciones/ContratacionesPage';
import HobbiesPage from '../pages/superAdmin/hobbies/HobbiesPage';
import RolesPage from '../pages/superAdmin/roles/RolesPage';
import AuthGuard from '../utilities/guards/AuthGuard';
import { AdminGuard, SocioGuard, SuperadminGuard } from '../utilities/guards/RolGuard';
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
                        </Route>
                        <Route element={<SocioGuard />}>
                            <Route element={<InvitadosPage />} path={PrivateRoutes.INVITADOS} />
                            <Route element={<FamiliaresPage />} path={PrivateRoutes.FAMILIARES} />
                        </Route>
                    </Route>
                    <Route element={<Page403 />} path={PrivateRoutes.PAGE403} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Rutas;