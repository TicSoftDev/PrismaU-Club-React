import { Modal } from 'flowbite-react'
import React from 'react'

export default function ModalSencillo({ titulo, size, children, openModal, cerrarModal }) {
    return (
        <Modal dismissible size={size} show={openModal} onClose={cerrarModal}>
            <Modal.Header>{titulo}</Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
