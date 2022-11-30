import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import MainCard from '../components/MainCard';
import store from '../../../store/store';
import { CONFIG } from '../../../ENV';

const barChartOptions = {
  appendPadding: 20,
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: [],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
  },
  tooltip: {},
};

const initData = [];

function StartAndGradTermChart() {
  const [authenticationStatus] = useState(store.getState());
  const [options, setOptions] = useState(barChartOptions);
  const [series, setSeries] = useState(initData);

  useEffect(async () => {
    const startAndGradStat = await axios.post(
      `${CONFIG.PORTAL}/students/getStartTermAndGraduateTermStat`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authenticationStatus.jwtToken}`,
        },
      }
    );
    setSeries(startAndGradStat.data.data);
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: startAndGradStat.data.label,
      },
    }));
  }, []);

  return (
    <Grid item xs={12} md={8} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Student Count Tide</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Box sx={{ pl: 1, pr: 1, pt: 2 }}>
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height="478"
              width="100%"
            />
          </div>
        </Box>
      </MainCard>
    </Grid>
  );
}

export default StartAndGradTermChart;
