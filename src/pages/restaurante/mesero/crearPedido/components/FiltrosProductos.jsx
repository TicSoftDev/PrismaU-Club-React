import { TextInput } from "flowbite-react"

export default function FiltrosProductos({ filtro, busqueda, handleChangeBusqueda, handleChangeTipo, hayPedido }) {

    const FOOD_CATEGORIES = [
        { name: "Todos", icon: "🥗", },
        { name: "Desayuno", icon: "🌅", },
        { name: "Almuerzo", icon: "🍽️", },
        { name: "Cena", icon: "🌙", },
        { name: "Bebida", icon: "🍹", },
    ]

    return (
        <>
            <div className="w-full">
                <div className="flex gap-2 flex-wrap">
                    {FOOD_CATEGORIES.map((category) => (
                        <button key={category.name} type="button" onClick={() => { handleChangeTipo(category.name) }}
                            className={`px-4 py-2 rounded-lg font-medium transition 
                                ${filtro === category.name ? "bg-blue-600 text-white shadow-lg" : "bg-slate-200  text-slate-700 dark:text-slate-300 hover:bg-slate-300"}
                            ${hayPedido ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={hayPedido}
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </div>
            </div>
            <TextInput type="text" placeholder="Ej: Hamburguesa, Pasta..." value={busqueda}
                className="w-full sm:w-2/3" onChange={handleChangeBusqueda} disabled={hayPedido} />
        </>
    )
}
