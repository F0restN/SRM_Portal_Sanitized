import React, {useCallback, useMemo,useState, useLayoutEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone';
import '../../../index.css'
import {Button, Form, FormGroup, Label, Input, ButtonGroup, FormText,Badge, Alert} from 'reactstrap'
import UploadAdDoc from '../connectors/UploadAdDoc';
import config from '../../../config.json';
import {FaFileUpload } from 'react-icons/fa';




export default function AdminUploadAdmission() {
    const history = useHistory()
    const[files, setFiles] = useState([])
    const [studentDbInfo, setStudentDbInfo] = useState([])
    const studentId = useRef()
    const [uploadTarget, setUploadTarget] = useState({
        peoplesoft_id:""
    })
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
       
    
    const onDrop = (acceptedFiles) => {
        let repeatFileChecker = false
        for(let i = 0; i < files.length; i++)
        {
            if(acceptedFiles[0].name === files[i][0].name)
            {
                repeatFileChecker = true
                break
                
            }
        }
        
        if( repeatFileChecker === true)
        {
            repeatFileChecker = true
        }
        else
        {
            setFiles((prevFile) => [...prevFile, acceptedFiles])
        }
        

      }
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,multiple: true})
      const file_list = files.map((file) =>( <div key={file[0].name}> 
          <div>
              Selected File: {file[0].name}  <Button  size ="sm" color="primary" onClick={() => deleteFile(file[0].name)}>Delete</Button>
          </div>
      </div>))

    function deleteFile(name)
    {
        
        setFiles(files.filter(item => item[0].name != name))
        
    }

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
                response += "No Admission Document included" 

            }
            else
            {
                response += "\nNo Admission Document included" 

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



            files.map( (file) => {
                UploadAdDoc(file[0], studentId.current)

            })

            alert("Admission Document has been uploaded successfully!")
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
        <h4 className="text-center p-3">Upload Admission Documents: </h4>

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
        <Label for="Admission_Document">
            Admission Documents
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
            <p>Drop file here</p> :
            <p>Drag and drop files here, or click to select files</p>
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
