import React from 'react';
import { useSelector } from 'react-redux';
import { PrivateRoutes } from '../../../models/RutasModel';
import Link from './LinkAside';
import LinkInicio from './LinkInicio';

function UlAside() {

    const admin = [
        { icono: "user-tie", texto: "Asociados", color: "purple", opacidad: '600', link: PrivateRoutes.ASOCIADOS },
        { icono: "user-tie", texto: "Adherentes", color: "pink", opacidad: '600', link: PrivateRoutes.ADHERENTES },
        { icono: "users", texto: "Empleados", color: "red", opacidad: '600', link: PrivateRoutes.EMPLEADOS },
        { icono: "map-marked-alt", texto: "Espacios", color: "yellow", opacidad: '400', link: PrivateRoutes.ESPACIOS },
        { icono: "user-cog", texto: "Roles", color: "green", opacidad: '500', link: PrivateRoutes.ROLES },
        { icono: "magic", texto: "Hobbies", color: "purple", opacidad: '600', link: PrivateRoutes.HOBBIES },
        { icono: "user-clock", texto: "Invitaciones", color: "pink", opacidad: '600', link: PrivateRoutes.INVITACIONES },
        { icono: "briefcase", texto: "Cargos", color: "red", opacidad: '600', link: PrivateRoutes.CARGOS },
        { icono: "id-badge", texto: "Control Accesos", color: "yellow", opacidad: '400', link: PrivateRoutes.ACCESOS },
        { icono: "history", texto: "Log Estados", color: "green", opacidad: '500', link: PrivateRoutes.ESTADOS },
    ];
    const socio = [
        { icono: "user-clock", texto: "Invitados", color: "purple", opacidad: '600', link: PrivateRoutes.INVITADOS },
    ];
    const usuario = useSelector((state) => state.credenciales);
    const items = usuario.Rol === "1" ? admin : socio;

    return (
        <ul className="space-y-2 font-medium">
            <LinkInicio />
            {
                items.map((item) => (
                    <Link menu={item} key={item.texto} />
                ))
            }

        </ul>
    );
}

export default UlAside;