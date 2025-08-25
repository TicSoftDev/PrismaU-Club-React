import { FaUser, FaUsers, FaUserShield, FaUserTie } from 'react-icons/fa';

function CardsRoles({ consultar }) {

    const roles = [
        { id: 2, descripcion: 'Asociado', icono: <FaUserTie className='text-2xl' />, color: { bg: 'from-yellow-400 to-orange-300', icon: 'text-purple-50' } },
        { id: 3, descripcion: 'Adherente', icono: <FaUserTie className='text-2xl' />, color: { bg: 'from-green-400 to-emerald-500', icon: 'text-cyan-50' } },
        { id: 4, descripcion: 'Familiar', icono: <FaUsers className='text-2xl' />, color: { bg: 'from-purple-400 to-fuchsia-500', icon: 'text-cyan-50' } },
        { id: 5, descripcion: 'Empleado', icono: <FaUser className='text-2xl' />, color: { bg: 'from-red-500 to-red-400', icon: 'text-cyan-50' } },
        { id: 6, descripcion: 'Portero', icono: <FaUser className='text-2xl' />, color: { bg: 'from-yellow-400 to-orange-300', icon: 'text-cyan-50' } },
        { id: 7, descripcion: 'Administrativo', icono: <FaUser className='text-2xl' />, color: { bg: 'from-purple-400 to-fuchsia-500', icon: 'text-cyan-50' } },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-8">
            {roles.map((role) => (
                <div className="relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer"
                    onClick={() => consultar(role.id)} key={role.descripcion}>
                    <div className={`bg-gradient-to-br ${role.color.bg} p-4 flex items-center shadow-lg`}>
                        <div className={`p-2 rounded-full bg-white/30 backdrop-blur-md mr-5 ${role.color.icon}`}>
                            {role.icono}
                        </div>

                        <span className="text-lg font-semibold text-white">{role.descripcion}</span>

                        <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-white opacity-10"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-20"></div>
                        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-white opacity-60"></div>
                        <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-white opacity-20"></div>
                        <div className="absolute top-12 right-12 w-1 h-1 rounded-full bg-white opacity-80"></div>

                        <div className="absolute -top-2 -right-2 w-16 h-1 bg-white opacity-10 rotate-45"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-0.5 bg-white opacity-20 -rotate-45"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardsRoles;