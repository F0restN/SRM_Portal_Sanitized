## Request / Response body

### Student object
```json
{
    "peoplesoft_id": 4499961,
    "studentInfo": {
        "id": 4,
        "name": "Alice",
        "peoplesoft_id": "4499961",
        "email": "alice@pitt.edu",
        "bio_description": null,
        "advisor": "Kimberly A. Peterson",
        "process": null,
        "status": "FT",
        "advisingTracking": null,
        "planOfStudy": null,
        "capstoneAndInternship": null,
        "graduation": null,
        "network": null,
        "note": null,
        "enroll_date": null,
        "track": "Data Science",
        "start_term": "Summer",
        "expected_grad_term": null,
        "plan_available": false,
        "actual_grad_term": null,
        "start_year": 2020,
        "expected_grad_year": null,
        "actual_grad_year": null,
        "created_at": "2022-06-13T20:03:10.076Z",
        "updated_at": "2022-06-13T20:07:10.212Z",
        "program_start_date": null,
        "fulltime": null,
        "type": "ONCMP",
        "attachment": [],
        "admission_document": [],
        "grade": null,
        "program": {
            "id": 2,
            "name": "Data Science",
            "duration": 4,
            "type": "Graduate",
            "published_at": "2022-04-14T15:24:52.474Z",
            "created_at": "2022-04-14T15:24:46.636Z",
            "updated_at": "2022-06-30T17:50:22.056Z"
        }
    },
    "course": []
}

```

### Courses / State / index
Initial data that we fetch from database is an array contains a lot of objects 
like below 

```json
{
    "id": 23,
    "uid": "221002",
    "course_id": "2210",
    "time": "19:00:00",
    "day": "TUE",
    "instructor": null,
    "tas": null,
    "type": "HI",
    "pre_req": null,
    "credit": 3,
    "term": "Summer",
    "created_at": "2022-06-01T18:25:16.308Z",
    "updated_at": "2022-06-01T18:31:41.583Z",
    "course_name": "Health Information and the Health Care System",
    "prefix": "HI",
    "year": null,
    "start_year": 2020,
    "end_year": 2026
}
```
Then we format course data, that retrieve from database and stored in object `courses`
according to its courseId which indicate which course is this. 
```javascript
{
    courseId: course[0].course_id,
    courseUid: course[0].uid,
    courseTitle: course[0].course_name,
    courseDay: "",
    courseTime: "",
    courseTerm: "",
    courseAvailTerm: availTerm,
    courseYear: "",
    courseAvailYear: availYear,
    courseData: courseData
}
```
Data example
```json
{
   "courseId":"2020",
   "courseUid":"202003",
   "courseTitle":"Practical Statistics and Programming using Python and R",
   "courseDay":"",
   "courseTime":"",
   "courseTerm":"",
   "courseAvailTerm":[
      "Fall",
      "Summer"
   ],
   "courseYear":"",
   "courseAvailYear":[],
   "courseData":[
      {
         "id":38,
         "uid":"202003",
         "course_id":"2020",
         "time":"19:00:00",
         "day":"THR",
         "instructor":null,
         "tas":null,
         "type":"HI",
         "pre_req":null,
         "credit":3,
         "term":"Fall",
         "created_at":"2022-06-01T21:08:24.243Z",
         "updated_at":"2022-06-01T21:08:24.249Z",
         "course_name":"Practical Statistics and Programming using Python and R",
         "prefix":"HI",
         "year":null,
         "start_year":2020,
         "end_year":2026
      },
      {
         "id":28,
         "uid":"202001",
         "course_id":"2020",
         "time":"19:00:00",
         "day":"MON",
         "instructor":null,
         "tas":null,
         "type":"HI",
         "pre_req":null,
         "credit":3,
         "term":"Summer",
         "created_at":"2022-06-01T18:38:25.713Z",
         "updated_at":"2022-06-01T18:38:25.718Z",
         "course_name":"Practical Statistics and Programming using Python and R",
         "prefix":"HI",
         "year":null,
         "start_year":2020,
         "end_year":2026
      }
   ]
}
```

### currentSelection / State / index
Retrieve from database at index.js at first which is a array contains a lot of objects
like this
```json
{
    "courseTitle": "Practical Statistics and Programming using Python and R",
    "courseId": "2020",
    "courseUid": "202001",
    "courseDay": "MON",
    "courseTime": "19:00:00",
    "courseTerm": "Summer",
    "courseYear": 2020,
    "transactionId": 3
}
```

### CourseRow / file

Data structure in CourseRow.js. We add one more attribute: transactionId at here, 
to indicate which transaction this object belongs to

Notes: `term` and `year` are states over here, to let user select term and year, then
find correspondent `courseUid`, `courseDay` and `courseTime`
```javascript
{
  courseTitle: course.courseTitle,
  courseId: course.courseId,
  courseUid: result.uid,
  courseDay: result.day,
  courseTime: result.time,
  courseTerm: term,
  courseYear: year,
  transactionId: transactionId
}
```

## Tech Tips
### Auto-populate fill in CourseRow dropdowns

You may found these code looks weired under CourseRow.js

```javascript
    const [day, setDay] = useState(course.courseDay)
    const [time, setTime] = useState(course.courseTime)
    const [term, setTerm] = useState(course.courseTerm)
    const [year, setYear] = useState(course.courseYear)    

    // Update state
    useEffect(() => {
        if (course.courseDay !== ""){
            setDay(course.courseDay)
        }
        if (course.courseTime !== ""){
            setTime(course.courseTime)
        }
        if (course.courseTerm !== ""){
            setTerm(course.courseTerm)
        }
        if (course.courseYear !== ""){
            setYear(course.courseYear)
        }
    })
```
Why we have to set up states as a value when this value is assigned to initialState of state?
That's because hook `useState` comes from `useReducer` which means the initialState is
actually lazy init which represent that this assignment only happened at the first time when
system render this object. And it will not be assigned after that. Hence, when we run auto-populate
function, since we already have the page which means CourseRow objects have been rendered. 

```javascript
    const autoPopulate = async () => {
        let {data} = await axios.post(`${CONFIG.PORTAL}/templates/getTemplateByStudent`, {
            startYear: student.studentInfo.start_year,
            startTerm: student.studentInfo.start_term,
            status: studentStatus,
            program: studentProgram
        }, {
            headers: {
                'Authorization': `Bearer ${authenticationStatus.jwtToken}`
            }
        });

        if (data !== null && data.length !== 0) {
            data = data.map((item)=>{
                return({
                    ...item,
                    transactionId: transactionId
                })
            })
            setCurrentSelection(data)
        }
        onHide()
    }
```

Therefore, when we `setCurrentSelection` by click button, new value will be transmitted to `CourseRow` object to replace the empty, assignment will not happened as we expected (because of lazy initialization) So we have to like manually assign them to achieve our goal.
