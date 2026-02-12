import imagen from '../../assets/img/imagen';

export default function LoadingComponent() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5.5rem)] bg-gradient-to-br from-green-100 via-blue-100 to-orange-100 relative overflow-hidden">
            
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center">


                <div className="relative w-48 h-48 flex items-center justify-center">

    
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-600/40 border-r-green-500/40 animate-spin" style={{ animationDuration: '3s' }}></div>

    
                    <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-orange-500/40 border-l-orange-500/40" style={{ animation: 'spin 2s linear infinite reverse' }}></div>

    
                    <div className="absolute inset-8 rounded-full border-2 border-transparent border-t-purple-500/35 border-r-purple-500/35 animate-spin" style={{ animationDuration: '1.5s' }}></div>

    
                    <div className="relative w-32 h-32 flex items-center justify-center overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <img src={imagen.logoPrisma} alt="PRISMA Logo" className="w-24 h-24 object-contain relative z-10 drop-shadow-2xl" />

                        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/20 to-transparent blur-xl"></div>
                    </div>

    
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                        <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-green-500 rounded-full shadow-lg shadow-green-500/40"></div>
                    </div>

                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                        <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 bg-orange-500 rounded-full shadow-lg shadow-orange-500/40"></div>
                    </div>

                    <div className="absolute inset-0" style={{ animation: 'spin 3.5s linear infinite reverse' }}>
                        <div className="absolute top-1/2 right-0 w-2.5 h-2.5 -mt-1.25 bg-purple-500 rounded-full shadow-lg shadow-purple-500/40"></div>
                    </div>

                </div>


                <div className="items-center justify-center mt-8 w-72 h-1.5 bg-gray-200/60 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                    <div
                        className="h-full bg-green-500 rounded-full animate-pulse"
                        style={{
                            width: '60%',
                            animation: 'loading 2s ease-in-out infinite'
                        }}
                    ></div>
                </div>


                <div className="mt-6 text-center">
                    <p className="text-xl font-medium text-gray-900 animate-pulse">Cargando...</p>

                    <div className="flex justify-center space-x-2 mt-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce shadow-md shadow-green-500/30"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce shadow-md shadow-orange-500/30" style={{ animationDelay: '0.4s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce shadow-md shadow-purple-500/30" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes loading {
                    0%, 100% {
                        width: 30%;
                        margin-left: 0;
                    }
                    50% {
                        width: 70%;
                        margin-left: 30%;
                    }
                }
            `}</style>
        </div>
    );
}
