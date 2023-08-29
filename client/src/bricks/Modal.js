import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OkCancelModal = ({messageTitle, message, show, onOk, onCancel}) => {

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{messageTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                {onCancel && <Button variant="secondary" onClick={onCancel}>Close</Button>}
                {onOk && <Button variant="primary" onClick={onOk}>OK</Button>}
            </Modal.Footer>
        </Modal>
    )
}

export default OkCancelModal
