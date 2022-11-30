import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import { Button, Table, } from 'reactstrap'
import { Form, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import store from '../store/store';
import axios from 'axios';
import config from '../config.json';
import RosterButton from './RosterButton'

export default function Roster() {
    const history = useHistory();
    const [authenticationStatus, setAuthenticationStatus] = useState(store.getState())
    const { loading, error, data } = useFetch(`${config.portal}/students`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authenticationStatus.jwtToken}`
        },
    })
    if (loading) { return <p>Loading...</p> }
    if (error) { return <p>Error :</p> }
    console.log(data);
        return (
        <Table hover striped>
            <thead>
                <tr>
                    <td>Student Name</td>
                    <td>PeopleSoft ID</td>
                    <td>Email</td>
                    <td>Advisor Name</td>
                    <td>Track</td>
                    <td>Status</td>
                    <td>Start Term</td>
                    <td>Expected Graduation</td>
                    <td>Quick Actions</td>
                    <td>Plan</td>
                </tr>
            </thead>
            <tbody>
                {data.map(data => (
                    <tr key={data.peoplesoft_id}>
                        <td onClick={() => ToCoursePicking(data.peoplesoft_id, history)}>{data.name}</td>
                        <td>{data.peoplesoft_id}</td>
                        <td>{data.email}</td>
                        <td>{data.advisor}</td>
                        <td>{data.track}</td>
                        <td>{data.status}</td>
                        <td>{data.start_term}</td>
                        <td>{data.expected_grad_term}</td>
                        <td>
                            <QuickActions id={data.id} currNote={data.note ? data.note.detail : []} peoplesoft_id={data.peoplesoft_id} authenticationStatus = {authenticationStatus}></QuickActions>
                            {/* <button onClick={() => ToStudentInfo(data.peoplesoft_id, history)}>View</button> */}

                        </td>
                        <td><RosterButton plan_available = {data.plan_available}></RosterButton></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

function ToStudentInfo(id, history) {
    let path = "studentinfo/" + id
    history.push(path)
}

function ToCoursePicking(id, history) {
        let path = "coursepicking/:" + id
        history.push(path)
}

function QuickActions(data) {
    const [showMsg, setShowMsg] = useState(false);
    const handleShowMsg = () => setShowMsg(true);
    const handleCloseMsg = () => setShowMsg(false);

    const [showNote, setShowNote] = useState(false);
    const handleShowNote = () => setShowNote(true);
    const handleCloseNote = () => setShowNote(false);
    const history = useHistory();
    const [note, setNote] = useState("");

    return (
        <>
            <button onClick={handleShowMsg}>Msg</button>
            {/* <button onClick={handleShowInfo}>View</button> */}
            <button onClick={handleShowNote}>Note</button>
            {/* <button onClick={handleCourseSelection}>Course</button> */}
            <button onClick={() => ToStudentInfo(data.peoplesoft_id, history)}>View</button>
            <Modal show={showMsg} onHide={handleCloseMsg}>
                <Form >
                    <Form.Group className="mb-3" controlId="msg">
                        <Form.Label>Message Input</Form.Label>
                        <Form.Control placeholder="Type Msg Here" />
                    </Form.Group>

                    <Button variant="primary" type="submit" onSubmit={() => handleCloseMsg()} onClick={() => sendMsg()}>
                        Submit
                    </Button>
                </Form>
            </Modal>

            <Modal show={showNote} onHide={handleCloseNote}>
                <Form >
                    <Form.Group className="mb-3" controlId="note">
                        <Form.Label>Note Input</Form.Label>
                        <Form.Control placeholder="Type Note Here" onChange={(e) => setNote(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" onSubmit={() => { handleCloseNote()}} onClick={() => {addNote(note, data.id, data.currNote)}}>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

function sendMsg() {
    alert("Msg sending confirmation.")
}


function viewInfo() {
    // this.handleShow();
    // alert("pop up a info page here.")
}

async function addNote(note, id, currNote) {
    const today = new Date().toISOString().slice(0, 10)
    currNote.push(today +"\t" + note);
    // debugger
    await axios.put(`${config.portal}/Students/${id}`, { note: {detail: currNote} }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`
        }
    }).then(alert("Note Added."));
}
