import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

function OptionsDropDown({
  options,
  selectedDay,
  setDay,
  selectedTime,
  setTime,
  selectedTerm,
  selectedYear,
  resetFlag,
  setResetFlag,
  emptySelection,
}) {
  // Reset function
  useEffect(() => {
    if (resetFlag === true) {
      setDay('NA');
      setTime('NA');
      setResetFlag(false);
    }
  }, [resetFlag]);

  const handleChange = (event) => {
    const option = event.target.value.split(' ');
    if (option[0] === 'NA' && option[1] === 'NA') {
      emptySelection();
    }
    setDay(option[0]);
    setTime(option[1]);
  };

  return (
    <td>
      <Form>
        <Form.Control
          disabled={
            selectedTerm == '' || selectedYear == '' || selectedTerm === 'NA'
          }
          value={`${selectedDay} ${selectedTime}`}
          as="select"
          onChange={handleChange}
        >
          <option key={10} value="NA NA" />
          {options.map((dt, index) => {
            const value = `${dt[0]} ${dt[1]}`;
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
        </Form.Control>
      </Form>
    </td>
  );
}

export default OptionsDropDown;
