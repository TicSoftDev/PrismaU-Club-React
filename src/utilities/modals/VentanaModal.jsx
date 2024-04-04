import { Button, Modal } from 'flowbite-react';
import React from 'react';

function VentanaModal({ titulo, size, children, openModal, cerrarModal, hanleSubmit }) {

    return (
        <Modal dismissible size={size} show={openModal} onClose={cerrarModal}>
            <Modal.Header>{titulo}</Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={hanleSubmit}>Guardar</Button>
                <Button color="gray" onClick={cerrarModal}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VentanaModal;