import React from 'react'
import { Modal } from 'react-bootstrap'

export default function CModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                {props.body}
            </Modal.Body>
        </Modal>
    )
}
