import React from 'react';
import { Input, Label } from 'reactstrap';

const ViewOrEditField = ({
  updateInfo,
  fieldName,
  fieldValue,
  isDisabled,
  studentInfoKey,
  inputType,
}) => {
  if (!inputType) {
    inputType = 'text';
  }
  function handleChange(changedValue, fieldName) {
    updateInfo(changedValue, fieldName);
  }
  return (
    <>
      <td>
        <Label for={studentInfoKey}>{fieldName}</Label>
        <Input
          type={inputType}
          disabled={isDisabled}
          defaultValue={fieldValue ? fieldValue : ''}
          onChange={(e) => handleChange(e.target.value, studentInfoKey)}
          name={studentInfoKey}
        />
      </td>
    </>
  );
};

export default ViewOrEditField;
