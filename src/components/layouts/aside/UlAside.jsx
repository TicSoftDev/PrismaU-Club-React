import React from 'react';
import { useSelector } from 'react-redux';
import { getMenuItemsByRole } from '../../../models/ItemsSidebarModel';
import Link from './LinkAside';
import LinkInicio from './LinkInicio';

function UlAside() {

    const rol = useSelector((state) => state.credenciales.Rol);
    const items = getMenuItemsByRole(rol);

    return (
        <ul className="space-y-2 font-medium">
            <LinkInicio />
            {
                items.map((item) => (
                    <Link menu={item} key={item.texto} activeSubroutes={item.activeSubroutes} />
                ))
            }
        </ul>
    );
}

export default UlAside;