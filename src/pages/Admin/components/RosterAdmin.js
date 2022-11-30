import React, { useEffect } from 'react';
import { Button, Table, Badge } from 'reactstrap';
import { Form } from 'react-bootstrap';
import '../../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from '../../../config.json';
import store from '../../../store/store';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreatePDFButton from '../../../components/CreatePDFButton';

export default function RosterAdmin(props) {
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
          `${config.portal}/students?_limit=-1`,
          {
            headers: {
              Authorization: `Bearer ${authenticationStatus.jwtToken}`,
            },
          }
        );
        setInfo(response.data); // change this based on the response, you may or may not need to call json() on it
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  //console.log(info)
  let items = info;
  if (info == null) {
    return <div>no data</div>;
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
  function HandleEdit(currentStudentInfo) {
    history.push({
      pathname: `/AdminEditStudent/${currentStudentInfo.id}`,
      state: {
        key: currentStudentInfo,
      },
    });
  }

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
            <th
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
            </th>
            <th
              onClick={() =>
                setSortedConfig({
                  key: 'advisor',
                  isAsc:
                    sortedConfig?.key != 'advisor'
                      ? true
                      : !sortedConfig?.isAsc,
                })
              }
            >
              Advisor
              <Badge bg="secondary">
                {sortedConfig && sortedConfig.key == 'advisor'
                  ? sortedConfig.isAsc
                    ? 'Asc'
                    : 'Desc'
                  : ''}
              </Badge>
            </th>
            <th
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
            </th>
            <th
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
            </th>
            <th
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
            </th>
            <th>Administration Tools</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => {
            let completeTerm = '';
            if (row.start_term != null && row.start_year != null) {
              completeTerm =
                row.start_term.charAt(0).toUpperCase() +
                row.start_term.substring(1, row.start_term.length) +
                ' ' +
                row.start_year;
            }
            let completeExpTerm = '';
            if (
              row.expected_grad_term != null &&
              row.expected_grad_year != null &&
              row.expected_grad_year > 0
            ) {
              completeExpTerm =
                row.expected_grad_term.charAt(0).toUpperCase() +
                row.expected_grad_term.substring(
                  1,
                  row.expected_grad_term.length
                ) +
                ' ' +
                row.expected_grad_year;
            }
            return (
              <tr key={row.id}>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => ToStudentInfo(row.id, history)}
                >
                  {row.name}
                </td>
                <td>{row.advisor}</td>
                <td>{row.track}</td>
                <td>{completeTerm}</td>
                <td>{completeExpTerm}</td>
                <td>
                  <Button
                    color="primary"
                    size="md"
                    onClick={() => ToStudentInfo(row.id, history)}
                  >
                    View/Edit
                  </Button>
                  <CreatePDFButton id={row.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
