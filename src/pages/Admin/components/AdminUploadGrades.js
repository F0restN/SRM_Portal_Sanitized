import React, {useCallback, useMemo,useState, useLayoutEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone';
import '../../../index.css'
import {Button, Form, FormGroup, Label, Input, ButtonGroup, FormText,Badge, Alert} from 'reactstrap'
import UploadGradeDoc from '../connectors/UploadResume';
import config from '../../../config.json';
import {FaFileUpload } from 'react-icons/fa';
import UploadResume from '../connectors/UploadResume';




export default function AdminUploadGrades() {
    const history = useHistory()
    const[files, setFiles] = useState([])
    const [studentDbInfo, setStudentDbInfo] = useState([])
    const studentId = useRef()
    const [uploadTarget, setUploadTarget] = useState({
        peoplesoft_id:""
    })
    const file_url = useRef("")
    useLayoutEffect( () =>  { async function ReadFromStudents(){
        const {data} = await axios.get(`${config.portal}/Students`, {
            headers: {
              Authorization:
                `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
            },
          });

    
          
         
        setStudentDbInfo({
            ...data
        })} ReadFromStudents()} ,[])
       

        
        const numRegex = new RegExp('^[0-9]+$')
        const [sanity_check_alert, setSanity_check_alert] = useState("")
        const [sanity_check_res, setSanity_check_res]= useState(true)
       
    
    const onDrop = useCallback(acceptedFiles => {
        var blob = new Blob([acceptedFiles[0]], { type: acceptedFiles[0].type })
        file_url.current = URL.createObjectURL(blob)
        setFiles(acceptedFiles)
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
      const file_list = files.map( (file) => (<div key={file.path}>
          <div>
              Selected File: <a href={file_url.current} target="_blank">{file.name}</a>
          </div>
      </div>))

    function backToAdmin()
    {
        history.push("/admin")
    }
    async function uploadDocument()
    {
        
        let sanity_check = true
        let response = ""
       

        if(numRegex.test(uploadTarget.peoplesoft_id) === false || uploadTarget.peoplesoft_id.length != 7)
        {
            response += "Incorrect Peoplesoft Id format" 
           
            sanity_check = false

        }
        if(files.length === 0)
        {
            if(response.length === 0)
            {
                response += "No Grades Document included" 

            }
            else
            {
                response += "\nNo Grades Document included" 

            }
            
           
            sanity_check = false

        }

        if(response.length === 0)
        {
            sanity_check = false
            for(let key in studentDbInfo)
            {
                if(studentDbInfo[key].peoplesoft_id == uploadTarget.peoplesoft_id )
                {
                    studentId.current = studentDbInfo[key].id
                    
                    sanity_check = true
                    break
                    

                }
            }
        }

        if(sanity_check == false && response.length === 0 )
        {
            response = ""
            response += "Student does not exists!"


        }
        else if(sanity_check == false && response.length !== 0)
        {
            response = response
        }

        if(sanity_check)
        {
            setSanity_check_res((prev) => {
                return true
            })

            

            await UploadResume(files[0], studentId.current)

            alert("Grades has been uploaded successfully!")
            history.push("/admin")

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
        
         <>
          <Form className="login-form">
        <h4 className="text-center p-3">Upload Grades: </h4>

        <Alert
                color="danger"
                className='alertion'
                hidden = {sanity_check_res}
                
            >
                {sanity_check_alert}
                
                
            </Alert>
        
       
        <FormGroup>
            <Label for="Peoplesoft_Id">
            Peoplesoft ID
            </Label>
            <Input
            id="Peoplesoft_Id"
            name="Peoplesoft_Id"
            placeholder="Peoplesoft Id"
            type="Peoplesoft_Id"

            onChange={e => setUploadTarget({
                ...uploadTarget,
                peoplesoft_id: e.target.value
            })}
            value = {uploadTarget.peoplesoft_id}
            
            
            />
        </FormGroup>
       
        <FormGroup>
        <Label for="Grades_Document">
            Grades Document
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
    </>

      )
  
}
