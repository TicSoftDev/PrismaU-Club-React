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
            {items.map((menu, index) =>
                menu.isTitle ? (
                    <li key={`title-${index}`} className="text-gray-500 uppercase text-xs font-semibold mt-4 mb-2">
                        {menu.texto}
                    </li>
                ) : (
                    <Link menu={menu} key={menu.texto} activeSubroutes={menu.activeSubroutes} />
                ))
            }
        </ul>
    );
}

export default UlAside;