
import React, { useLayoutEffect, useEffect, useState } from 'react'
import useStore from '../../../hooks/useStore'
import { Button, Form, FormGroup, Label, Input, ButtonGroup, Navbar, Nav, Spinner } from 'reactstrap'
import '../../../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReportAdmin from './ReportAdmin';

export default function AdminReport() {
    const[clickedReport, setClickedReport] = useState(false)
    const [loading, setLoading] = useState(false)

    useLayoutEffect(handleReport, [])
    
    async function handleReport() {
        if (clickedReport == false) {
            setLoading((prev) => {
                return !prev
            })
            

            setTimeout(() => {setLoading((prev) => {
                return !prev
            }); setClickedReport((prevState) => {
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
                
               
                {clickedReport ? <ReportAdmin /> : ''}
            </div>
            
      
    </div>
  )
}
