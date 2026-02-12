import { useState } from 'react';
import apiQueryPedidoCerrado from '../api/apiQueryPedidoCerrado';

export default function usePedidoCerrado() {

    const { isLoading, pedidosCerrados } = apiQueryPedidoCerrado();

    const [pedido, setPedido] = useState({});
    const [openModal, setOpenModal] = useState(false);

    /*=========== Ver pedido ==============================*/

    const cargarPedido = (pedido) => {
        setPedido(pedido);
        setOpenModal(true);
    }

    const toggleModal = () => setOpenModal(!openModal);

    return {
        titulo: 'Pedidos Cerrados',
        tituloModal: 'Detalle del pedido',
        isLoading,
        pedidosCerrados,
        pedido,
        openModal,
        cargarPedido,
        toggleModal,
    }

}
