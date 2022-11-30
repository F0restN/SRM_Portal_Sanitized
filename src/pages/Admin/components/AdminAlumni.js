import React, { useLayoutEffect, useEffect, useState } from 'react'
import useStore from '../../../hooks/useStore'
import { Button, Form, FormGroup, Label, Input, ButtonGroup, Navbar, Nav, Spinner } from 'reactstrap'
import '../../../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReadFromAlumnis from '../connectors/ReadFromAlumnis';
import RosterAlumniAdmin from './RosterAlumniAdmin';
import AdminButtons from './AdminButtons';


export default function AdminAlumni() {
const [clickedCurrentAlumni, setCurrentAlumni] = useState(false)
const [currentAlumnisList, setCurrentAlumniList] = useState([])
const [loading, setLoading] = useState(false)

useLayoutEffect(handleCurrentAlumni, [])

async function handleCurrentAlumni() {
    if (clickedCurrentAlumni == false) {
        setLoading((prev) => {
            return !prev
        })
        const { data } = await ReadFromAlumnis()
        setCurrentAlumniList(() => {
            return ([
                ...data
            ])
        })
        

        setTimeout(() => {setLoading((prev) => {
            return !prev
        }); setCurrentAlumni((prevState) => {
            return !prevState
        })},1000)
    }
}
  return (
    <div>
        <div>
            <div hidden = {!loading} className = "centeredLoad">
                        <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>

                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>

                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>

                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                </div>
               
               {clickedCurrentAlumni ? <RosterAlumniAdmin value={currentAlumnisList} /> : ''}
            </div>
            <div >
                <AdminButtons alumniTrigger = {clickedCurrentAlumni} />
            </div>
    </div>
  )
}
