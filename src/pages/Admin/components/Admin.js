import React, { useLayoutEffect, useEffect, useState } from 'react'
import useStore from '../../../hooks/useStore'
import { Button, Form, FormGroup, Label, Input, ButtonGroup, Navbar, Nav, Spinner } from 'reactstrap'
import '../../../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReadFromStudents from '../connectors/ReadFromStudents';
import RosterAdmin from './RosterAdmin';
import AdminButtons from './AdminButtons';



export default function Admin() {
    const [clickedCurrentStudents, setCurrentStudents] = useState(false)
    const [currentStudentsList, setCurrentStudentsList] = useState([])
    const [loading, setLoading] = useState(false)

    useLayoutEffect(handleCurrentStudents, [])

    async function handleCurrentStudents() {
        if (clickedCurrentStudents == false) {
           
            setLoading((prev) => {
                return !prev
            })
            
            const { data } = await ReadFromStudents()
            setCurrentStudentsList(() => {
                return ([
                    ...data
                ])
            })

            setTimeout(() => {setLoading((prev) => {
                return !prev
            }); setCurrentStudents((prevState) => {
                return !prevState
            })},1000)
        } 
    }

    return (
        <div  id="AddFormat">
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
                {clickedCurrentStudents ? <RosterAdmin /> : ''}
               
               
            </div>
            <div >
                <AdminButtons value = {currentStudentsList} studentTrigger={clickedCurrentStudents} />
            </div>
        </div>
    )
}
