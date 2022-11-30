/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Divider,
  LinearProgress,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';
import _, { isNull } from 'underscore';
import { useHistory, useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store/store';
import {
  StyledButtonRow,
  StyledDeconstructedPancake,
  StyledHeader,
  StyledSandwichLayouts,
  StyledTable,
  StyledTableOfButton,
  StyledTableOfTable,
  Visualize,
} from './StyledComponents';
import CourseRow from './components/CourseRow';
import SemesterPanel from './components/SemesterPanel';
import TemplateSelection from './components/TemplateSelection';
import ConfirmModal from './components/ConfirmModal';
import reducer from './reducer/Reducer';
import { ACTIONS } from './reducer/ACTIONS';
import CourseFetch from './hooks/CourseFetch';
import { CONFIG } from '../../ENV';
import StudentFetch from './hooks/StudentFetch';
import ProgramSemestersFetch from './hooks/ProgramSemestersFetch';
import TransactionFetch from './hooks/TransactionFetch';
import SelectedCoursesFetch from './hooks/SelectedCoursesFetch';
import StudentInfoPanel from './components/StudentInfoPanel';
import { NotificationContext } from '../../context/NotificationContext';
import { determineLastSemester } from '../../utils/termTools';
import MainCard from '../../components/MainCard';

function CoursePlanner(props) {
  const history = useHistory();
  const authenticationStatus = store.getState();
  const { state, dispatch } = useContext(NotificationContext);
  // Initialize
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [programSemesters, setProgramSemesters] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([]);
  const [resetFlag, setResetFlag] = useState(false);
  const [templateModalShow, setTemplateModalShow] = useState(false);
  const [ConfirmModalShow, setConfirmModalShow] = useState(false);
  const [transactionId, setTransactionId] = useState(0);
  const [transaction1, setTransaction1] = useState([]);
  const [transaction2, setTransaction2] = useState([]);
  const [isRendering, setIsRendering] = useState(false);
  // Save for later
  const [coreCourses, setCoreCourses] = useState([
    '2020',
    '2210',
    '2250',
    '2670',
    '2454',
    '2453',
    '2451',
  ]);

  const fetchConfig = {
    headers: { Authorization: `Bearer ${authenticationStatus.jwtToken}` },
  };

  // Initialize
  useEffect(async () => {
    const id = Number(history.location.search.split('?')[1]);
    // const fetchConfig = {
    //   headers: { Authorization: `Bearer ${authenticationStatus.jwtToken}` },
    // };

    // Step1. Get student info
    const [studentLoading, studentError, studentData] = await StudentFetch(
      { id },
      fetchConfig
    );
    setStudent(studentData);

    // Step2. Retrieve all available courses info
    const [courseLoading, courseError, courseData] = await CourseFetch(
      { type: studentData.studentInfo.type },
      fetchConfig
    );
    setCourses(courseData);

    // Step3. Get student semesters info
    const [psLoading, psError, psData] = await ProgramSemestersFetch(
      {
        student_start_term: studentData.studentInfo.start_term,
        student_start_year: studentData.studentInfo.start_year,
        program_duration: studentData.studentInfo.program.duration,
      },
      fetchConfig
    );
    setProgramSemesters(psData);

    // Step4. Retrieve selected courses info
    const [selectionLoading, selectionError, selectionData] =
      await SelectedCoursesFetch({ studentId: id }, fetchConfig);
    setCurrentSelection(selectionData);

    // Step5. Retrieve transaction History
    const [transactionLoading, transactionError, transactionData] =
      await TransactionFetch({ studentId: id }, fetchConfig);
    setTransactionId(transactionData.nextTransactionId);
    setTransaction1(transactionData.data1);
    setTransaction2(transactionData.data2);

    // Step6. Finish all and render the page
    setIsRendering(true);
  }, []);

  // Build-in function
  const displayCourses = () => {
    if (isRendering && courses.length !== 0) {
      for (let i = 0; i < courses.length; i += 1) {
        const obj = courses[i];
        courses[i].courseTerm = '';
        courses[i].courseYear = '';
        courses[i].courseDay = '';
        courses[i].courseTime = '';
        for (let j = 0; j < currentSelection.length; j += 1) {
          const obj2 = currentSelection[j];
          if (obj.courseId === obj2.courseId) {
            courses[i].courseTerm = obj2.courseTerm;
            courses[i].courseYear = obj2.courseYear;
            courses[i].courseDay = obj2.courseDay;
            courses[i].courseTime = obj2.courseTime;
          }
        }
      }
      return courses.map((course, index) => (
        <CourseRow
          key={uuidv4}
          course={course}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
          coreCourses={coreCourses}
          transactionId={transactionId}
        />
      ));
    }
    return <tr />;
  };

  const sendNotification = (severity, mssg) => {
    dispatch({
      type: 'SEND_NOTIFICATION',
      payload: {
        id: uuidv4(),
        status: true,
        severity,
        mssg,
      },
    });
  };

  const autoPopulate = async () => {
    setTemplateModalShow(true);
  };

  const reset = () => {
    setConfirmModalShow(true);
  };

  const save = async () => {
    let isRunnable = true;
    try {
      currentSelection.forEach((item) => {
        if (
          !(
            item.courseDay.length *
              item.courseTime.length *
              item.courseTerm.length *
              item.courseYear >
            0
          )
        ) {
          isRunnable = false;
        }
      });
    } catch (error) {
      isRunnable = false;
      sendNotification('warning', 'Please double check course selections');
    }

    if (isRunnable) {
      const lastSemester = determineLastSemester(currentSelection);
      await new Promise((resolve, reject) => {
        axios
          .post(
            `${CONFIG.PORTAL}/students-courses/bulkAddCourseSelections`,
            {
              studentId: Number(student.id),
              courses: currentSelection,
            },
            fetchConfig
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            alert('Oops, unexpected error happened');
            console.error(error);
            reject(error);
          });
      })
        // eslint-disable-next-line arrow-body-style
        .then((data) => {
          return axios
            .post(
              `${CONFIG.PORTAL}/students/updateStudentGraduate`,
              {
                studentId: Number(student.id),
                lastSemester,
              },
              fetchConfig
            )
            .then((response) => response.data)
            .catch((error) => {
              sendNotification('error', 'Oops, unexpected error');
              console.error(error);
            });
        })
        .then((response) => {
          sendNotification('success', response);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
    } else {
      sendNotification('warning', 'Please double check course selections');
    }
  };

  const buttonGroup = (
    <div>
      <Button
        className="ms-2"
        disableElevation
        variant="contained"
        onClick={autoPopulate}
      >
        {' '}
        Auto-populate{' '}
      </Button>
      <Button
        className="ms-2"
        disableElevation
        variant="contained"
        onClick={reset}
      >
        {' '}
        Reset{' '}
      </Button>
      <Button
        className="ms-2"
        disableElevation
        variant="contained"
        color="success"
        onClick={save}
      >
        {' '}
        Save{' '}
      </Button>
    </div>
  );

  return (
    <div>
      {isRendering ? (
        <Grid container sx={{ pt: 0 }} rowSpacing={4.5} columnSpacing={2.75}>
          {/* Header */}
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Course Planner</Typography>
          </Grid>

          <Grid item xs={12}>
            <MainCard title="Student Profile Panel">
              <StudentInfoPanel
                student={student.studentInfo}
                currentSelection={currentSelection}
              />
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard
              title="Course Selection"
              hasActions
              buttonGroup={buttonGroup}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Course Title</td>
                    <td>Day & Time</td>
                    <td>Term</td>
                    <td>Year</td>
                  </tr>
                </thead>
                <TableBody>{displayCourses()}</TableBody>
              </Table>
            </MainCard>
          </Grid>

          {/* Current POS */}
          <Grid item xs={12}>
            <MainCard title="Current Plan of Study">
              <Visualize>
                <SemesterPanel
                  currentSelection={currentSelection}
                  programSemesters={programSemesters}
                />
              </Visualize>
            </MainCard>
          </Grid>

          {/* Previous POS */}
          <Grid item xs={12}>
            <MainCard title="Previous Selections">
              <Visualize>
                <SemesterPanel
                  currentSelection={transaction1}
                  programSemesters={programSemesters}
                />
              </Visualize>
              <Visualize>
                <SemesterPanel
                  currentSelection={transaction2}
                  programSemesters={programSemesters}
                />
              </Visualize>
            </MainCard>
          </Grid>

          <TemplateSelection
            show={templateModalShow}
            student={student}
            setCurrentSelection={setCurrentSelection}
            transactionId={transactionId}
            programSemesters={programSemesters}
            onHide={() => setTemplateModalShow(false)}
            fetchConfig={fetchConfig}
            sendNotification={sendNotification}
          />

          {/* Other models */}
          <ConfirmModal
            show={ConfirmModalShow}
            onHide={() => setConfirmModalShow(false)}
            setCurrentSelection={() => setCurrentSelection([])}
            setResetFlag={() => setResetFlag(true)}
          />
        </Grid>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
}

export default CoursePlanner;
