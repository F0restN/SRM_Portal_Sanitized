import React from 'react';
import { Input, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

const ViewOrEditSelector = ({
  updateInfo,
  fieldName,
  fieldValue,
  isDisabled,
  studentInfoKey,
  selectOptions,
}) => {
  function handleChange(changedValue, fieldName) {
    updateInfo(changedValue, fieldName);
  }
  return (
    <>
      <td>
        <Label for={studentInfoKey}>{fieldName}</Label>

        <Input
          disabled={isDisabled}
          type="select"
          defaultValue={fieldValue ? fieldValue : ''}
          onChange={(e) => handleChange(e.target.value, studentInfoKey)}
        >
          <option value="" disabled>
            {fieldName}
          </option>
          {selectOptions.map((x) => {
            return (
              <option key={x.value} title={x.label} value={x.value}>
                {x.label}
              </option>
            );
          })}
        </Input>
      </td>
    </>
  );
};

export default ViewOrEditSelector;
