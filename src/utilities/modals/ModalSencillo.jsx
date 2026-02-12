import { Modal } from 'flowbite-react'

export default function ModalSencillo({ titulo, size, children, openModal, cerrarModal }) {
    return (
        <Modal size={size} show={openModal} onClose={cerrarModal} className='!p-0'>
            <Modal.Header className='!p-4'>{titulo}</Modal.Header>
            <Modal.Body className="!p-4 h-[calc(100vh-4rem)] overflow-y-auto">
                {children}
            </Modal.Body>
        </Modal>
    )
}
