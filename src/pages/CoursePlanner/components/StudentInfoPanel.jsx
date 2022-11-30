import { CardGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import React from 'react';
import { Spinner, Table } from 'reactstrap';

export default function StudentInfoPanel({ student, currentSelection }) {
  function displayCourses() {
    return currentSelection.map((item, index) => (
      <tr key={index}>
        <td>{item.courseId}</td>
        <td>{item.courseTitle}</td>
        <td>{`${item.courseTime} ${item.courseDay}`}</td>
        <td>{item.courseTerm}</td>
        <td>{item.courseYear}</td>
      </tr>
    ));
  }

  return (
    <div>
      {
        // Student profile panel
        student !== null ? (
          <Card>
            {/* <Card.Body> */}
            <Card.Text>
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">MR-MS-MRS</Card.Title>
                    <Card.Text>{student.gender}</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">NAME</Card.Title>
                    <Card.Text>{student.name}</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">PEOPLESOFT ID</Card.Title>
                    <Card.Text>{student.peoplesoft_id}</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">PRESENT MAILING ADDRESS</Card.Title>
                    <Card.Text>-</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">PHONE</Card.Title>
                    <Card.Text>-</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">PERMANENT MAILING ADDRESS</Card.Title>
                    <Card.Text>-</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">PHONE</Card.Title>
                    <Card.Text>-</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">STATUS</Card.Title>
                    <Card.Text>{student.status}</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">TYPE</Card.Title>
                    <Card.Text>{student.type}</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">TRACK</Card.Title>
                    <Card.Text>{student.track}</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">START DATE</Card.Title>
                    <Card.Text>
                      {`${student.start_term} ${student.start_year}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">EXPECT GRADUATE DATE</Card.Title>
                    <Card.Text>
                      {`${student.expected_grad_term} ${student.expected_grad_year}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title as="h6">DATE ADMITTED</Card.Title>
                    <Card.Text>09/2021</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Card.Text>
            {/* </Card.Body> */}
          </Card>
        ) : (
          <Spinner
            className="justify-content-center"
            animation="border"
            role="status"
          />
        )
      }
    </div>
  );
}
