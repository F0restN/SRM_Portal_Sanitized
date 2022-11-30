import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
// material-ui
import { Box, Grid, MenuItem, Typography, TextField } from '@mui/material';
import MainCard from '../../../components/MainCard';
// third-party
import store from '../../../store/store';
import { CONFIG } from '../../../ENV';

// ==============================|| INCOME AREA CHART ||============================== //

function CourseEnrollmentCountChart({ appearedSemester }) {
  const [graphTerm, setGraphTerm] = useState(appearedSemester[0].value);
  const [authenticationStatus, setAuthenticationStatus] = useState(
    store.getState()
  );
  const [info, setInfo] = useState();
  const [rendered, setRendered] = useState(false);
  const [table, setTable] = useState();

  useEffect(() => {
    if (graphTerm === undefined) {
      setGraphTerm('2022 Fall');
    }
    let ignore = false;
    const reqInfo = async () => {
      const response = await axios.get(
        `${CONFIG.PORTAL}/students-courses?_limit=-1&term=${
          graphTerm.split(' ')[1]
        }&year=${graphTerm.split(' ')[0]}`,
        {
          headers: {
            Authorization: `Bearer ${authenticationStatus.jwtToken}`,
          },
        }
      );
      if (!ignore) {
        setInfo(response.data);
      }
    };
    const reqTable = async () => {
      try {
        const response = await axios.get(`${CONFIG.PORTAL}/courses?_limit=-1`, {
          headers: {
            Authorization: `Bearer ${authenticationStatus.jwtToken}`,
          },
        });
        setTable(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    async function handleUpdate() {
      await Promise.allSettled([reqInfo(), reqTable(), setRendered(true)]);
    }
    handleUpdate();
    return () => {
      ignore = true;
    };
  }, [graphTerm]);

  let enrollStat = {};
  const onlineOnCmpStat = [];
  const barData = {
    series: [
      {
        name: 'Student',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      tooltip: {
        enabled: true,
        // custom({ series, seriesIndex, dataPointIndex, w }) {
        //   const data =
        //     w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        //   return `<div>` + `Course Day: ${data.day}</div>`;
        // },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 6,
        },
      },
      yaxis: {
        labels: {
          formatter(val) {
            if (Number.isNaN(val) || Math.floor(val) !== val) {
              return val;
            }
            try {
              return val.toFixed(0);
            } catch (e) {
              return val;
            }
          },
        },
      },
      xaxis: {
        type: 'category',
        group: {
          style: {
            fontSize: '10px',
            fontWeight: 700,
          },
          groups: [],
        },
      },
    },
  };

  if (
    rendered &&
    info !== undefined &&
    info.length > 0 &&
    table != undefined &&
    table.length > 0
  ) {
    const map = {};
    table.forEach((entry) => {
      map[entry.uid] = [entry.prefix + entry.course_id, entry.day];
    });
    info.forEach((course) => {
      if (map[course.course_id] !== undefined) {
        course.name = map[course.course_id][0];
        course.day = map[course.course_id][1];
      }
    });
    enrollStat = Object.entries(groupBy(info, 'name'));
    for (let i = 0; i < enrollStat.length; i++) {
      const item = enrollStat[i];
      barData.series[0].data.push({
        x: item[0],
        y: item[1].length,
        day: item[1][0].day,
      });
    }
    table.forEach((entry) => {
      map[entry.uid] = [entry.type];
    });
    info.forEach((course) => {
      course.type = String(map[course.course_id]);
    });
    info.forEach((element) => {
      // debugger
      if (onlineOnCmpStat[element.day] === undefined) {
        onlineOnCmpStat[element.day] = { ONLINE: 0, ONCMP: 0 };
      }
      if (onlineOnCmpStat[element.day][element.type] == null) {
        onlineOnCmpStat[element.day][element.type] = 1;
      } else {
        onlineOnCmpStat[element.day][element.type] += 1;
      }
    });
    const dayList = ['MON', 'TUE', 'WED', 'THR', 'FRI'];
    dayList.forEach((day) => {
      if (onlineOnCmpStat[day] === undefined) {
        onlineOnCmpStat[day] = { ONLINE: 0, ONCMP: 0 };
      }
    });
  }

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Course Enrollment Count</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="standard-select-currency"
            size="small"
            select
            value={graphTerm}
            onChange={(e) => setGraphTerm(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
          >
            {appearedSemester.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          {/*<CourseEnrollmentCountChart slot={slot} />*/}
          <ReactApexChart
            options={barData.options}
            series={barData.series}
            type="bar"
            height={450}
          />
        </Box>
      </MainCard>
    </Grid>
  );
}

const groupBy = function (xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default CourseEnrollmentCountChart;
