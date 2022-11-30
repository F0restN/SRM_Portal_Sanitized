import { Table, Accordion, Spinner, Figure, Button } from 'react-bootstrap';
import config from '../../config.json';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import store from '../../store/store';
import { CONFIG } from '../../ENV';
import Download from './../downloadAttachment';
import SelectedCoursesFetch from '../CoursePlanner/hooks/SelectedCoursesFetch';
import UploadResume from '../Admin/connectors/UploadResume';
import UploadAdDoc from '../Admin/connectors/UploadAdDoc';
import EditStudents from '../Admin/connectors/EditStudents';
import axios from 'axios';
import {
  StyledLayout,
  StyledLeftContainer,
  StyledRightContainer,
  StyledRow,
  StyledTwoColumnRow,
} from './StyledComponents';
import avatar from './default_avatar.png';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import ViewOrEditField from './ViewOrEditField';
import ViewOrEditSelector from './ViewOrEditSelector';
import CreatePDFButton from '../../components/CreatePDFButton';
import DatePicker from 'react-datepicker';
import AddStudents from '../Admin/connectors/AddStudents';

export default function StudentInfo() {
  const [authenticationStatus, setAuthenticationStatus] = useState(
    store.getState()
  );

  // Initialize
  const location = useLocation();
  const history = useHistory();
  let id = location.pathname.split(':')[1];
  const userName = sessionStorage.getItem('currentUserName');
  const [currentSelection, setCurrentSelection] = useState([]);
  const [student, setStudent] = useState(null);
  const [studentUpdate, setStudentUpdate] = useState(null);
  const [isDisabled1, setIsDisabled1] = useState(id > 0);
  const [isDisabled2, setIsDisabled2] = useState(id > 0);
  const [isDisabled3, setIsDisabled3] = useState(id > 0);
  const [isDisabled4, setIsDisabled4] = useState(id > 0);

  const [yearOB, setYearOB] = useState(null);
  const [yearJob, setYearJob] = useState(null);
  const [yearPrevGrad, setYearPrevGrad] = useState(null);
  const [yearStart, setYearStart] = useState(null);
  const [yearActualGrad, setYearActualGrad] = useState(null);

  const [db_advisorInfo, setdb_advisorInfo] = useState([]);

  let uploadResume = useRef(null);
  let uploadAd_package = useRef(null);
  let fetchConfig = {
    headers: { Authorization: `Bearer ${authenticationStatus.jwtToken}` },
  };

  useEffect(async () => {
    //advisors need to be filled first, so the selector works
    await ReadFromAdvisors();
    console.log(db_advisorInfo);
    let student = {
      first_name: '',
      middle_name: '',
      last_name: '',
      peoplesoft_id: null,
      email: '',
      advisor: userName,
      start_term: '',
      start_year: null,
      gender: '',
      admission_gpa: '',
      year_of_birth: null,
      company: '',
      position: '',
      job_start_year: null,
      undergrad_major: '',
      prev_grad_year: null,
      street: '',
      city: '',
      state: '',
      zipcode: null,
      prev_school: '',
      status: '',
      type: '',
      track: '',
    };
    if (id && id > 0) {
      let studentData = await axios.get(
        `${CONFIG.PORTAL}/students?id=${id}`,
        fetchConfig
      );
      student = studentData.data[0];
    }
    console.log(student);
    setStudent(student);
    setStudentUpdate(student);
    setYearOB(student.year_of_birth ? student.year_of_birth + 1 : '');
    setYearJob(student.job_start_year ? student.job_start_year + 1 : '');
    setYearPrevGrad(student.prev_grad_year ? student.prev_grad_year + 1 : '');
    setYearStart(student.start_year ? student.start_year + 1 : '');
    setYearActualGrad(
      student.actual_grad_year ? student.actual_grad_year + 1 : ''
    );

    async function ReadFromAdvisors() {
      const authStat = JSON.parse(
        sessionStorage.getItem('authenticationStatus')
      );
      if (authStat.authenticationRole == 'Faculty') {
        setdb_advisorInfo([{ name: userName }]);
      } else {
        const { data } = await axios.get(`${config.portal}/Advisors`, {
          headers: {
            Authorization: `Bearer ${authStat.jwtToken}`,
          },
        });
        setdb_advisorInfo({
          ...data,
        });
      }
    }

    // Step4. Retrieve selected courses info
    if (id > 0) {
      let [selectionLoading, selectionError, selectionData] =
        await SelectedCoursesFetch({ studentId: id }, fetchConfig);
      setCurrentSelection(selectionData);
    } else {
      setCurrentSelection([]);
    }
  }, [isDisabled1, isDisabled2, isDisabled3, isDisabled4]);

  function displayCourses() {
    return currentSelection.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.courseId}</td>
          <td>{item.courseTitle}</td>
          <td>{item.courseTime + ' ' + item.courseDay}</td>
          <td>{item.courseTerm}</td>
          <td>{item.courseYear}</td>
        </tr>
      );
    });
  }

  function handleEditClick(panelId) {
    if (panelId == 1) {
      if (isDisabled2 == true && isDisabled3 == true && isDisabled4 == true) {
        return true;
      }
      return false;
    } else if (panelId == 2) {
      if (isDisabled1 == true && isDisabled3 == true && isDisabled4 == true) {
        return true;
      }
      return false;
    } else if (panelId == 3) {
      if (isDisabled1 == true && isDisabled2 == true && isDisabled4 == true) {
        return true;
      }
      return false;
    } else if (panelId == 4) {
      if (isDisabled1 == true && isDisabled2 == true && isDisabled3 == true) {
        return true;
      }
      return false;
    }
  }

  async function handleSaveClick(panelId) {
    if (panelId < 4) {
      studentUpdate.name = studentUpdate.first_name
        ? studentUpdate.first_name +
          (studentUpdate.last_name ? ' ' + studentUpdate.last_name : '')
        : studentUpdate.last_name
        ? studentUpdate.last_name
        : '';
      if (id > 0) {
        await EditStudents(studentUpdate, student.id);
      } else {
        const res = await AddStudents(studentUpdate);
        let path = 'studentinfo/:' + (res.data.id ? res.data.id : 0);
        history.push(path);
      }
    } else {
      if (uploadResume.current) {
        await UploadResume(uploadResume.current, student.id);
      }

      if (uploadAd_package.current) {
        await UploadAdDoc(uploadAd_package.current, student.id);
      }
    }

    if (panelId == 1) {
      setIsDisabled1(true);
    } else if (panelId == 2) {
      setIsDisabled2(true);
    } else if (panelId == 3) {
      setIsDisabled3(true);
    } else if (panelId == 4) {
      setIsDisabled4(true);
    }
  }

  function updateInfo(changedValue, fieldName) {
    setStudentUpdate({
      ...studentUpdate,
      [fieldName]: changedValue,
    });
  }

  function handleGoToPOS(history, id) {
    let path = '/CoursePlan/:' + id;
    history.push({
      pathname: '/CoursePlan',
      search: `${id}`,
    });
  }

  const term_options = [
    { value: 'Summer', label: 'Summer' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Fall', label: 'Fall' },
  ];

  const gender_options = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Prefer not to say', label: 'Prefer not to say' },
  ];

  const status_options = [
    { value: 'FT', label: 'Full Time' },
    { value: 'PT', label: 'Part Time' },
  ];

  const type_options = [
    { value: 'ONLINE', label: 'ONLINE' },
    { value: 'ONCMP', label: 'ON CAMPUS' },
  ];

  let advisor_options = [];
  for (let key in db_advisorInfo) {
    advisor_options.push({
      value: db_advisorInfo[key].name,
      label: db_advisorInfo[key].name,
    });
  }

  const track_options = [
    { value: 'HSM', label: 'Healthcare Supervision and Management' },
    { value: 'HI', label: 'Health Informatics' },
    { value: 'DS', label: 'Data Science' },
    { value: 'RHIA', label: 'Registered Health Information Administrator' },
  ];

  function toTrackName(track) {
    switch (track) {
      case 'HI':
        return 'Health Informatics';
      case 'HSM':
        return 'Healthcare Supervision and Management';
      case 'RHIA':
        return 'Registered Health Information Administrator';
      case 'DS':
        return 'Data Science';
      default:
        return '';
    }
  }
  return (
    <div>
      {student !== null ? (
        <div>
          {/*Panel #1*/}
          <StyledLayout hidden={id <= 0}>
            <StyledLeftContainer>
              <Figure
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Figure.Image width={'40%'} height={'40%'} src={avatar} />
              </Figure>
            </StyledLeftContainer>
            <StyledRightContainer>
              <StyledRow>
                <text>{student.name}</text>
              </StyledRow>
              <StyledTwoColumnRow>
                <div>PEOPLESOFT ID : {student.peoplesoft_id}</div>
                <div>
                  STATUS : {student.status == 'FT' ? 'Full Time' : 'Part Time'}
                </div>
              </StyledTwoColumnRow>
              <StyledTwoColumnRow>
                <div>TYPE : {student.type}</div>
                <div>TRACK : {toTrackName(student.track)}</div>
              </StyledTwoColumnRow>
              <StyledTwoColumnRow>
                <div>
                  START :{' '}
                  {student.start_term &&
                  student.start_year &&
                  student.start_year > 0
                    ? student.start_term + ' ' + student.start_year
                    : 'N/A'}
                </div>
                <div>
                  EXPECTED GRADUATE :{' '}
                  {student.expected_grad_term &&
                  student.expected_grad_year &&
                  student.expected_grad_year > 0
                    ? student.expected_grad_term +
                      ' ' +
                      student.expected_grad_year
                    : 'N/A'}
                </div>
              </StyledTwoColumnRow>
              <StyledRow>
                <Button
                  variant="secondary"
                  className="me-3"
                  onClick={() => {
                    handleGoToPOS(history, id);
                  }}
                >
                  Create POS
                </Button>
                {id > 0 ? <CreatePDFButton id={id} /> : ''}
              </StyledRow>
            </StyledRightContainer>
          </StyledLayout>

          <Accordion
            defaultActiveKey={['0']}
            alwaysOpen
            style={{ marginTop: '20px' }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>General Information</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <FormGroup>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <ViewOrEditField
                            updateInfo={updateInfo}
                            fieldName={'First Name'}
                            fieldValue={student.first_name}
                            isDisabled={isDisabled1}
                            studentInfoKey={'first_name'}
                          />
                          <ViewOrEditField
                            updateInfo={updateInfo}
                            fieldName={'Middle Name'}
                            fieldValue={student.middle_name}
                            isDisabled={isDisabled1}
                            studentInfoKey={'middle_name'}
                          />
                          <ViewOrEditField
                            updateInfo={updateInfo}
                            fieldName={'Last Name'}
                            fieldValue={student.last_name}
                            isDisabled={isDisabled1}
                            studentInfoKey={'last_name'}
                          />
                        </tr>
                        <tr>
                          <ViewOrEditField
                            updateInfo={updateInfo}
                            fieldName={'Peoplesoft Id'}
                            fieldValue={student.peoplesoft_id}
                            isDisabled={isDisabled1}
                            studentInfoKey={'peoplesoft_id'}
                          />
                        </tr>
                        <tr>
                          <ViewOrEditField
                            updateInfo={updateInfo}
                            fieldName={'City / Town'}
                            fieldValue={student.city}
                            isDisabled={isDisabled1}
                            studentInfoKey={'city'}
                          />
                          <ViewOrEditField
                            updateInfo={updateInfo}
                            fieldName={'State'}
                            fieldValue={student.state}
                            isDisabled={isDisabled1}
                            studentInfoKey={'state'}
                          />
                          <ViewOrEditField
                            updateInfo={updateInfo}
                            fieldName={'Zip Code'}
                            fieldValue={student.zipcode}
                            isDisabled={isDisabled1}
                            studentInfoKey={'zipcode'}
                          />
                        </tr>
                        <tr>
                          <ViewOrEditSelector
                            updateInfo={updateInfo}
                            fieldName={'Gender'}
                            fieldValue={student.gender}
                            isDisabled={isDisabled1}
                            studentInfoKey={'gender'}
                            selectOptions={gender_options}
                          />
                        </tr>
                        <tr>
                          <ViewOrEditField
                            updateInfo={updateInfo}
                            fieldName={'Email'}
                            fieldValue={student.email}
                            isDisabled={isDisabled1}
                            studentInfoKey={'email'}
                          />
                        </tr>
                        <tr>
                          <td>
                            <Label for="yearOfBirth">Year of Birth</Label>
                            <DatePicker
                              disabled={isDisabled1}
                              customInput={<Input />}
                              showYearPicker
                              dateFormat="yyyy"
                              yearItemNumber={10}
                              closeOnScroll={true}
                              selected={Date.parse(yearOB)}
                              onChange={(date) => {
                                setYearOB(date);
                                if (date) {
                                  updateInfo(
                                    date.getFullYear(),
                                    'year_of_birth'
                                  );
                                } else {
                                  updateInfo(null, 'year_of_birth');
                                }
                              }}
                              placeholderText="Year of Birth"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button
                      className={
                        isDisabled1 && handleEditClick(1)
                          ? 'col-1 me-3 btn-primary'
                          : 'col-1 me-3 btn-secondary'
                      }
                      onClick={() => {
                        if (handleEditClick(1)) {
                          setIsDisabled1(!isDisabled1);
                        }
                      }}
                      hidden={id <= 0}
                    >
                      {' '}
                      {isDisabled1 ? 'Edit ' : ' Cancel '}
                    </Button>
                    <Button
                      className={
                        isDisabled1
                          ? 'col-1 me-3 btn-secondary'
                          : 'col-1 me-3 btn-primary'
                      }
                      onClick={() => handleSaveClick(1)}
                      hidden={id <= 0}
                    >
                      {' '}
                      Save{' '}
                    </Button>
                  </FormGroup>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion
            defaultActiveKey={['0']}
            alwaysOpen={id > 0}
            style={{ marginTop: '20px' }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Background</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <ViewOrEditField
                          updateInfo={updateInfo}
                          fieldName={'Current/Previous Company'}
                          fieldValue={student.company}
                          isDisabled={isDisabled2}
                          studentInfoKey={'company'}
                        />
                        <ViewOrEditField
                          updateInfo={updateInfo}
                          fieldName={'Position'}
                          fieldValue={student.position}
                          isDisabled={isDisabled2}
                          studentInfoKey={'position'}
                        />
                        <td>
                          <Label for="jobStartYear">Job Start Year</Label>
                          <DatePicker
                            disabled={isDisabled2}
                            customInput={<Input />}
                            showYearPicker
                            dateFormat="yyyy"
                            yearItemNumber={10}
                            closeOnScroll={true}
                            selected={Date.parse(yearJob)}
                            onChange={(date) => {
                              setYearJob(date);
                              if (date) {
                                updateInfo(
                                  date.toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                  }),
                                  'job_start_year'
                                );
                              } else {
                                updateInfo(null, 'job_start_year');
                              }
                            }}
                            placeholderText="Job Start Year"
                          />
                        </td>
                      </tr>
                      <tr>
                        <ViewOrEditField
                          updateInfo={updateInfo}
                          fieldName={'Previous School Name'}
                          fieldValue={student.prev_school}
                          isDisabled={isDisabled2}
                          studentInfoKey={'prev_school'}
                        />
                        <ViewOrEditField
                          updateInfo={updateInfo}
                          fieldName={'Previous Major'}
                          fieldValue={student.undergrad_major}
                          isDisabled={isDisabled2}
                          studentInfoKey={'undergrad_major'}
                        />
                        <td>
                          <Label for="jobStartYear">
                            Previous Graduation Year
                          </Label>
                          <DatePicker
                            disabled={isDisabled2}
                            customInput={<Input />}
                            showYearPicker
                            dateFormat="yyyy"
                            yearItemNumber={10}
                            closeOnScroll={true}
                            selected={Date.parse(yearPrevGrad)}
                            onChange={(date) => {
                              setYearPrevGrad(date);
                              if (date) {
                                updateInfo(
                                  date.toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                  }),
                                  'prev_grad_year'
                                );
                              } else {
                                updateInfo(null, 'prev_grad_year');
                              }
                            }}
                            placeholderText="Previous Graduation Year"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <Button
                    className={
                      isDisabled2 && handleEditClick(2)
                        ? 'col-1 me-3 btn-primary'
                        : 'col-1 me-3 btn-secondary'
                    }
                    onClick={() => {
                      if (handleEditClick(2)) {
                        setIsDisabled2(!isDisabled2);
                      }
                    }}
                    hidden={id <= 0}
                  >
                    {' '}
                    {isDisabled2 ? 'Edit ' : ' Cancel '}
                  </Button>
                  <Button
                    className={
                      isDisabled2
                        ? 'col-1 me-3 btn-secondary'
                        : 'col-1 me-3 btn-primary'
                    }
                    onClick={() => handleSaveClick(2)}
                    hidden={id <= 0}
                  >
                    {' '}
                    Save{' '}
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion
            defaultActiveKey={['0']}
            alwaysOpen
            style={{ marginTop: '20px' }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Academic Information</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <ViewOrEditSelector
                          updateInfo={updateInfo}
                          fieldName={'Academic Track'}
                          fieldValue={student.track}
                          isDisabled={isDisabled3}
                          studentInfoKey={'track'}
                          selectOptions={track_options}
                        />
                        <ViewOrEditSelector
                          updateInfo={updateInfo}
                          fieldName={'Academic Type'}
                          fieldValue={student.type}
                          isDisabled={isDisabled3}
                          studentInfoKey={'type'}
                          selectOptions={type_options}
                        />
                        <ViewOrEditSelector
                          updateInfo={updateInfo}
                          fieldName={'Academic Status'}
                          fieldValue={student.status}
                          isDisabled={isDisabled3}
                          studentInfoKey={'status'}
                          selectOptions={status_options}
                        />
                      </tr>
                      {advisor_options.length > 1 ? (
                        <tr>
                          <ViewOrEditSelector
                            updateInfo={updateInfo}
                            fieldName={'Advisor'}
                            fieldValue={student.advisor}
                            isDisabled={isDisabled3}
                            studentInfoKey={'advisor'}
                            selectOptions={advisor_options}
                          />
                        </tr>
                      ) : (
                        ''
                      )}

                      <tr>
                        <ViewOrEditField
                          updateInfo={updateInfo}
                          fieldName={'Admission GPA'}
                          fieldValue={student.admission_gpa}
                          isDisabled={isDisabled3}
                          studentInfoKey={'admission_gpa'}
                        />
                      </tr>
                      <tr>
                        <td>
                          <Label for="start_year">Start Year</Label>
                          <DatePicker
                            disabled={isDisabled3}
                            customInput={<Input />}
                            showYearPicker
                            dateFormat="yyyy"
                            yearItemNumber={10}
                            closeOnScroll={true}
                            selected={Date.parse(yearStart)}
                            onChange={(date) => {
                              setYearStart(date);
                              if (date) {
                                updateInfo(
                                  date.toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                  }),
                                  'start_year'
                                );
                              } else {
                                updateInfo(null, 'start_year');
                              }
                            }}
                            placeholderText="Start Year"
                          />
                        </td>
                        <ViewOrEditSelector
                          updateInfo={updateInfo}
                          fieldName={'Start Term'}
                          fieldValue={student.start_term}
                          isDisabled={isDisabled3}
                          studentInfoKey={'start_term'}
                          selectOptions={term_options}
                        />
                      </tr>
                      <tr>
                        <ViewOrEditField
                          updateInfo={updateInfo}
                          fieldName={'Expect Grad Year'}
                          fieldValue={student.expected_grad_year}
                          isDisabled={true}
                          studentInfoKey={'expected_grad_year'}
                          hidden={id <= 0}
                        />
                        <ViewOrEditSelector
                          updateInfo={updateInfo}
                          fieldName={'Expect Grad Term'}
                          fieldValue={student.expected_grad_term}
                          isDisabled={true}
                          studentInfoKey={'expected_grad_term'}
                          selectOptions={term_options}
                          hidden={id <= 0}
                        />
                      </tr>
                      <tr>
                        <td>
                          <Label for="actual_grad_year">Actual Grad Year</Label>
                          <DatePicker
                            disabled={isDisabled3}
                            customInput={<Input />}
                            showYearPicker
                            dateFormat="yyyy"
                            yearItemNumber={10}
                            closeOnScroll={true}
                            selected={Date.parse(yearActualGrad)}
                            onChange={(date) => {
                              setYearActualGrad(date);
                              if (date) {
                                updateInfo(
                                  date.toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                  }),
                                  'actual_grad_year'
                                );
                              } else {
                                updateInfo(null, 'actual_grad_year');
                              }
                            }}
                            placeholderText="Actual Grad Year"
                          />
                        </td>
                        <ViewOrEditSelector
                          updateInfo={updateInfo}
                          fieldName={'Actual Grad Term'}
                          fieldValue={student.actual_grad_term}
                          isDisabled={isDisabled3}
                          studentInfoKey={'actual_grad_term'}
                          selectOptions={term_options}
                        />
                      </tr>
                      <tr>
                        <ViewOrEditField
                          updateInfo={updateInfo}
                          fieldName={'Capstone Internship'}
                          fieldValue={student.capstone_internship}
                          isDisabled={isDisabled3}
                          studentInfoKey={'capstone_internship'}
                        />
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    className={
                      isDisabled3 && handleEditClick(3)
                        ? 'col-1 me-3 btn-primary'
                        : 'col-1 me-3 btn-secondary'
                    }
                    onClick={() => {
                      if (handleEditClick(3)) {
                        setIsDisabled3(!isDisabled3);
                      }
                    }}
                    hidden={id <= 0}
                  >
                    {' '}
                    {isDisabled3 ? 'Edit ' : ' Cancel '}
                  </Button>
                  <Button
                    className={
                      isDisabled3
                        ? 'col-1 me-3 btn-secondary'
                        : 'col-1 me-3 btn-primary'
                    }
                    onClick={() => handleSaveClick(3)}
                  >
                    {' '}
                    Save{' '}
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion
            defaultActiveKey={['0']}
            alwaysOpen
            style={{ marginTop: '20px' }}
            hidden={id <= 0}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Attachments</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>
                          <Label for="resume">Resume/CV</Label>

                          <Input
                            disabled={isDisabled4}
                            id="resume"
                            name="resume"
                            type="file"
                            onChange={(e) =>
                              (uploadResume.current = e.target.files[0])
                            }
                          />
                          {!student.resume ? (
                            <p>Saved File: Empty</p>
                          ) : (
                            <Download
                              url={config.portal + student.resume.url}
                              filename={student.resume.name}
                            />
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td></td>
                      </tr>

                      <tr>
                        <td>
                          <Label for="ad_package">Admission Package</Label>
                          <Input
                            disabled={isDisabled4}
                            id="resume"
                            name="resume"
                            type="file"
                            onChange={(e) =>
                              (uploadAd_package.current = e.target.files[0])
                            }
                          />
                          {!student.admission_package ? (
                            <p>Saved File: Empty</p>
                          ) : (
                            <Download
                              url={
                                config.portal + student.admission_package.url
                              }
                              filename={student.admission_package.name}
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    className={
                      isDisabled4 && handleEditClick(4)
                        ? 'col-1 me-3 btn-primary'
                        : 'col-1 me-3 btn-secondary'
                    }
                    onClick={() => {
                      if (handleEditClick(4)) {
                        setIsDisabled4(!isDisabled4);
                      }
                    }}
                    hidden={id <= 0}
                  >
                    {' '}
                    {isDisabled4 ? 'Edit ' : ' Cancel '}
                  </Button>
                  <Button
                    className={
                      isDisabled4
                        ? 'col-1 me-3 btn-secondary'
                        : 'col-1 me-3 btn-primary'
                    }
                    onClick={() => handleSaveClick(4)}
                    hidden={id <= 0}
                  >
                    {' '}
                    Save{' '}
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/**
           */}
        </div>
      ) : (
        <Spinner
          className="justify-content-center"
          animation="border"
          role="status"
        />
      )}

      {
        // Current POS panel
        currentSelection !== [] && id > 0 ? (
          <Accordion
            defaultActiveKey={['0']}
            alwaysOpen
            style={{ marginTop: '20px' }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header> Present Plan of Study</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course Title</th>
                      <th>Day & Time</th>
                      <th>Term</th>
                      <th>Year</th>
                    </tr>
                  </thead>
                  <tbody>{displayCourses()}</tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) : (
          <br />
        )
      }
    </div>
  );
}
