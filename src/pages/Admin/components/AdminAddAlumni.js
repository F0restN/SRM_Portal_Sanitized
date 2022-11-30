import React, {useLayoutEffect, useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input, ButtonGroup, FormText, Badge, Alert, Collapse,InputGroup} from 'reactstrap'
import '../../../index.css'
import AddStudents from '../connectors/AddStudents'
import axios from 'axios';
import config from '../../../config.json';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import UploadResume from '../connectors/UploadResume';
import UploadAdDoc from '../connectors/UploadAdDoc';


export default function AdminAddAlumni() {
    const history = useHistory();
    const [db_studentInfo, setdb_studentInfo] = useState([])
    const [db_programInfo, setdb_programInfo] = useState([])
    const [db_advisorInfo, setdb_advisorInfo] = useState([])
    const [studentDbInfo, setStudentDbInfo] = useState([])

    // Get Student info from DB
    useLayoutEffect( () =>  { async function ReadFromStudents(){
        const {data} = await axios.get(`${config.portal}/Students`, {
            headers: {
              Authorization:
                `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
            },
          });

    
          
         
        setdb_studentInfo({
            ...data
        })} ReadFromStudents()} ,[])
    
    // Get Program info from DB
     /*useLayoutEffect( () =>  { async function ReadFromPrograms(){
            const {data} = await axios.get(`${config.portal}/Programs`, {
                headers: {
                  Authorization:
                    `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
                },
              });

            setdb_programInfo({
                ...data
            })} ReadFromPrograms()} ,[])*/
    
    // Get Advisor info from DB
    useLayoutEffect( () =>  { async function ReadFromAdvisors(){
                const {data} = await axios.get(`${config.portal}/Advisors`, {
                    headers: {
                      Authorization:
                        `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
                    },
                  });
    
                setdb_advisorInfo({
                    ...data
                })} ReadFromAdvisors()} ,[])
        
    const [sanity_check_res, setSanity_check_res]= useState(false)
    const [sanity_check_alert, setSanity_check_alert] = useState("")
    let uploadResume  = useRef(null)
    let uploadAd_package = useRef(null)
    let studentId = useRef(0)
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        peoplesoft_id: null,
        email: "",
        advisor: "",
        start_term:"",
        start_year:null,
        gender:"",
        admission_gpa:"",
        year_of_birth:null,
        company:"",
        position:"",
        job_start_year:null,
        undergrad_major:"",
        prev_grad_year:null,
        street:"",
        city:"",
        state:"",
        zipcode:null,
        prev_school: "",
        status:"",
        type:""

    })
    let program_options = []

   
    for(let key in db_programInfo)
    {
        program_options.push({ value: db_programInfo[key].name, label: db_programInfo[key].name })
    }
    
    const term_options = [
        {value: 'Summer', label: 'Summer'},
        {value: 'Spring', label: 'Spring'},
        {value: 'Fall', label: 'Fall'}
    ]

    const gender_options = [
        {value: 'Male', label: 'Male'},
        {value: 'Female', label: 'Female'},
        {value: 'Prefer not to say', label: 'Prefer not to say'}

    ]

    const status_options = [
        {value: 'FT', label: 'FT'},
        {value: 'PT', label: 'PT'}

    ]

    const type_options = [
        {value: 'ONLINE', label: 'ONLINE'},
        {value: 'ONCMP', label: 'ONCMP'}
    ]

    let advisor_options = []
    for(let key in db_advisorInfo)
    {
        advisor_options.push({ value: db_advisorInfo[key].name, label: db_advisorInfo[key].name })
    }
    
    let nameCheck = useRef(null)
    let peoplesoft_IdCheck = useRef(null)
    let emailCheck = useRef(null)
    let admission_gpaCheck = useRef(null)
    let yearOfBirthCheck = useRef(null)
    let startYearCheck = useRef(null)
    let resumeCheck = useRef(null)
    let admission_packageCheck = useRef(null)
    let companyCheck = useRef(null)
    let genderCheck = useRef(null)
    let advisorCheck = useRef(null)
    let startTermCheck = useRef(null)
    let streetCheck = useRef(null)
    let cityCheck = useRef(null)
    let stateCheck = useRef(null)
    let zipCodeCheck = useRef(null)
    let positionCheck = useRef(null)
    let JobStartYearCheck = useRef(null)
    let unbderGradMajorCheck = useRef(null)
    let prevGradYearCheck = useRef(null)
    let prevSchoolCheck = useRef(null)

    let statusCheck = useRef(null)
    let typeCheck = useRef(null)
    


    const [yearOB, setYearOB] = useState(null)
    const [start_date, setStart_date] = useState(null)
    const[job_start_date, setJob_Start_date] = useState(null)
    const[year_prev_grad, setYear_prev_grad] = useState(null)

    const[inputStudentsInfo, setInputStudentsInfo] = useState(true)
    const[inputPrevsInfo, setInputPrevsInfo] = useState(true)
    const[inputAttachsInfo, setInputAttachsInfo] = useState(true)
    const[inputMailingsInfo, setInputMailingsInfo] = useState(true)
    const options = {year: 'numeric'}
    const nameRegex = new RegExp('^[a-zA-Z]+[\\s]?[a-zA-Z]+$')
    const numRegex = new RegExp('^[0-9]+$')
    //const emailRegex = new RegExp('^[a-zA-Z0-9]([\.-_?!]?[a-zA-Z0-9]+)+@[a-zA-Z0-9]+([\.-_?!]?[a-zA-Z0-9]+)*[a-zA-Z0-9]*$')
    //const gpaRegex = new RegExp('^[0-9]{1}[\\.]{1}[0-9]{1,}$')

    function inputStudentInfo()
    {
        setInputStudentsInfo((prev) => {
            return !prev
        })

    }
    function inputPrevInfo()
    {
        setInputPrevsInfo((prev) => {
            return !prev
        })

    }
    function inputAttachInfo()
    {
        setInputAttachsInfo((prev) => {
            return !prev
        })

    }
    function inputMailingInfo(){
        setInputMailingsInfo((prev) => {
            return !prev
        })

    }

    
    async function submitStudentForm() {

        let sanity_check = true
        let response = ""
 
        if( studentInfo.name.length <= 0 )
        {
            
           nameCheck.current = false
           sanity_check = false
        }
        else
        {
            nameCheck.current = true
        }

        if (studentInfo.peoplesoft_id !=null && studentInfo.peoplesoft_id.length > 0 && (numRegex.test(studentInfo.peoplesoft_id) === false || studentInfo.peoplesoft_id.length != 7)) {
            
            peoplesoft_IdCheck.current = false
            sanity_check = false
            

        }
        else
        {
            
            let pass = true
            for (let key in db_studentInfo) {
                if (studentInfo.peoplesoft_id != null && studentInfo.peoplesoft_id.length > 0 && db_studentInfo[key].peoplesoft_id == studentInfo.peoplesoft_id) {
                    peoplesoft_IdCheck.current = false
                    sanity_check = false
                    pass = false
                    break
                }
                if(!studentId.current)
                {
                    studentId.current = db_studentInfo[key].id

                }
                else
                {
                    if(studentId.current < db_studentInfo[key].id)
                    {
                        studentId.current = db_studentInfo[key].id
                    }
                }
                
            }
            if(pass === true)
            {
                peoplesoft_IdCheck.current = true
            }
            else
            {
                peoplesoft_IdCheck.current = false

            }
        }
        
        emailCheck.current = true
        admission_gpaCheck.current = true
        yearOfBirthCheck.current = true
        genderCheck.current = true
        advisorCheck.current = true
        startYearCheck.current = true
        startTermCheck.current = true
        companyCheck.current = true
        resumeCheck.current = true
        admission_packageCheck.current = true
        streetCheck.current = true
        cityCheck.current = true
        stateCheck.current = true
        if (studentInfo.zipcode !=null && studentInfo.zipcode.length > 0 && numRegex.test(studentInfo.zipcode) === false) {
            
            zipCodeCheck.current = false
            sanity_check = false
            

        }
        else
        {
            zipCodeCheck.current = true
        }
        
        positionCheck.current = true
        JobStartYearCheck.current = true
        unbderGradMajorCheck.current = true
        prevGradYearCheck.current = true
        prevSchoolCheck.current = true
        typeCheck.current = true
        statusCheck.current = true

        


       

        if (sanity_check) {
            

            setSanity_check_res((prev) => {
                return true
            })
            //await AddStudents(studentInfo)
            if(uploadResume.current)
            {
                //await UploadResume(uploadResume.current, studentId.current+1)
            }
            if(uploadAd_package.current)
            {
                //await  UploadAdDoc(uploadAd_package.current, studentId.current+1)
            }
            
            
            alert("Congradulations! You successfully added the alumni!")
            history.push("/admin")

       
            
            
           
        } else {
            setSanity_check_res((prev) => {
                return false
            })
            setSanity_check_alert(response.split("\n").map(str => <li key={str}><span>{str}</span></li>))
        }
    }

    function backToAdmin() {
        history.push('/admin')
    }

    return (
        <div id="AddFormat">
            <Form className="login-form">
                <h4 className="text-center p-3">Add Alumni: </h4>
            </Form>
            <div className="addStudent-form">

            <div id = "addStudentInside-form" >
                
                <Form autoComplete="off">
                    <Button 

                        color={inputStudentsInfo? 'primary':'secondary'}
                        onClick={inputStudentInfo}
                        style={{
                        marginBottom: '2rem',
                        }}
                    >
                        Admission Information 
                    </Button>
                    
                    <Collapse isOpen = {inputStudentsInfo}>
                    <FormGroup>
                        <Label for="name">
                            Name
                        </Label>
                        <Input
                            valid = {nameCheck.current === null? null:nameCheck.current}
                            invalid = {nameCheck.current === null? null:!nameCheck.current}
                            id="name"
                            name="name"
                            placeholder="Name"
                            type="name"
                            onChange={e => {{setStudentInfo({
                                ...studentInfo,
                                name: e.target.value
                            })}}}
                            value={studentInfo.name}
                        />
                        
   
                        
                    </FormGroup>

                    <FormGroup>
                        <Label for="Peoplesoft_Id">
                            Peoplesoft ID
                        </Label>
                        <Input
                            valid = {peoplesoft_IdCheck.current === null? null:peoplesoft_IdCheck.current}
                            invalid = {peoplesoft_IdCheck.current === null? null:!peoplesoft_IdCheck.current}
                            id="Peoplesoft_Id"
                            name="Peoplesoft_Id"
                            placeholder="Peoplesoft Id"
                            type="Peoplesoft_Id"
                            onChange={e => {setStudentInfo({
                                ...studentInfo,
                                peoplesoft_id: e.target.value.length >0?e.target.value:null
                            })}}
                            value={studentInfo.peoplesoft_id}
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input
                            valid = {emailCheck.current === null? null:emailCheck.current}
                            invalid = {emailCheck.current === null? null:!emailCheck.current}
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                email: e.target.value
                            })} value={studentInfo.email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="yearOfBirth">
                            Year of Birth
                        </Label>
                        <InputGroup >
                       
                        <DatePicker
                            customInput={<Input  valid = {yearOfBirthCheck.current === null? null:yearOfBirthCheck.current}
                            invalid = {yearOfBirthCheck.current === null? null:!yearOfBirthCheck.current} />}
                            showYearPicker
                            dateFormat="yyyy"
                            yearItemNumber={10}
                            closeOnScroll={true}
                            selected={Date.parse(yearOB)}
                            onChange={(date) => {
                                setYearOB(date)
                                if (date) {
                                    setStudentInfo({
                                        ...studentInfo,
                                        year_of_birth: date.toLocaleDateString('en-GB', options)
                                    })
                                } else {
                                    setStudentInfo({
                                        ...studentInfo,
                                        year_of_birth: null
                                    })
                                }
                            }
                            }
                            placeholderText="Year of Birth"
                        />
                        </InputGroup>
                       
                    </FormGroup>
                    <FormGroup>
                        <Label for="admission_gpa">
                            Admission GPA
                        </Label>
                        <Input
                            valid = {admission_gpaCheck.current === null? null:admission_gpaCheck.current}
                            invalid = {admission_gpaCheck.current === null? null:!admission_gpaCheck.current}
                            id="admission_gpa"
                            name="admission_gpa"
                            placeholder="Admission GPA"
                            type="admission_gpa"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                admission_gpa: e.target.value
                            })} value={studentInfo.admission_gpa}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="advisor">
                            Advisor
                        </Label>
                        <br/>
                        <Input  type="select"  valid = {advisorCheck.current === null? null:advisorCheck.current}
                            invalid = {advisorCheck.current === null? null:!advisorCheck.current}  onChange={e => {console.log(e.currentTarget.value); setStudentInfo({
                            ...studentInfo,
                            advisor: e.currentTarget.value
                        })}}>
                            <option value="" disabled selected >Advisor</option>
                           {advisor_options.map(x =>  {return <option key={x.value} title= {x.value} value = {x.value}>{x.value}</option>})}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="gender">
                            Gender
                        </Label>
                        <br/>
                        
                        <Input type="select"  valid = {genderCheck.current === null? null:genderCheck.current}
                            invalid = {genderCheck.current === null? null:!genderCheck.current}  onChange={e => {console.log(e.currentTarget.value); setStudentInfo({
                            ...studentInfo,
                            gender: e.currentTarget.value
                        })}}>
                            <option value="" disabled selected >Gender</option>
                           {gender_options.map(x =>  {return <option key={x.value} title= {x.value} value = {x.value}>{x.value}</option>})}
                        </Input>
                      
                        
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">
                            Academic Status
                        </Label>
                        <br/>
                        
                        <Input type="select"  value= {studentInfo.status} valid = {statusCheck.current === null? null:statusCheck.current}
                            invalid = {statusCheck.current === null? null:!statusCheck.current}  onChange={e => {setStudentInfo({
                            ...studentInfo,
                            status: e.currentTarget.value
                        })}}>
                            <option value="" disabled selected >Academic Status</option>
                           {status_options.map(x =>  {return <option key={x.value} title= {x.value} value = {x.value}>{x.value}</option>})}
                        </Input>
                      
                        
                    </FormGroup>

                    <FormGroup>
                        <Label for="type">
                            Academic Type
                        </Label>
                        <br/>
                        
                        <Input type="select"  value= {studentInfo.type} valid = {typeCheck.current === null? null:typeCheck.current}
                            invalid = {typeCheck.current === null? null:!typeCheck.current}  onChange={e => {setStudentInfo({
                            ...studentInfo,
                            type: e.currentTarget.value
                        })}}>
                            <option value="" disabled selected >Academic Type</option>
                           {type_options.map(x =>  {return <option key={x.value} title= {x.value} value = {x.value}>{x.value}</option>})}
                        </Input>
                      
                        
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Start Term
                        </Label>
                        <br/>
                       
                        
                        <DatePicker
                            customInput={<Input valid = {startYearCheck.current === null? null:startYearCheck.current}
                            invalid = {startYearCheck.current=== null? null:!startYearCheck.current} />}
                            showYearPicker
                            dateFormat="yyyy"
                            yearItemNumber={10}
                            closeOnScroll={true}
                            selected={Date.parse(start_date)}
                            onChange={(date) => {
                                setStart_date(date)
                                if (date) {
                                    setStudentInfo({
                                        ...studentInfo,
                                        start_year: date.toLocaleDateString('en-GB', options)
                                    })
                                } else {
                                    setStudentInfo({
                                        ...studentInfo,
                                        start_year: null
                                    })

                                }
                            }
                            }
                            placeholderText="Year"
                        />
                        
                        <Input type="select"  valid = {startTermCheck.current === null? null:startTermCheck.current}
                            invalid = {startTermCheck.current === null? null:!startTermCheck.current}  onChange={e => {console.log(e.currentTarget.value); setStudentInfo({
                            ...studentInfo,
                            start_term: e.currentTarget.value
                        })}}>
                            <option value="" disabled selected >Term</option>
                           {term_options.map(x =>  {return <option key={x.value} title= {x.value} value = {x.value}>{x.value}</option>})}
                        </Input>
                        
                    </FormGroup>
                    </Collapse>
    
                </Form>
                
            </div>
            <div id = "addStudentInside-form"  >
                <Form  autoComplete="off">
                    <Button
                    
                        color={inputPrevsInfo? 'primary':'secondary'}
                        onClick={inputPrevInfo}
                        style={{
                        marginBottom: '2rem'
                        }}
                    >
                         Experience/s
                    </Button>
                    
                    <Collapse isOpen = {inputPrevsInfo}>
                        <FormGroup>
                        <Label for="company">
                            Company
                        </Label>
                        <Input valid = {companyCheck.current === null? null:companyCheck.current}
                            invalid = {companyCheck.current === null? null:!companyCheck.current}
                            id="company"
                            name="company"
                            placeholder="Company"
                            type="company"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                company: e.target.value
                            })}
                            value={studentInfo.company}
                        />
                     </FormGroup>
                     <FormGroup>
                        <Label for="position">
                            Position
                        </Label>
                        <Input valid = {positionCheck.current === null? null:positionCheck.current}
                            invalid = {positionCheck.current === null? null:!positionCheck.current}
                            id="position"
                            name="position"
                            placeholder="Position"
                            type="position"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                position: e.target.value
                            })}
                            value={studentInfo.position}
                        />
                     </FormGroup>

                     <FormGroup>
                        <Label for="jobStartYear">
                            Job Start Year
                        </Label>
                        <InputGroup >
                       
                        <DatePicker
                            customInput={<Input  valid = {JobStartYearCheck.current === null? null:JobStartYearCheck.current}
                            invalid = {JobStartYearCheck.current === null? null:!JobStartYearCheck.current} />}
                            showYearPicker
                            dateFormat="yyyy"
                            yearItemNumber={10}
                            closeOnScroll={true}
                            selected={Date.parse(job_start_date)}
                            onChange={(date) => {
                                setJob_Start_date(date)
                                if (date) {
                                    setStudentInfo({
                                        ...studentInfo,
                                        job_start_year: date.toLocaleDateString('en-GB', options)
                                    })
                                } else {
                                    setStudentInfo({
                                        ...studentInfo,
                                        job_start_year: null
                                    })
                                }
                            }
                            }
                            placeholderText="Year"
                        />
                        </InputGroup>
                       
                    </FormGroup>

                    <FormGroup>
                        <Label for="prev_school">
                            Previous School Name
                        </Label>
                        <Input valid = {prevSchoolCheck.current === null? null:prevSchoolCheck.current}
                            invalid = {prevSchoolCheck.current === null? null:!prevSchoolCheck.current}
                            id="prev_school"
                            name="prev_school"
                            placeholder="School Name"
                            type="prev_school"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                prev_school: e.target.value
                            })}
                            value={studentInfo.prev_school}
                        />
                     </FormGroup>

                    <FormGroup>
                        <Label for="undergrad_major">
                             Previous Major
                        </Label>
                        <Input valid = {unbderGradMajorCheck.current === null? null:unbderGradMajorCheck.current}
                            invalid = {unbderGradMajorCheck.current === null? null:!unbderGradMajorCheck.current}
                            id="undergrad_major"
                            name="undergrad_major"
                            placeholder="Major"
                            type="undergrad_major"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                undergrad_major: e.target.value
                            })}
                            value={studentInfo.undergrad_major}
                        />
                     </FormGroup>

                     <FormGroup>
                        <Label for="prevGradYear">
                            Previous graduation Year
                        </Label>
                        <InputGroup >
                       
                        <DatePicker
                            customInput={<Input  valid = {prevGradYearCheck.current === null? null:prevGradYearCheck.current}
                            invalid = {prevGradYearCheck.current=== null? null:!prevGradYearCheck.current} />}
                            showYearPicker
                            dateFormat="yyyy"
                            yearItemNumber={10}
                            closeOnScroll={true}
                            selected={Date.parse(year_prev_grad)}
                            onChange={(date) => {
                                setYear_prev_grad(date)
                                if (date) {
                                    setStudentInfo({
                                        ...studentInfo,
                                        prev_grad_year: date.toLocaleDateString('en-GB', options)
                                    })
                                } else {
                                    setStudentInfo({
                                        ...studentInfo,
                                        prev_grad_year: null
                                    })
                                }
                            }
                            }
                            placeholderText="Previous Graduation Year"
                        />
                        </InputGroup>
                       
                    </FormGroup>
                    
                    
                    </Collapse>
                    
                    </Form>
            </div>
            
            <div id = "addStudentInside-form" >
                <Form autoComplete="off">
                    <Button
                        color={inputMailingsInfo? 'primary':'secondary'}
                        onClick={inputMailingInfo}
                        style={{
                        marginBottom: '2rem'
                        }}
                    >
                         Address
                    </Button>
                    
                    <Collapse isOpen = {inputMailingsInfo}>
                    
                    <FormGroup>
                        <Label for="street_information">
                            Street 
                        </Label>
                        <Input valid = {streetCheck.current === null? null:streetCheck.current}
                            invalid = {streetCheck.current === null? null:!streetCheck.current}
                            id="street_information"
                            name="street_information"
                            placeholder="Street"
                            type="street_information"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                street: e.target.value
                            })}
                            value={studentInfo.street}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city_information">
                            City/Town
                        </Label>
                        <Input valid = {cityCheck.current === null? null:cityCheck.current}
                            invalid = {cityCheck.current === null? null:!cityCheck.current}
                            id="city_information"
                            name="city_information"
                            placeholder="City/Town"
                            type="city_information"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                city: e.target.value
                            })}
                            value={studentInfo.city}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="state_information">
                            State
                        </Label>
                        <Input valid = {stateCheck.current === null? null:stateCheck.current}
                            invalid = {stateCheck.current === null? null:!stateCheck.current}
                            id="state_information"
                            name="state_information"
                            placeholder="State"
                            type="state_information"
                            onChange={e => setStudentInfo({
                                ...studentInfo,
                                state: e.target.value
                            })}
                            value={studentInfo.state}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="zipcode_information">
                            Zip Code
                        </Label>
                        <Input valid = {zipCodeCheck.current === null? null:zipCodeCheck.current}
                            invalid = {zipCodeCheck.current === null? null:!zipCodeCheck.current}
                            id="zipcode_information"
                            name="zipcode_information"
                            placeholder="Zip Code"
                            type="zipcode_information"
                            onChange={e => 
                                setStudentInfo({
                                ...studentInfo,
                                zipcode: e.target.value.length > 0?e.target.value:null
                                
                            })}
                            value={studentInfo.zipcode}
                        />
                    </FormGroup>
                    </Collapse>
                    
                    </Form>
                </div>
                <div  id = "addStudentInside-form">
                <Form autoComplete="off">
                    <Button
                        color={inputAttachsInfo? 'primary':'secondary'}
                        onClick={inputAttachInfo}
                        style={{
                        marginBottom: '2rem'
                        }}
                    >
                         Attachments
                    </Button>
                    
                    <Collapse isOpen = {inputAttachsInfo}>
                    
                    <FormGroup>
                        <Label for="resume">
                        Resume/CV
                        </Label>
                        <Input
                        valid = {resumeCheck.current === null? null:resumeCheck.current}
                        invalid = {resumeCheck.current === null? null:!resumeCheck.current}
                        id="resume"
                        name="resume"
                        type="file"
                        onChange={(e) => uploadResume.current = e.target.files[0]}
                        />
                        <FormText>
                            Resume/CV
                        </FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="ad_package">
                        Admission Package
                        </Label>
                        <Input
                        valid = {admission_packageCheck.current === null? null:admission_packageCheck.current}
                        invalid = {admission_packageCheck.current === null? null:!admission_packageCheck.current}
                        id="ad_package"
                        name="ad_package"
                        type="file"
                        onChange={(e) => uploadAd_package.current = e.target.files[0]}
                        />
                        <FormText>
                            Admission Package
                        </FormText>
                    </FormGroup>

                    </Collapse>
                    
                </Form>
                </div>
            </div>
           
            
            <Form className="login-form">
                <div className="row">
                    <Button className="col" color="primary" onClick={backToAdmin}>
                        Back
                    </Button>
                    <div className="col"/>
                    <Button className="col" color="primary" onClick={submitStudentForm}>
                        Submit
                    </Button>
                </div>
                

            </Form>



        </div>
        
    )
 }
