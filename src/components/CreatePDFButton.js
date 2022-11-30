import {useEffect, useState} from "react";
import axios from "axios";
import config from "../config.json"
import {Button} from "reactstrap";
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import SelectedCoursesFetch from "../pages/CoursePlanner/hooks/SelectedCoursesFetch";
import ProgramSemestersFetch from "../pages/CoursePlanner/hooks/ProgramSemestersFetch";
import StudentFetch from "../pages/CoursePlanner/hooks/StudentFetch";
import store from "../store/store";

export default function CreatePDFButton(props) {
    const [disabled, setDisabled] = useState(false)
    const [pos, setPos] = useState()
    const [track, setTrack] = useState()
    const [info, setInfo] = useState()
    const authenticationStatus = store.getState()
    const [studentData, setStudentData] = useState()

    let fetchConfig = {
        headers: {'Authorization': `Bearer ${authenticationStatus.jwtToken}`}
    }

    async function getStudyPlan() {
        const {loading, error, data} = await axios.get(`${config.portal}/students-courses?student_id=${props.id}`, {
            method: "GET",
            headers: {
                Authorization:
                    `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
            },
        })
        setDisabled(data.length == 0)
        setPos(data)
    }

    async function getTrack() {
        const {loading, error, data} = await axios.get(`${config.portal}/students?id=${props.id}`, {
            method: "GET",
            headers: {
                Authorization:
                    `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
            },
        })
        setStudentData(data[0])
        setTrack(data[0].track)
    }

    async function getCourseList() {
        try {
            let [studentLoading, studentError, fetchData] = await StudentFetch({"id": props.id}, fetchConfig)
            let student = fetchData

            let [selectionLoading, selectionError, selectionData] = await SelectedCoursesFetch({studentId: props.id}, fetchConfig)
    
            let [psLoading, psError, psData] = await ProgramSemestersFetch({
                student_start_term: student.studentInfo.start_term,
                student_start_year: student.studentInfo.start_year,
                program_duration: student.studentInfo.program.duration
            }, fetchConfig)
            let displayArr = []
            psData.map((semester, index) => {
                let sliceYear = semester.slice(0, 4)
                let sliceTerm = semester.slice(4, semester.length)
                selectionData?.forEach((obj, index) => {
                    if (obj.courseYear.toString() === sliceYear && obj.courseTerm === sliceTerm) {
                        displayArr.push({
                            ...obj,
                        })
                    }
                })
            })
            setInfo(displayArr)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        (async () => {
            await getStudyPlan()
            await getTrack()
            await getCourseList()
        })()
    }, [])
    function HandlePDF(pos, track) {
        let courseTableBody = []
        courseTableBody.push([{text: 'Course #', style: 'tableHeader'}, {text: 'Title of Course', style: 'tableHeader'}, {text: 'Day', style: 'tableHeader'}, {text: 'Year/Term to Take', style: 'tableHeader'}, {text: 'Year/Term Taken', style: 'tableHeader'}, {text: 'Credit', style: 'tableHeader'}, {text: 'Grade', style: 'tableHeader'}, {text: 'Course for a Certificate (Check \'X\')', style: 'tableHeader'}])
        let selectedCourseDict = new Object();
        pos.forEach(course => {
            let uid = course.course_id
            selectedCourseDict[uid] = 
                {   
                    term: course.term, 
                    year: course.year,
                    id: uid
                }
        })
        info.forEach(course => {
            let posCourseId = course.courseUid
            let courseData = selectedCourseDict[posCourseId]
            const today = new Date();
            let currYear = today.getFullYear();
            let currTerm = (today.getMonth() <= 4 ? 0 : today.getMonth() <= 8 ? 1 : 2) // 0 spring 1 summer 2 fall;
            if (courseData !== undefined) {
                let prev = false;
                if (parseInt(currYear) < parseInt(courseData.year)) {
                    prev = false;
                } else if (parseInt(currYear) === parseInt(courseData.year)) {
                    let dataTerm = (courseData.term === 'Spring' ? 0 : courseData.term === 'Summer' ? 1 : 2)
                    if (currTerm >= dataTerm) {
                        prev = true
                    } else {
                        prev = false
                    }
                } else {
                    prev = true;
                }
                courseTableBody.push(
                    [
                        {text: (course.prefix? course.coursePrefix: "HI" + " ") + course.courseId, fontSize: 8},
                        {text: course.courseTitle, fontSize: 8},
                        {text: course.courseDay, fontSize: 8},
                        {text: (prev ? '' : courseData.year + " " +  courseData.term), fontSize: 8}, // year/term to take
                        {text: (prev ? courseData.year + " " + courseData.term : ''), fontSize: 8}, // year term taken
                        {text: course.courseCredit, fontSize: 8},
                        "",
                        ""
                    ]
                )
            }
        })
        let univName = "University of Pittsburgh"
        let schoolName = "School of Health and Rehabilitation Sciences"
        let deptName = "Department of Health Information Management"
        let dd = {
            content: [
                {text: univName, style: 'header', alignment: 'center'},
                {text: schoolName, style: 'subheader', alignment: 'center'},
                {text: deptName, style: 'subheader', alignment: 'center'},
                {
                    text: track + " Track Plan of Studies (" + getTotalCredit(courseTableBody) + " total credits)",
                    alignment: 'center',
                    style: 'subheader'
                },
                {
                    table: {
                        body: [["MR. MS. MRS.", "LAST NAME \t FIRST NAME \t MIDDLE/MAIDEN NAME", 'PEOPLESOFT ID'],
                            [" ", studentData.name.split(" ")[1]+",\t\t"+studentData.name.split(" ")[0], studentData.peoplesoft_id],
                        ],
                        widths: ["auto", '*', 'auto']
                    },
                    style: 'tableContent'
                },
                {
                    table: {
                        body: [
                            [{
                                text: "PRESENT MAILING ADDRESS \tSTREET\tCITY\tSTATE\tZIP CODE",
                                colSpan: 2
                            }, {}, "PHONE (AREA CODE & NO.)"],
                            [{text: " ", colSpan: 2}, {}, " "],
                        ],
                        widths: ['*', 'auto', 'auto']
                    },
                    style: 'tableContent'
                },
                {
                    table: {
                        body: [
                            [{
                                text: "PERMANENT MAILING ADDRESS\tSTREET\tCITY\tSTATE\tZIP CODE",
                                colSpan: 2
                            }, {}, "PHONE (AREA CODE & NO.)"],
                            [{text: " ", colSpan: 2}, {}, " "],
                        ],
                        widths: ['*', 'auto', 'auto']
                    },
                    style: 'tableContent'
                },
                {
                    table: {
                        body: [
                            [{text: "STATUS:  FULL TIME ["+(studentData.status=='FT'?'X':'\t')+"] PART TIME ["+(studentData.status=='PT'?'X':'\t')+"]"},'DATE ADMITTED:', {}]
                        ],
                        widths: ['auto', 'auto', '*']
                    },
                    style: 'tableContent'
                },
                {
                    table: {
                        body: courseTableBody,
                        widths: ['10%', '50%', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    },
                    // widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto", "auto"],
                },
                {
                    table: {
                        body: [
                            [{
                                text: 'Check the box if you would like to pursue any of the following Certificates:',
                                style: 'tableHeader',
                                colSpan: 2,
                                alignment: 'left'
                            }, {},],
                        ],
                        widths: ["*", "auto"]
                    },
                    style: 'tableContent'
                },
                {
                    table: {
                        body: [
                            [{
                                text: '[\t]',
                                alignment: 'center'
                            }, {text: 'Certificate in Leadership in Health Informatics'}],
                            [{text: "[\t]", alignment: 'center'}, {text: "Certificate in Revenue Cycle Management"}],
                            [{
                                text: "[\t]",
                                alignment: 'center'
                            }, {text: "Certificate in Health Information Cybersecurity"}],
                            [{text: "[\t]", alignment: 'center'}, {text: "Certificate in Health Data Analytics"}],
                        ],
                        widths: ["auto", "*"]
                    },
                    style: 'tableContent'
                },
                {
                    table: {
                        body: [
                            [{text: 'STUDENT SIGNATURE', colSpan: 2, rowSpan: 3}, {},{text: 'DATE', colSpan: 2, rowSpan: 3}, {}, {text: 'QPA', colSpan: 2}, {}, {text: 'TOTAL CREDITS', colSpan: 2}, {}],
                            [{}, {}, {}, {}, {text: 'ADVISOR SIGNATURE', rowSpan: 2, colSpan: 2}, {}, {text: 'DATE', rowSpan: 2, colSpan: 2}, {}],
                            [{}, {}, {}, {}, {}, {}, {}, {}]
                        ],
                        widths: ['auto', '*', 'auto', '*', 'auto', '*', 'auto', '*', ],
                        heights: [10, 10, 10]
                    },
                    style: 'tableContent'
                },
            ],
            styles: {
                header: {
                    fontSize: 11,
                    bold: true,
                    // margin: [0, 0, 0, 10],
                    "text-align": "center"
                },
                subheader: {
                    fontSize: 11,
                    bold: true,
                    // margin: [0, 10, 0, 5]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 10,
                    color: 'black',
                    fillColor: '#C0C0C0',
                    alignment: 'center'
                },
                tableContent: {
                    fontSize: 8,
                    color: 'black'
                }
            },
            defaultStyle: {
                // alignment: 'justify'
            }
    
        }
        pdfMake.createPdf(dd).open();
    }
    


    return (
        <Button onClick={() => HandlePDF(pos, track)}
                color='primary'
                style={{color: "#FFF"}}
                disabled={disabled || !pos || !track || !info}>
            Create PDF
        </Button>
    )
}


function getTotalCredit(courseList) {
    let total = 0;
    courseList.slice(1).forEach(course => {
        total += parseInt(course[5].text) 
    })
    return total;
}