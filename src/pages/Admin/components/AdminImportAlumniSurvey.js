import React, {useCallback, useMemo,useState, useLayoutEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone';
import '../../../index.css'
import {Button, Form, FormGroup, Label, Input, ButtonGroup, FormText,Badge, Alert, Spinner} from 'reactstrap'
import UploadAlumniSurvey from '../connectors/UploadAlumniSurvey';
import config from '../../../config.json';
import {FaFileUpload } from 'react-icons/fa';
import * as XLSX from "xlsx"





export default function AdminImportAlumniSurvey() {
    const history = useHistory()
    const[files, setFiles] = useState([])
    const [sanity_check_alert, setSanity_check_alert] = useState("")
    const [sanity_check_res, setSanity_check_res]= useState(true)
    const par_key = useRef()
    const db_key = useRef(['career_level_code', 'emplid', 'full_name', 'catalog_number', 'subject_code', 'class_number', 
     'class_title','academic_plan_code','academic_sub_plan_code','instructor_emplid', 'primary_instructor_name'])
    const userName = useRef(eval ( new String(sessionStorage.getItem("currentUserName"))))
    let needToParsed = useRef(0)
    let alreadyParsed = useRef(0)
    const [parUploaing, setparUploading] = useState(false)
    const [parUpPercent, setParUpPercent] = useState(0)
    
    

    let par_obj = {}
    let parObjectOrder = {
        'career_level_code': null,
        'emplid': null,
        'full_name': null,
        'catalog_number': null,
        'subject_code': null,
        'class_number': null,
        'class_title': null,
        'academic_plan_code': null,
        'academic_sub_plan_code': null,
        'instructor_emplid': null,
        'primary_instructor_name': null
    }
       
    
    const onDrop = useCallback(acceptedFiles => {
        console.log(userName.current)
        
        setFiles(acceptedFiles)
        //acceptedFiles
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
      const file_list = files.map( (file) => (<div key={file.path}>
          <div>
              Selected File: {file.name}
          </div>
      </div>))

    function backToAdmin()
    {
        history.push("/adminAlumni")
    }
    async function uploadDocument()
    {
        
        let sanity_check = true
        let response = ""
       

        if(files.length === 0)
        {
            response += "No Alumni Survey included" 
            sanity_check = false

        }

       

      

        
        if(sanity_check)
        {
            setSanity_check_res((prev) => {
                return true
            })

            setparUploading((prev) => {
                return !prev
            })
            
            
            const reader = new FileReader()
            reader.readAsBinaryString(files[0]);
            reader.onload = (evt) => {
                const bstr = evt.target.result;
                
                const wb = XLSX.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const par_data = XLSX.utils.sheet_to_json(ws);
                par_key.current = Object.keys(par_data[0])

                needToParsed.current = par_data.length

                for(let i = 0; i < par_data.length; i++)
                {
                    for(let j = 0; j < par_key.current.length; j++)
                    {
                       
                        par_obj[db_key.current[j]] = par_data[i][par_key.current[j]]
                        
                    }
                   
                    par_obj["creator"] = userName.current
                    par_obj["updater"] = userName.current
                    
                    
                    UploadAlumniSurvey(par_obj).then(()=> {
                        
                        alreadyParsed.current = alreadyParsed.current+1; 
                        //console.log(alreadyParsed.current)
                        setParUpPercent(() => {return Math.trunc((alreadyParsed.current / needToParsed.current)*100)})
                        console.log(parUpPercent)
                        if(alreadyParsed.current >= needToParsed.current)
                        {
                            setFiles([]);
                            history.push("/admin")
                        }
                    })
                }  
            }
        }
        else
        {
            setSanity_check_res((prev) => {
                return false
            })

            setSanity_check_alert(response.split("\n").map(str => <li  key = {str}><span>{str}</span></li>))

        }
    }

   
    return (
    <div >
        <div hidden = {parUploaing}>
          <Form className="login-form">
        <h4 className="text-center p-3">Import Alumni Survey: </h4>

        <Alert
                color="danger"
                className='alertion'
                hidden = {sanity_check_res}
                
            >
                {sanity_check_alert}
        </Alert>
        <FormGroup>
        <Label for="Alumni_Survey">
            Alumni Survey
        </Label>
        <div className = 'area ' {...getRootProps()}>
          <input type = "file" id= "upload" {...getInputProps()} />
          <br></br>
          <br></br>
          <br></br>
          <FaFileUpload size = "4em" color='grey'/>
          <br></br>
          <br></br>
          {
            isDragActive ?
              <p>Drop file here.</p> :
              <p>Drag and drop file here, or click to select file</p>
          }
          </div>
          </FormGroup>
          <div >{file_list}</div>

          </Form>
          
      <div>
      <Form className="login-form">
        <div className = "row">
        <Button className = "col" color="primary" onClick = {backToAdmin}>
            Back
        </Button>
        
        <div className = "col" ></div>
        <Button className = "col" color="primary" onClick={uploadDocument} >
            Submit
        </Button>
        
        </div> 
        </Form>
        </div>
        </div>

        <div hidden = {!parUploaing} className = "centeredLoad">
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
        <div className="cenCenteredLoad">
        <p >{parUpPercent} %</p>
        </div>
        </div>
    </div>)
  
}

