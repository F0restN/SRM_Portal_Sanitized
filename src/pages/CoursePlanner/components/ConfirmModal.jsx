import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ConfirmPanel({ show, onHide, setCurrentSelection, setResetFlag }) {
  const handleConfirm = () => {
    setCurrentSelection();
    setResetFlag();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> Reset selections </h4>
        <p>
          Reset will empty all your selections, are you sure you want to do this
          ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmPanel;
