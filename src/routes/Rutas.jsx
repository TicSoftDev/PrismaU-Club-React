import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../models/RutasModel';
import AuthGuard from '../utilities/guards/AuthGuard';
import LoginPage from '../pages/login/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AsociadosPage from '../pages/admin/asociados/AsociadosPage';
import AdherentesPage from '../pages/admin/adherentes/AdherentesPage';
import EmpleadosPage from '../pages/admin/empleados/EmpleadosPage';
import FamiliaresPage from '../pages/admin/familiares/FamiliaresPage';
import RolesPage from '../pages/admin/roles/RolesPage';
import EspaciosPage from '../pages/admin/espacios/EspaciosPage';
import AsociadosInactivosPage from '../pages/admin/asociados/AsociadosInactivosPage';
import AdherentesInactivosPage from '../pages/admin/adherentes/AdherentesInactivosPage';
import PerfilPage from '../pages/perfil/PerfilPage';
import HobbiesPage from '../pages/admin/hobbies/HobbiesPage';


const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoginPage />} path={PublicRoutes.LOGIN} />
                <Route element={<AuthGuard />}>
                    <Route element={<DashboardPage />} path={PrivateRoutes.DASHBOARD} />
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
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Rutas;