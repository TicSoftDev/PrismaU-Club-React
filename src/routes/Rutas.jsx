import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Plantilla from '../components/layouts/Plantilla';
import { PrivateRoutes, PublicRoutes } from '../models/RutasModel';
import AccesosPage from '../pages/admin/accesos/AccesosPage';
import AdherentesInactivosPage from '../pages/admin/adherentes/AdherentesInactivosPage';
import AdherentesPage from '../pages/admin/adherentes/AdherentesPage';
import AsociadosInactivosPage from '../pages/admin/asociados/AsociadosInactivosPage';
import AsociadosPage from '../pages/admin/asociados/AsociadosPage';
import EmpleadosPage from '../pages/admin/empleados/EmpleadosPage';
import EspaciosPage from '../pages/admin/espacios/EspaciosPage';
import LogEstadosPage from '../pages/admin/estados/LogEstadosPage';
import FamiliaresPage from '../pages/admin/familiares/FamiliaresPage';
import HobbiesPage from '../pages/admin/hobbies/HobbiesPage';
import InvitacionesPage from '../pages/admin/invitaciones/InvitacionesPage';
import RolesPage from '../pages/admin/roles/RolesPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import LoginPage from '../pages/login/LoginPage';
import PerfilPage from '../pages/perfil/PerfilPage';
import InvitadosPage from '../pages/socio/invitados/InvitadosPage';
import AuthGuard from '../utilities/guards/AuthGuard';
import { VerifyGuard } from '../utilities/guards/VerifyGuard';


const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<VerifyGuard />}>
                    <Route element={<LoginPage />} path={PublicRoutes.LOGIN} />
                </Route>
                <Route element={<AuthGuard />}>
                    <Route element={<Plantilla />}>
                        <Route element={<DashboardPage />} path={PrivateRoutes.DASHBOARD} />
                        <Route element={<AccesosPage />} path={PrivateRoutes.ACCESOS} />
                        <Route element={<PerfilPage />} path={PrivateRoutes.PERFIL} />
                        <Route element={<AsociadosPage />} path={PrivateRoutes.ASOCIADOS} />
                        <Route element={<AsociadosInactivosPage />} path={PrivateRoutes.ASOCIADOSINACTIVOS} />
                        <Route element={<AdherentesPage />} path={PrivateRoutes.ADHERENTES} />
                        <Route element={<AdherentesInactivosPage />} path={PrivateRoutes.ADHERENTESINACTIVOS} />
                        <Route element={<EmpleadosPage />} path={PrivateRoutes.EMPLEADOS} />
                        <Route element={<FamiliaresPage />} path={`${PrivateRoutes.FAMILIARES}/:id`} />
                        <Route element={<EspaciosPage />} path={PrivateRoutes.ESPACIOS} />
                        <Route element={<HobbiesPage />} path={PrivateRoutes.HOBBIES} />
                        <Route element={<RolesPage />} path={PrivateRoutes.ROLES} />
                        <Route element={<InvitadosPage />} path={PrivateRoutes.INVITADOS} />
                        <Route element={<InvitacionesPage />} path={PrivateRoutes.INVITACIONES} />
                        <Route element={<LogEstadosPage />} path={PrivateRoutes.ESTADOS} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Rutas;