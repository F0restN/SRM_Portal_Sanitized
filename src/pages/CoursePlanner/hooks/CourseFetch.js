import React, {useEffect, useState} from 'react';
import axios from "axios";
import _, {isNull} from 'underscore';
import {CONFIG} from "../../../ENV";

async function CourseFetch(query, config){
    let data
    let error = false
    let loading

    try {
        let response = await axios.post(`${CONFIG.PORTAL}/courses/getCoursesForStudent`, query, config);
        let groupByCoursesArr = _.groupBy(response.data, (course) => {
            return course.course_id
        })
        let formattedCoursesArr = []
        for (let coursesKey in groupByCoursesArr) {
            let course = groupByCoursesArr[coursesKey]
            let availTerm = []
            let availYear = []
            let courseData = []
            let courseOptions = {
                Spring:[],
                Summer:[],
                Fall:[]
            }
            for (let courseObj of course) {
                courseData.push(courseObj)
                if (!_.contains(availTerm, courseObj.term) && !isNull(courseObj.term)) {
                    availTerm.push(courseObj.term)
                }
                if (!_.contains(availYear, courseObj.year) && !isNull(courseObj.year)) {
                    availYear.push(courseObj.year)
                }
                let optionObj = [courseObj.day, courseObj.time]
                if(!_.contains(optionObj, courseOptions) && !isNull(optionObj)){
                    courseOptions[courseObj.term].push(optionObj)
                }
            }
            formattedCoursesArr.push(
                {
                    courseId: course[0].course_id,
                    courseUid: course[0].uid,
                    courseTitle: course[0].course_name,
                    courseDay: "",
                    courseTime: "",
                    courseTerm: "",
                    courseYear: "",
                    courseMark: {
                        conflict: false
                    },
                    courseAvailTerm: availTerm,
                    courseAvailYear: availYear,
                    courseOptions: courseOptions,
                    courseData: courseData
                }
            )
        }
        data = formattedCoursesArr
        loading = false
    } catch (e) {
        error = e
        loading = false
    }

    return [loading, error, data]
}

export default CourseFetch;