import { Button, Modal } from 'flowbite-react';
import Spinner from '../spinner/Spinner';

function VentanaModal({ titulo, size, children, openModal, cerrarModal, hanleSubmit, loading }) {

    return (
        <Modal size={size} show={openModal} onClose={cerrarModal}>
            <Modal.Header>{titulo}</Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button type='button' onClick={hanleSubmit}>{loading ? <Spinner /> : 'Guardar'}</Button>
                <Button type='button' color="gray" onClick={cerrarModal}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VentanaModal;