'use client';

import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

function LoadingModal({show, text="Loading..."}: any) {
    return <Modal show={show} centered={true}>
        <Modal.Body className="text-center py-5">
            <Spinner animation="border"/>
            <p className="mt-3 mb-0">{text}</p>
        </Modal.Body>
    </Modal>;
}

export default LoadingModal;