// eslint-disable-next-line import/extensions
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Button, LinearProgress } from '@mui/material';

// project import
import { Spinner } from 'reactstrap';
import { FETCH } from '../../ENV';
import CourseEnrollmentCountChart from './charts/CourseEnrollmentCountChart';
import GenderChart from './charts/GenderChart';
import TypeChart from './charts/TypeChart';
import OncampusAndOnlineCountChart from './charts/OncampusAndOnlineCountChart';
import store from '../../store/store';
import AdvisorChart from './charts/AdvisorChart';
// import StartAndGradTermChart from './charts/StartAndGradChart';
import StudentCountTideSlide from './charts/StudentCountTideSlide';
import StartCountColumn from './charts/StartCountColumn';
import GradCountColumn from './charts/GradCountColumn';
import sortByTerm from '../../utils/sortByTerm';
import MainCard from '../../components/MainCard';
import StudentTable from './charts/StudentTable';
import CourseEnrollCountChart from './charts/CourseEnrollCountChart';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

function DashboardDefault() {
  const authenticationStatus = store.getState();
  const advisorName = sessionStorage.getItem('currentUserName');
  const role = authenticationStatus.authenticationRole;

  const [studentList, setStudentList] = useState([]);
  const [appearedSemester, setAppearedSemester] = useState([]);
  const [studentCountData, setStudentCountData] = useState([]);
  const [courseEnrollData, setCourseEnrollData] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  // const [studentList, setStudentList] = useState([]);
  const queryHeader = {
    headers: {
      Authorization: `Bearer ${authenticationStatus.jwtToken}`,
    },
  };

  useEffect(async () => {
    await axios
      .post(`${FETCH.PORT.SC}/getAppearedSemester`, {}, queryHeader)
      .then((res) => setAppearedSemester(res.data));

    await axios
      .post(`${FETCH.PORT.S}/getStudentCountTide`, {}, queryHeader)
      .then((res) => setStudentCountData(res.data));

    await axios
      .post(
        `${FETCH.PORT.S}/getAdviseeByAdvisor`,
        { role, advisorName },
        queryHeader
      )
      .then((response) => setStudentList(response.data));

    await axios
      .post(`${FETCH.PORT.SC}/getCourseEnrollStat`, {}, queryHeader)
      .then((response) => setCourseEnrollData(response.data));

    await setIsRendered(true);
  }, []);

  return (
    <div>
      {isRendered ? (
        <Grid container sx={{ pt: 0 }} rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
          {/* row 1 */}
          <StudentCountTideSlide data={studentCountData} />
          {/* <StartAndGradTermChart /> */}
          <TypeChart />

          {/* row 2 */}
          <StartCountColumn data={studentCountData} />
          <GradCountColumn data={studentCountData} />
          <GenderChart />

          {/* row 3 */}
          <AdvisorChart />
          <OncampusAndOnlineCountChart appearedSemester={appearedSemester} />

          {/* row 4 */}
          <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Student Table</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <StudentTable studentList={studentList} />
            </MainCard>
          </Grid>
          {/* row5 */}
          {/* <CourseEnrollmentCountChart appearedSemester={appearedSemester} /> */}

          <CourseEnrollCountChart
            data={courseEnrollData}
            appearedSemester={appearedSemester}
          />
        </Grid>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
}

export default DashboardDefault;
