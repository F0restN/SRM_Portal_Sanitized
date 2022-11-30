import React, { useEffect } from 'react';
import {
  StyledSemesterPanel,
  StyledSemesterPanelTitle,
} from '../StyledComponents';
import { Table } from 'react-bootstrap';
import { forEach, isEmpty } from 'underscore';
import { Badge } from 'reactstrap';

function SemesterPanel({ currentSelection, programSemesters }) {
  const displayCourseSelection = (displayArr) => {
    return displayArr.map((obj, index) => {
      return (
        <tr key={index}>
          <td>{obj.courseId}</td>
          <td>
            {obj.courseTitle}
            {obj.mark.isConflict ? (
              <Badge className="bg-warning text-dark">CONFLICT</Badge>
            ) : (
              ''
            )}
            {obj.mark.isValidity ? (
              ''
            ) : (
              <Badge className="bg-secondary text-light">ERROR</Badge>
            )}
          </td>
          <td>{obj.courseDay}</td>
          <td>{obj.courseTime}</td>
        </tr>
      );
    });
  };

  const displaySemesterPanel = () => {
    return programSemesters.map((semester, index) => {
      // Push into array according to semester
      let sliceYear = semester.slice(0, 4);
      let sliceTerm = semester.slice(4, semester.length);
      let displayArr = [];
      currentSelection?.forEach((obj, index) => {
        if (
          obj.courseYear.toString() === sliceYear &&
          obj.courseTerm === sliceTerm
        ) {
          displayArr.push({
            ...obj,
            mark: {
              isConflict: false,
              isValidity: true,
            },
          });
        }
      });

      // Conflict Checksum
      for (let i = 0; i < displayArr.length; i++) {
        let orgObj = displayArr[i];
        if (
          isEmpty(orgObj.courseDay) ||
          isEmpty(orgObj.courseTime) ||
          isEmpty(orgObj.courseTerm)
        ) {
          orgObj.mark.isValidity = false;
        }

        for (let j = 0; j < displayArr.length; j++) {
          let copObj = displayArr[j];
          if (
            copObj.courseId !== orgObj.courseId &&
            copObj.courseDay !== 'INDEP' &&
            copObj.courseTerm === orgObj.courseTerm &&
            copObj.courseYear === orgObj.courseYear &&
            copObj.courseTime === orgObj.courseTime &&
            copObj.courseDay === orgObj.courseDay
          ) {
            orgObj.mark.isConflict = true;
            copObj.mark.isConflict = true;
          }
        }
      }

      return (
        <StyledSemesterPanel key={index}>
          <StyledSemesterPanelTitle>{semester}</StyledSemesterPanelTitle>
          <Table striped bordered hover>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Course Title</th>
                <th>Day</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{displayCourseSelection(displayArr)}</tbody>
          </Table>
        </StyledSemesterPanel>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
      {displaySemesterPanel()}
    </div>
  );
}

export default SemesterPanel;
