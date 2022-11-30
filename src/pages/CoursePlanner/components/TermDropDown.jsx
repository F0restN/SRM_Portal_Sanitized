/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Select, MenuItem, FormControl } from '@mui/material';

function TermDropDown({
  courseAvailTerm,
  setTerm,
  setDay,
  setTime,
  resetFlag,
  setResetFlag,
  selectedYear,
  selectedTerm,
  emptySelection,
}) {
  // Reset Function
  useEffect(() => {
    if (resetFlag === true) {
      setTerm('NA');
      setResetFlag(false);
    }
  }, [resetFlag]);

  const handleChange = (event) => {
    const option = event.target.value;
    if (option === 'NA') {
      emptySelection();
      setTerm('');
    } else {
      setTerm(option);
    }
  };

  return (
    <Form>
      <Form.Control value={selectedTerm} as="select" onChange={handleChange}>
        <option value="NA" />
        {courseAvailTerm.map((term, index) => (
          <option key={index} value={term}>
            {term}
          </option>
        ))}
      </Form.Control>
    </Form>
    // <FormControl fullWidth>
    //   <Select
    //     inputProps={{ 'aria-label': 'Without label' }}
    //     value={selectedTerm}
    //     label="Term"
    //     onChange={handleChange}
    //   >
    //     <MenuItem key={10} value="">
    //       NONE
    //     </MenuItem>
    //     {courseAvailTerm.map((term, index) => (
    //       <MenuItem key={index} value={term}>
    //         {term}
    //       </MenuItem>
    //     ))}
    //   </Select>
    // </FormControl>
  );
}

export default TermDropDown;
