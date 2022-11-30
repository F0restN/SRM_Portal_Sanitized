import Chart from "react-apexcharts";

// export default function Report() {
//     let treemapData = {
//         series: [
//             {
//                 data: [
//                     {
//                         x: 'IS 2020',
//                         y: 218
//                     },
//                     {
//                         x: 'IS 2160',
//                         y: 190
//                     },
//                     {
//                         x: 'IS 2710',
//                         y: 155
//                     },
//                     {
//                         x: 'IS 2150',
//                         y: 124
//                     },
//                     {
//                         x: 'IS 2101',
//                         y: 80
//                     },
//                     {
//                         x: 'IS 2691',
//                         y: 40
//                     },
//                     {
//                         x: 'IS 2711',
//                         y: 25
//                     },
//                 ]
//             }
//         ],
//         options: {
//             legend: {
//                 show: false
//             },
//             chart: {
//                 height: 350,
//                 type: 'treemap'
//             },
//             title: {
//                 text: ['Most commonly taken courses', 'for general track students', 'in 2021']
//             }
//         }
//     }
//
//     let scatterData = {
//         series: [{
//             data:
//                 [
//                     {
//                         x: 1,
//                         y: 1
//                     },
//                     {
//                         x: 2,
//                         y: 5
//                     },
//                     {
//                         x: 9,
//                         y: 1.3
//                     },
//                     {
//                         x: 9.5,
//                         y: 8
//                     },
//                     {
//                         x: 2.4,
//                         y: 2.8
//                     },
//                     {
//                         x: 5,
//                         y: 6
//                     },
//                     {
//                         x: 7,
//                         y: 8
//                     },
//                     {
//                         x: 6,
//                         y: 9
//                     },
//                     {
//                         x: 4,
//                         y: 9
//                     },
//                     {
//                         x: 3,
//                         y: 3
//                     },
//                 ]
//         },
//         ],
//         options: {
//             chart: {
//                 height: 350,
//                 type: 'scatter',
//                 zoom: {
//                     type: 'xy'
//                 }
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             grid: {
//                 xaxis: {
//                     lines: {
//                         show: true
//                     }
//                 },
//                 yaxis: {
//                     lines: {
//                         show: true
//                     }
//                 },
//             },
//             xaxis: {
//                 type: 'numeric',
//                 title: {
//                     text: "Usefulness"
//                 }
//             },
//             yaxis: {
//                 max: 10,
//                 min: 0,
//                 title: {
//                     text: "Difficulty"
//                 }
//             },
//             title: {
//                 text: ['Usefulness V.S. Difficulty of a course', 'evaluated from previous student questionnaire']
//             }
//         }
//     }
//
//     let lineData = {
//         series: [{
//             name: "GPA",
//             data: [3.6, 3.7, 3.9, 3.5, 3.7]
//         }],
//         options: {
//             chart: {
//                 height: 350,
//                 type: 'line',
//                 zoom: {
//                     enabled: false
//                 }
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             stroke: {
//                 curve: 'straight'
//             },
//             title: {
//                 text: 'Student GPA by Semester',
//                 align: 'left'
//             },
//             grid: {
//                 row: {
//                     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//                     opacity: 0.5
//                 },
//             },
//             xaxis: {
//                 categories: ['2021 Fall', '2022 Spring', '2022 Summer', '2022 Fall', '2023 Spring'],
//             }
//         },
//     }
//     let bubbleData = {
//         series: [{
//             // x hours/week
//             // y gpa
//             // z people
//             data: [
//                 [10, 3.1, 10],
//                 [11, 3.2, 20],
//                 [12, 3.3, 15],
//                 [13, 3.4, 17],
//                 [14, 3.5, 19],
//                 [15, 3.6, 30],
//                 [16, 3.7, 18],
//                 [19, 3.8, 13],
//                 [26, 3.9, 9],
//                 [29, 4, 11],
//             ]
//         }],
//         options: {
//             chart: {
//                 height: 350,
//                 type: 'bubble',
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             fill: {
//                 opacity: 0.8
//             },
//             title: {
//                 text: ['Historic view of GPA vs. Hour/Week', 'collected from previous students']
//             },
//             xaxis: {
//                 tickAmount: 12,
//                 type: 'category',
//             },
//             yaxis: {
//                 opposite: true,
//                 min: 2,
//                 max: 4
//             }
//         },
//     }
//     return (
//         <div>
//             <div>
//                 <Chart options={treemapData.options} series={treemapData.series} type="treemap" width="600px" />
//                 <Chart options={scatterData.options} series={scatterData.series} type="scatter" width="600px"/>
//             </div>
//             <div>
//
//                 <Chart options={lineData.options} series={lineData.series} type="line"  width="600px"/>
//                 <Chart options={bubbleData.options} series={bubbleData.series} type="bubble" width="600px"/>
//     </div>
//         </div>
//     )
// }