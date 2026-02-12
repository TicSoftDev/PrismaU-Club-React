import { formatearMoneda } from '../../../../../models/FormateadorModel';
import { RouteBack } from '../../../../../models/RutasModel';
import NoData from '../../../../../utilities/helpers/NoData';

export default function CardsProductos({ productos = [], agregarItem, hayPedido }) {

    if (!productos || productos.length === 0) return <NoData mensaje="No hay inventario para hoy." />;

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((product) => (
                <div key={product.id} onClick={() => { if (!hayPedido) agregarItem(product.itemable, product.itemable_type, product.id, product.inventario_id) }}
                    className={`border border-gray-200 rounded-lg p-2 transition-shadow duration-300 ${hayPedido ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex">
                            <img src={RouteBack + product.itemable.imagen} alt={product.id} className="w-28 h-20 object-contain rounded-lg" />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                                <h5 className="font-semibold text-gray-800">
                                    {product.itemable.comida ?? product.itemable.bebida}
                                </h5>
                                <p className="text-sm text-gray-500 mb-1">
                                    {product.itemable.ingredientes ?? "Bebida"}
                                </p>
                            </div>
                            <span className="font-bold text-green-600">
                                {formatearMoneda(product.itemable.precio)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}