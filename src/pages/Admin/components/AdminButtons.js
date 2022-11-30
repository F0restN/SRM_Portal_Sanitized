import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export default function AdminButtons(props) {
  const [addStudents, setAddStudents] = useState(false);
  const [addAlumnis, setAddAlumnis] = useState(false);
  const [importStudents, setImportStudents] = useState(false);
  const [importAlumniSurveys, setImportAlumniSurveys] = useState(false);
  const history = useHistory();
  function addStudent() {
    setAddStudents((prev) => {
      return !prev;
    });
  }
  function importStudent() {
    setImportStudents((prev) => {
      return !prev;
    });
  }
  function addAlumni() {
    setAddAlumnis((prev) => {
      return !prev;
    });
  }
  function importAlumniSurvey() {
    setImportAlumniSurveys((prev) => {
      return !prev;
    });
  }

  return (
    <>
      {props.alumniTrigger === true ? (
        <div>
          <Button
            className="col"
            color="primary"
            outline={true}
            onClick={addAlumni}
          >
            {' '}
            + New Alumni{' '}
          </Button>{' '}
          &nbsp;&nbsp;&nbsp;
          <Button
            className="col"
            color="primary"
            outline={!importAlumniSurveys}
            onClick={importAlumniSurvey}
          >
            {' '}
            Import Alumni Survey{' '}
          </Button>
          <div className="col"></div>
          <div className="col"></div> <div className="col"></div>
          <div className="col"></div> <div className="col"></div>
        </div>
      ) : (
        ''
      )}

      {props.studentTrigger === true ? (
        <div>
          {' '}
          <Button
            className="col"
            color="primary"
            outline={!addStudents}
            onClick={addStudent}
          >
            + New Student{' '}
          </Button>{' '}
          &nbsp;&nbsp;&nbsp;{' '}
          <Button
            className="col"
            color="primary"
            outline={!importStudents}
            onClick={importStudent}
          >
            Import New Students{' '}
          </Button>
          <div className="col"></div> <div className="col"></div>{' '}
          <div className="col"></div> <div className="col"></div>
          <div className="col"></div>
        </div>
      ) : (
        ''
      )}

      {addStudents === true ? history.push('/StudentInfo/:0') : ''}
      {importStudents === true ? history.push('/AdminImportStudents') : ''}
      {importAlumniSurveys === true
        ? history.push('/AdminImportAlumniSurvey')
        : ''}
      {addAlumnis === true ? history.push('/AdminAddAlumni') : ''}
    </>
  );
}
