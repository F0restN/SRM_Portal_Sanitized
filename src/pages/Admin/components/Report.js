import Chart from "react-apexcharts";

import axios from 'axios';
import config from '../../../config.json'
import store from '../../../store/store';
import { useState, useEffect } from 'react';
import NextTermReport from "../../NextTermReport";


export default function Report() {
    const [authenticationStatus, setAuthenticationStatus] = useState(store.getState())
    const [info, setInfo] = useState();
    const [table, setTable] = useState();
    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.get(`${config.portal}/students-courses`, {
                    headers: {
                        'Authorization': `Bearer ${authenticationStatus.jwtToken}`
                    },
            });
            setInfo(response.data); // change this based on the response, you may or may not need to call json() on it    
            } catch (error) {
                console.error(error);
            }
        }
        loadData();
    }, []);
    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.get(`${config.portal}/courses`, {
                    headers: {
                        'Authorization': `Bearer ${authenticationStatus.jwtToken}`
                    },
            });
            setTable(response.data); // change this based on the response, you may or may not need to call json() on it    
            } catch (error) {
                console.error(error);
            }
        }
        loadData();
    }, []);
    if (info == null) {
        return (
            <div>no data</div>
        )
    }
    let courseByStudentByTerm = [];
    let tableMap = {};
    let dayMap = {};
    if (table != null) {
        table.forEach(function(row) {
            tableMap[row.uid] = row.course_name;
            dayMap[row.uid] = row.day
        })    
    }
    if (info != null) {
        info.forEach(function(row) {
            row.courseName = tableMap[row.course_id]
            row.day = dayMap[row.course_id]
        })    
    }
    if (info != null) {
        let coursePerTerm = info.reduce(function (r, a) {
            r[a.year] = r[a.year] || [];
            r[a.year].push(a);
            return r;
        }, Object.create(null));
        for (let coursePerYear in coursePerTerm) {
            coursePerTerm[coursePerYear] = coursePerTerm[coursePerYear].reduce(function (r, a) {
                r[a.term] = r[a.term] || [];
                r[a.term].push(a);
                return r;
            }, Object.create(null));
        }
        let coursePerTermJsonArray = [];
        for (var year in coursePerTerm) {
            for (var term in coursePerTerm[year])
            coursePerTermJsonArray.push(coursePerTerm[year][term])
        }
        let groupedPeople = {};
        for (var term in coursePerTermJsonArray) {
            let currTerm = coursePerTermJsonArray[term]
            groupedPeople = groupArrayOfObjects(currTerm,"courseName");
            courseByStudentByTerm.push(groupedPeople)
        }
    }
    let dataSeries = [];
    for (var item in courseByStudentByTerm) {
        for (var course in courseByStudentByTerm[item]) {
            let term = courseByStudentByTerm[item][course][0].term;
            let year = courseByStudentByTerm[item][course][0].year;
            let day = courseByStudentByTerm[item][course][0].day
            let totalTerm = year + term
            for (var detail in courseByStudentByTerm[item][course]) {
                let courseName = courseByStudentByTerm[item][course][detail].courseName;
                if (dataSeries[totalTerm] == null) {
                    dataSeries[totalTerm] = {}
                }
                dataSeries[totalTerm][courseName] = 
                {
                    count: courseByStudentByTerm[item][course].length,
                    day: day
                }
            }
        }
    }
    let termList = Object.keys(dataSeries);
    let barData = {
        series: [{
            name: "Student",
            data: [
            ]
        }],
        options: {
            // grid: { 
            //     show: true,
            //     borderColor: '#FFF', 
            // },
            chart: {
                type: 'bar',
                height: 380
            },
            tooltip: {
                enabled: true,
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    return '<div>' + "Course Day: " +  barData.series[0].data[dataPointIndex].z + '</div>'
                }
            },
            xaxis: {
                type: 'category',
                labels: {
                    // rotate: -45
                },
                group: {
                    style: {
                        fontSize: '10px',
                        fontWeight: 700
                    },
                    groups: [
                    ]
                }
            },
            title: {
                text: 'All Courses Taken by All Students Per Term',
            },
        },
    }
    termList = sort_by_term(termList);
    for (let i = 0; i < termList.length; i++) {
        barData.options.xaxis.group.groups.push({title: termList[i], cols: Object.keys(dataSeries[termList[i]]).length})
        for (let item in dataSeries[termList[i]]) {
            barData.series[0].data.push(
                {x: item.substring(0, 10), y: dataSeries[termList[i]][item].count, z: dataSeries[termList[i]][item].day}
            )
        }
    }
    return (
        <div>
            {/* {courseByStudentByTerm ? 
                <div>
                    <Chart options={barData.options} series={barData.series} type="bar" width={"60%"}/>
                </div> : <div>Loading...</div>
            } */}
            <NextTermReport/>
        </div>
    )
}

function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};

function sort_by_term(termList) {
    let temp = [];
    for (let i = 0; i < termList.length; i++) {
        let num1 = termList[i].substring(0, 4)
        let semes = termList[i].substring(4, termList[i].length);
        let num2 = 0;
        if (semes == "Summer") {
            num2 = 1;
        } else if (semes == "Fall") {
            num2 = 2;
        }
        temp.push(parseInt(num1 + num2))
    }
    temp.sort();
    let result = [];
    for (let i = 0; i < temp.length; i++) {
        let year = parseInt(temp[i] / 10);
        let semester = temp[i] % 10;
        let semesterLiteral = ""
        if (semester == 0) {
            semesterLiteral = "Spring"
        } else if (semester == 1) {
            semesterLiteral = "Summer"
        } else if (semester == 2) {
            semesterLiteral = "Fall"
        }
        result.push(year + semesterLiteral)
    }
    return result;
}