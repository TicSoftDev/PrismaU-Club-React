import { useState } from 'react';
import { alertConfirm, alertError, alertSucces } from '../../../../../utilities/alerts/Alertas';
import apiQueryPedido from '../api/apiQueryPedido';

export default function usePedido() {

    const { isLoading, pedidos, isPending, loadingEstado, loadingPlato,
        cambiarEstadoMutation, cambiarEstadoPlatoMutation } = apiQueryPedido();

    const [accionCargando, setAccionCargando] = useState(null);

    //============= Cambiar estado =====================

    const cambiarEstado = async (id, estado, accion) => {
        if (await alertConfirm('¿Estás seguro de cambiar el estado de este pedido?', 'Sí, cambiar')) {
            setAccionCargando(accion);
            cambiarEstadoMutation({ id, estado }, {
                onSuccess: (data) => {
                    alertSucces(data.message);
                },
                onError: (error) => {console.log(error); alertError(`Error: ${error.message}`); },
                onSettled: () => { setAccionCargando(null); }
            });
        }
    };

    const cambiarEstadoPlato = async (id, estado, accion) => {
        if (await alertConfirm('¿Estás seguro de cambiar el estado de este plato?', 'Sí, cambiar')) {
            setAccionCargando(accion);
            cambiarEstadoPlatoMutation({ id, estado }, {
                onSuccess: (data) => {
                    alertSucces(data.message);
                },
                onError: (error) => { alertError(`Error: ${error.message}`); },
                onSettled: () => { setAccionCargando(null); }
            });
        }
    };

    /*============= Pagar pedido =============================*/

    const prepararPedido = async (idPedido) => {
        if (await alertConfirm('¿Desea marcar este pedido como listo?', isPending ? 'Procesando...' : 'Sí, preparado')) {
            prepararPedidoMutation(idPedido, {
                onSuccess: (data) => { alertSucces(data.message); },
                onError: (error) => { alertError(`Error: ${error.message}`); }
            });
        }
    };

    return {
        isLoading,
        pedidos,
        loadingEstado,
        loadingPlato,
        accionCargando,
        prepararPedido,
        cambiarEstado,
        cambiarEstadoPlato
    }

}
