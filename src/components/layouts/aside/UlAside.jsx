import React from 'react';
import { useSelector } from 'react-redux';
import { PrivateRoutes } from '../../../models/RutasModel';
import Link from './LinkAside';
import LinkInicio from './LinkInicio';

function UlAside() {

    const admin = [
        { icono: "search", texto: "Buscar Usuario", color: "purple", opacidad: '600', link: PrivateRoutes.BUSCAR_USER },
        { icono: "user-tie", texto: "Asociados", color: "red", opacidad: '600', link: PrivateRoutes.ASOCIADOS, activeSubroutes: [PrivateRoutes.FAMILIARESASOCIADO] },
        { icono: "user-tie", texto: "Adherentes", color: "yellow", opacidad: '400', link: PrivateRoutes.ADHERENTES, activeSubroutes: [PrivateRoutes.FAMILIARESADHERENTE] },
        { icono: "users", texto: "Empleados", color: "green", opacidad: '600', link: PrivateRoutes.EMPLEADOS },
        { icono: "map-marked-alt", texto: "Espacios", color: "purple", opacidad: '600', link: PrivateRoutes.ESPACIOS },
        { icono: "newspaper", texto: "Noticias", color: "red", opacidad: '600', link: PrivateRoutes.NOTICIAS },
        { icono: "user-clock", texto: "Invitaciones", color: "yellow", opacidad: '400', link: PrivateRoutes.INVITACIONES },
        { icono: "id-badge", texto: "Control Accesos", color: "green", opacidad: '600', link: PrivateRoutes.ACCESOS },
        { icono: "history", texto: "Log Estados", color: "purple", opacidad: '600', link: PrivateRoutes.ESTADOS },
    ];

    const superAdminUnique = [
        { icono: "file-contract", texto: "Contrataciones", color: "purple", opacidad: '600', link: PrivateRoutes.CONTRATOS },
        { icono: "user-shield", texto: "Administradores", color: "red", opacidad: '600', link: PrivateRoutes.ADMINISTRADORES },
        { icono: "user-cog", texto: "Roles", color: "yellow", opacidad: '400', link: PrivateRoutes.ROLES },
        { icono: "magic", texto: "Hobbies", color: "green", opacidad: '600', link: PrivateRoutes.HOBBIES },
    ];

    const superAdmin = [...superAdminUnique, ...admin];

    const socio = [
        { icono: "user-clock", texto: "Invitados", color: "purple", opacidad: '600', link: PrivateRoutes.INVITADOS },
        { icono: "users", texto: "Familiares", color: "pink", opacidad: '600', link: PrivateRoutes.FAMILIARES },
    ];

    const usuario = useSelector((state) => state.credenciales);
    const items = usuario.Rol == 0 ? superAdmin : usuario.Rol == 1 ? admin : socio;

    return (
        <ul className="space-y-2 font-medium">
            <LinkInicio />
            {items.map((item) => (
                <Link menu={item} key={item.texto} activeSubroutes={item.activeSubroutes} />
            ))}
        </ul>
    );
}

export default UlAside;