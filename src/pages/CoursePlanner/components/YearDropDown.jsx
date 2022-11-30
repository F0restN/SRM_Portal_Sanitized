import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Row,
  CloseButton,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { getDayOfYear, getYear, formatISO } from 'date-fns';

function YearDropDown({
  courseAvailYear,
  selectedYear,
  setYear,
  resetFlag,
  setResetFlag,
}) {
  // For reset function
  useEffect(() => {
    if (resetFlag === true) {
      setYear('');
      setResetFlag(false);
    }
  }, [resetFlag]);

  const dataSelect = (date) => {
    if (date) {
      const year = getYear(date).toString();
      setYear(year);
    } else {
      setYear('');
    }
  };

  return (
    <div>
      <Form className="col-sm" defaultValue={selectedYear}>
        <Row>
          <div className="col-sm">
            <DatePicker
              className="form-control"
              selected={
                selectedYear ? new Date(selectedYear, 1, 1, 12, 1, 1) : null
              }
              onChange={dataSelect}
              yearItemNumber={10}
              dateFormat="yyyy"
              showYearPicker
              closeOnScroll
              placeholderText={null}
              // isClearable
              // value={selectedYear}
              // as="select"
            />
          </div>
        </Row>
      </Form>
    </div>
  );
}

export default YearDropDown;
