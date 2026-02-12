import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppLocation } from "../../../../../hooks/useStore";
import { alertError, alertSucces, alertWarning } from "../../../../../utilities/alerts/Alertas";
import apiQueryDetallePreinventario from "../api/apiQueryDetallePreinventario";

export default function useDetallePreinventario() {

    const preinv = useAppLocation()?.state?.preinventario;
    const id = preinv?.id;

    const { productos, isLoading, isPending, guardarDetalleMutation } = apiQueryDetallePreinventario(id);

    const [productosEdit, setProductosEdit] = useState([]);

    useEffect(() => {
        if (Array.isArray(productos)) {
            setProductosEdit(
                productos.map((p) => ({
                    ...p,
                    rowKey: `${p.type}-${p.id}`,
                    incluido: !!p.incluido,
                    cantidad_default: Number(p.cantidad_default ?? 0),
                }))
            );
        }
    }, [productos]);

    const toggleIncluir = useCallback((row) => {
        setProductosEdit((prev) =>
            prev.map((p) => {
                if (p.id !== row.id || p.type !== row.type) return p;
                const nextIncluido = !p.incluido;
                return {
                    ...p,
                    incluido: nextIncluido,
                    cantidad_default: nextIncluido ? (Number(p.cantidad_default) === 0 ? 1 : p.cantidad_default) : 0,
                };
            })
        );
    }, []);

    const changeCantidad = useCallback((row, value) => {
        const n = Math.max(0, Math.floor(Number(value || 0)));

        setProductosEdit((prev) =>
            prev.map((p) =>
                p.id === row.id && p.type === row.type
                    ? {
                        ...p,
                        cantidad_default: n,
                        incluido: n > 0 ? true : p.incluido,
                    }
                    : p
            )
        );
    }, []);

    const guardar = useCallback(async () => {
        if (!id) return alertWarning("No hay preinventario seleccionado.");
        const data = productosEdit.filter((p) => p.incluido).map((p) => ({
            type: p.type,
            id: p.id,
            cantidad_default: Number(p.cantidad_default || 0),
        }));
        guardarDetalleMutation({ id, data }, {
            onSuccess: (res) => {
                if (res.status) {
                    alertSucces(res.message);
                } else {
                    res.errors.forEach((err) => alertWarning(err));
                }
            },
            onError: (err) => { alertError(err.message); },
        });

    }, [id, productosEdit]);

    const totalSeleccionados = useMemo(
        () => productosEdit.filter((p) => p.incluido).length,
        [productosEdit]
    );

    return {
        titulo: "Detalles Preinventario",
        productos: productosEdit,
        isLoading,
        isPending,
        totalSeleccionados,
        toggleIncluir,
        changeCantidad,
        guardar,
    };
}
