import { FaSave } from "react-icons/fa";
import Spinner from "../../../../../utilities/spinner/Spinner";

export default function HeaderPreinventario({ total, loading, guardar }) {
    return (
        <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-600">
                Seleccionados: <b>{total}</b>
            </span>

            <button className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={guardar} disabled={loading}>
                <FaSave />
                {loading ? <Spinner /> : 'Guardar'}
            </button>
        </div>
    )
}
