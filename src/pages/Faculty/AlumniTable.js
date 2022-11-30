import {Button, ButtonGroup, Table,} from 'reactstrap'
import {Form, Modal, Card, Tabs, Tab} from 'react-bootstrap'
import {useHistory} from 'react-router-dom';
import React, {useCallback, useContext, useEffect, useState} from 'react'
import useFetch from '../../hooks/useFetch'
import config from '../../config.json'
import store from '../../store/store'

export default function MainFacultyTable(props) {
    const history = useHistory();
    const [authenticationStatus, setAuthenticationStatus] = useState(store.getState())

    const { loading, error, data } = useFetch(`${config.portal}/alumni`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authenticationStatus.jwtToken}`
        },
    })
    if (loading) { return <p>Loading...</p> }
    if (error) { return <p>Error :(</p> }

    console.log("fetch result")
    console.log(data)
    console.log(error)

    return (
        <div>
            {(data && Object.keys(data).length !== 0) ?
                <Table hover striped>
                <thead>
                <tr>
                    <td>Student Name</td>
                    <td>Advisor</td>
                    <td>Track</td>
                    <td>Start Term</td>
                    <td>Expected Graduation</td>
                    {props.type === "alumni" ? <td>Survey Baseline</td> : <td/>}
                    {props.type === "alumni" ? <td>3 Month Followup</td> : <td/>}
                </tr>
                </thead>
                <tbody>
                {data.map(data => (
                    <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.advisor ? data.advisor : "unknown"}</td>
                        <td>{data.track ? data.track : "unknown"}</td>
                        <td>{data.start_term ? data.start_term : "unknown"}</td>
                        <td>{data.expected_grad_term ? data.expected_grad_term : "unknown"}</td>
                        {props.type == "pos" ?
                            <td><ButtonGroup><Button color='primary' style={{color: "#FFF"}}
                                                     disabled={!data.expected_grad_term}>Create
                                PDF</Button></ButtonGroup></td>
                            : props.type == "alumni" ?
                                <td><ButtonGroup><Button color='primary'
                                                         style={{color: "#FFF"}}>View</Button></ButtonGroup></td>
                                : <div>11</div>}
                        {props.type == "alumni" ?
                            <td><ButtonGroup><Button color='primary' style={{color: "#FFF"}}>View</Button></ButtonGroup>
                            </td> : <td></td>}
                    </tr>
                ))}
                </tbody>
                </Table>
             : <div>No Data</div>}
            <div>
                {props.type == "pos" ?
                    <ButtonGroup><Button color='primary' style={{color: "#FFF"}}>+ New Student</Button></ButtonGroup>
                    : props.type == "alumni" ?
                        <ButtonGroup><Button color='primary' style={{color: "#FFF"}}>+ New Alumni</Button></ButtonGroup>
                        : <div>just a placeholder 11</div>}
            </div>
        </div>
    )
}