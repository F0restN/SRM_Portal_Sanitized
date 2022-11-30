/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Label } from 'reactstrap';
import axios from 'axios';
import store from '../../../store/store';
import { CONFIG } from '../../../ENV';
import { errorMssgExtract } from '../../../utils/errorHandleTools';

function TemplateSelection({
  show,
  student,
  onHide,
  setCurrentSelection,
  transactionId,
  programSemesters,
  fetchConfig,
  sendNotification,
}) {
  const [studentProgram, setStudentProgram] = useState(
    student.studentInfo.program.name
  );
  const [studentStatus, setStudentStatus] = useState(
    student.studentInfo.status
  );

  const autoPopulate = async () => {
    await axios
      .post(
        `${CONFIG.PORTAL}/templates/getTemplateByStudent`,
        {
          startYear: student.studentInfo.start_year,
          startTerm: student.studentInfo.start_term,
          type: student.studentInfo.type,
          status: studentStatus,
          program: studentProgram,
          programSemesters: programSemesters,
        },
        fetchConfig
      )
      .then((res) => {
        const { data } = res.data;
        if (data !== null && data.length !== 0) {
          const padArr = data.map((item) => ({
            ...item,
            transactionId,
          }));
          setTimeout(() => {
            setCurrentSelection(padArr);
          }, 0);
        }
        sendNotification(res.data.status, res.data.mssg);
        onHide();
      })
      .catch((error) => {
        const mssg = errorMssgExtract(error);
        sendNotification('error', mssg);
        console.error(error);
      });
  };

  const handleStatusSelect = (event) => {
    setStudentStatus(event.target.value);
  };

  const handleProgramSelect = (event) => {
    setStudentProgram(event.target.value);
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
        <Modal.Title id="contained-modal-title-vcenter">
          Template Selection
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <p className="mt-2">
            NOTICE : Auto-populate will overwrite all your selections
          </p>
          <Label>Track for student</Label>
          <Form.Select
            value={studentProgram}
            aria-label="Default select example"
            onChange={handleProgramSelect}
          >
            <option value="DS">Data Science</option>
            <option value="HI">Health Informatics</option>
            <option value="HSM">Healthcare Supervision and Management</option>
            <option value="RHIA">
              Registered Health Information Administrator
            </option>
          </Form.Select>
          <Label className="mt-2">Student Status</Label>
          <Form.Select
            value={studentStatus}
            aria-label="Default select example"
            onChange={handleStatusSelect}
          >
            <option value="FT">Full-time</option>
            <option value="PT">Part-time</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={autoPopulate}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TemplateSelection;
