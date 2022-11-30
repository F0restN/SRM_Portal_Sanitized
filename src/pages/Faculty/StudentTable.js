import { Button, ButtonGroup, Table, Badge } from 'reactstrap';
import { Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import config from '../../config.json';
import store from '../../store/store';

import axios from 'axios';

import CreatePDFButton from '../../components/CreatePDFButton';
import { LinearProgress } from '@mui/material';

export default function MainFacultyTable(props) {
  let userName = sessionStorage.getItem('currentUserName');
  const history = useHistory();
  const [authenticationStatus, setAuthenticationStatus] = useState(
    store.getState()
  );
  const [info, setInfo] = useState();
  const [sortedConfig, setSortedConfig] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(
          `${config.portal}/students?advisor=${userName}`,
          {
            headers: {
              Authorization: `Bearer ${authenticationStatus.jwtToken}`,
            },
          }
        );
        //console.log(response.data);
        setInfo(response.data); // change this based on the response, you may or may not need to call json() on it
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  let items = info;
  if (info == null) {
    return <LinearProgress />;
  } else {
    if (sortedConfig && sortedConfig.key) {
      items.sort((a, b) => {
        if (sortedConfig.key == 'start') {
          //handle start year and term
          a['start'] =
            a.start_year && a.start_term
              ? a.start_year * 10 + termToNumber(a.start_term)
              : 0;
          b['start'] =
            b.start_year && b.start_term
              ? b.start_year * 10 + termToNumber(b.start_term)
              : 0;
        }
        if (sortedConfig.key == 'grad') {
          //handle start year and term
          a['grad'] =
            a.expected_grad_year && a.expected_grad_term
              ? a.expected_grad_year * 10 + termToNumber(a.expected_grad_term)
              : 0;
          b['grad'] =
            b.expected_grad_year && b.expected_grad_term
              ? b.expected_grad_year * 10 + termToNumber(b.expected_grad_term)
              : 0;
        }
        if (a[sortedConfig.key] < b[sortedConfig.key]) {
          return sortedConfig.isAsc ? -1 : 1;
        }
        if (a[sortedConfig.key] > b[sortedConfig.key]) {
          return sortedConfig.isAsc ? 1 : -1;
        }
        return 0;
      });
    }
    if (search && search.length > 0) {
      items = items.filter((item) => {
        return item['name'].toLowerCase().includes(search.toLowerCase());
      });
    }
  }
  //console.log(items);
  return (
    <div>
      <Form.Label htmlFor="searchByName">Search by Name</Form.Label>
      <Form.Control
        type="text"
        size="sm"
        id="searchByName"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table hover striped>
        <thead>
          <tr>
            <td
              onClick={() =>
                setSortedConfig({
                  key: 'name',
                  isAsc:
                    sortedConfig?.key != 'name' ? true : !sortedConfig?.isAsc,
                })
              }
            >
              Student Name
              <Badge bg="secondary">
                {sortedConfig && sortedConfig.key == 'name'
                  ? sortedConfig.isAsc
                    ? 'Asc'
                    : 'Desc'
                  : ''}
              </Badge>
            </td>
            <td
              onClick={() =>
                setSortedConfig({
                  key: 'track',
                  isAsc:
                    sortedConfig?.key != 'track' ? true : !sortedConfig?.isAsc,
                })
              }
            >
              Track
              <Badge bg="secondary">
                {sortedConfig && sortedConfig.key == 'track'
                  ? sortedConfig.isAsc
                    ? 'Asc'
                    : 'Desc'
                  : ''}
              </Badge>
            </td>
            <td
              onClick={() =>
                setSortedConfig({
                  key: 'start',
                  isAsc:
                    sortedConfig?.key != 'start' ? true : !sortedConfig?.isAsc,
                })
              }
            >
              Start Term
              <Badge bg="secondary">
                {sortedConfig && sortedConfig.key == 'start'
                  ? sortedConfig.isAsc
                    ? 'Asc'
                    : 'Desc'
                  : ''}
              </Badge>
            </td>
            <td
              onClick={() =>
                setSortedConfig({
                  key: 'grad',
                  isAsc:
                    sortedConfig?.key != 'grad' ? true : !sortedConfig?.isAsc,
                })
              }
            >
              Expected Graduation
              <Badge bg="secondary">
                {sortedConfig && sortedConfig.key == 'grad'
                  ? sortedConfig.isAsc
                    ? 'Asc'
                    : 'Desc'
                  : ''}
              </Badge>
            </td>
            {props.type == 'alumni' ? <td>Survey Baseline</td> : <td></td>}
            {props.type == 'alumni' ? <td>3 Month Followup</td> : <td></td>}
          </tr>
        </thead>
        <tbody>
          {items.map((info) => (
            <tr key={info.id}>
              <td onClick={() => ToStudentInfo(info.id, history)}>
                {info.name}
              </td>
              <td>{info.track ? info.track : 'N/A'}</td>
              <td>
                {info.start_term && info.start_year && info.start_year > 0
                  ? info.start_term + ' ' + info.start_year
                  : 'N/A'}
              </td>
              <td>
                {info.expected_grad_term &&
                info.expected_grad_year &&
                info.expected_grad_year > 0
                  ? info.expected_grad_term + ' ' + info.expected_grad_year
                  : 'N/A'}
              </td>
              <td>
                <ButtonGroup>
                  {info.planOfStudy ? (
                    <ViewEditPlan
                      pos={info.planOfStudy}
                      id={info.id}
                      history={history}
                    />
                  ) : (
                    <CreatePlan
                      id={info.id}
                      start_term={info.start_term}
                      start_year={info.start_year}
                    />
                  )}
                  <CreatePDFButton id={info.id} />
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <ButtonGroup>
          <Button
            onClick={() => ToStudentInfo(0, history)}
            color="primary"
            style={{ color: '#FFF' }}
          >
            + New Student
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

function termToNumber(term) {
  if (term == 'Spring') {
    return 1;
  } else if (term == 'Summer') {
    return 2;
  } else if (term == 'Fall') {
    return 3;
  }
}

function ToStudentInfo(id, history) {
  let path = 'studentinfo/:' + id;
  history.push(path);
}

function ViewEditPlan(props) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveAndClose = () => {
    handleClose();
    SaveUpdatedPos(props.id);
  };
  return (
    <>
      <Button
        color="primary"
        onClick={() => {
          HandleViewEditPlan(history, props.id);
        }}
      >
        View/Edit Plan
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Plan Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PosTable pos={props.pos} />
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={saveAndClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function HandleViewEditPlan(history, id) {
  let path = '/CoursePlan/:' + id;
  history.push({
    pathname: '/CoursePlan',
    search: `${id}`,
  });
}

function CreatePlan(props) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const saveAndClose = () => {
    handleClose();
    SaveUpdatedPos(props.id, totalTermList);
  };
  if (
    props.start_term == null ||
    props.start_term.length == 0 ||
    props.start_year == null
  ) {
    return (
      <>
        <Button
          onClick={() => {
            HandleViewEditPlan(history, props.id);
          }}
        >
          Create Plan
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Plan Creator</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please first complete student information.</Modal.Body>
          <Modal.Footer>
            <Button color="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  let termList = ['Spring', 'Summer', 'Fall'];
  let start_semester = props.start_term;
  let start_year = parseInt(props.start_year);
  let start_semester_idx = termList.findIndex(
    (item) => item === start_semester
  );
  let totalTermList = [];
  let currYear = start_year;
  let currSemesterIdx = start_semester_idx;
  while (totalTermList.length < 6) {
    totalTermList.push(termList[currSemesterIdx] + ' ' + currYear);
    currSemesterIdx++;
    if (currSemesterIdx == 3) {
      currSemesterIdx = 0;
      currYear++;
    }
  }
  return (
    <>
      <Button
        onClick={() => {
          HandleViewEditPlan(history, props.id);
        }}
      >
        Create Plan
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Plan Creator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(totalTermList).map((i) => {
              return (
                <Form.Group
                  className="mb-3"
                  controlId={
                    totalTermList[i].split(' ')[0] +
                    totalTermList[i].split(' ')[1]
                  }
                  key={i}
                >
                  <Form.Label>{totalTermList[i]}</Form.Label>
                  <Form.Control />
                </Form.Group>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={saveAndClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

async function SaveUpdatedPos(id, totalTermList) {
  let updatedPosObj = {};
  if (totalTermList != null) {
    for (const input of totalTermList) {
      let year = input.split(' ')[1];
      let term = input.split(' ')[0];
      console.log(input);
      if (updatedPosObj[year] == null) {
        updatedPosObj[year] = {};
      }
      updatedPosObj[year][term] = document.querySelector(
        '#' + term + year
      ).value;
    }
  } else {
    let course = [];
    let rawTerm = [];
    for (const node of document.querySelectorAll('.incomingTerm')) {
      rawTerm.push(node.innerText);
    }
    for (const node of document.querySelectorAll('.plannedClass')) {
      course.push(node.value);
    }
    for (let i = 0; i < rawTerm.length; i++) {
      let year = rawTerm[i].split(/(\s+)/)[0];
      let term = rawTerm[i].split(/(\s+)/)[2];
      let classes = course[i].split(',');
      if (updatedPosObj[year] == null) {
        updatedPosObj[year] = {};
      }
      if (updatedPosObj[year][term] == null) {
        updatedPosObj[year][term] = {};
        updatedPosObj[year][term] = classes;
      }
    }
  }
  await axios
    .put(
      `${config.portal}/Students/${id}`,
      { planOfStudy: updatedPosObj },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem('authenticationStatus')).jwtToken
          }`,
        },
      }
    )
    .then(() => {
      let userName = sessionStorage.getItem('currentUserName');
      const { loading, error, data } = axios.get(
        `${config.portal}/students?advisor=${userName}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem('authenticationStatus'))
                .jwtToken
            }`,
          },
        }
      );
    });
  document.location.reload(); // refresh page to update front-end, typically we should update state instead but i havent fully figured out how that works :(
}

function handleCreatePlan() {
  console.log(14);
}

function PosTable(props) {
  let head = [];
  let body = [];
  let pos = props.pos;
  for (var year in pos) {
    for (var term in pos[year]) {
      let totalTerm = year + ' ' + term;
      head.push(totalTerm);
    }
    for (var semester in pos[year]) {
      body.push(pos[year][semester]);
    }
  }
  return (
    <Form>
      {props.pos ? (
        Object.keys(props.pos).map((year) => {
          return (
            <div key={year}>
              {Object.keys(props.pos[year]).map((item) => {
                return (
                  <Form.Group className="mb-3" key={item}>
                    <Form.Label className={'incomingTerm'}>
                      {year}&nbsp;{item}
                    </Form.Label>
                    <Form.Control
                      className={'plannedClass'}
                      defaultValue={props.pos[year][item]}
                    />
                  </Form.Group>
                );
              })}
            </div>
          );
        })
      ) : (
        <div>No Record</div>
      )}
    </Form>
  );
}
