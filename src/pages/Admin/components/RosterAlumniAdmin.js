import React from 'react'
import {Button, Table} from 'reactstrap'
import '../../../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import store from '../../../store/store';
import useFetch from '../../../hooks/useFetch';
import config from '../../../config.json'

export default function RosterAdminAlumni() {
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
  return (
    <div>
        <Table
  hover striped
>
  <thead>
    <tr>
      
      <th>
        Student Name
      </th>
      <th>
        Student Advisor
      </th>
      <th>
        Track
      </th>
      <th>
          Graduation Date
      </th>
      <th>
          Survey_Baseline
      </th>
      <th>
         3 Month Follow-up
      </th>
    </tr>
  </thead>
  <tbody>
      {data.map((row) => {
        let gradComplete = ""
        if (row.grad_term != null && row.grad_year != null) {
          gradComplete = row.grad_term.charAt(0).toUpperCase() + row.grad_term.substring(1, row.grad_term.length) + " " + row.grad_year
        }
          return(
          <tr key = {row.id}>
              <td>{row.name}</td>
              <td>{row.advisor}</td>
              <td>{row.track}</td>
              <td>{gradComplete}</td>
              <td>
                <SurveyBaseline status={row.survey_status}/>
              </td>
              <td>
                <FollowUp status={row.follow_status}/>
              </td>
              
          </tr>)
      })}
      
     
  </tbody>
</Table>
      
    </div>
  )
}

function SurveyBaseline(props) {
  let status = props.status
  if (status === 0) { // not sent yet
    return <Button color='primary'>Send Survey</Button>
  } else if (status === 1) { // sent but no response yet
    return <Button color='primary'>Resend</Button>
  } else { // sent with response received
    return <Button color='primary'>View</Button>
  }
}

function FollowUp(props) {
  let status = props.status
  if (status === 0) { // not sent yet
    return <Button color='primary'>Send Survey</Button>
  } else if (status === 1) { // sent but no response yet
    return <Button color='primary'>Resend</Button>
  } else { // sent with response received
    return <Button color='primary'>View</Button>
  }
}
