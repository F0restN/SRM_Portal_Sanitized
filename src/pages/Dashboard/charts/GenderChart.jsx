import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';

import MainCard from '../../../components/MainCard';
import store from '../../../store/store';
import { CONFIG } from '../../../ENV';

// chart options
const barChartOptions = {
  chart: {
    // height: 365,
    // width: 380,
    type: 'donut',
  },
  labels: [],
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: true,
        },
      },
    },
  ],
  legend: {
    inverseOrder: true,
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: 15,
    offsetY: 10,
    // show: false,
  },
};

const initData = [54, 56];

// ==============================|| MONTHLY BAR CHART ||============================== //
function GenderChart() {
  const [authenticationStatus] = useState(store.getState());
  const [options, setOptions] = useState(barChartOptions);
  const [series, setSeries] = useState(initData);
  const [totalNumber, setTotalNumber] = useState(100);

  useEffect(async () => {
    const genderStat = await axios.post(
      `${CONFIG.PORTAL}/students/getGenderStat`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authenticationStatus.jwtToken}`,
        },
      }
    );
    setSeries(genderStat.data.data);
    setOptions((prevState) => ({
      ...prevState,
      labels: genderStat.data.label,
    }));
    setTotalNumber(() => {
      let total = 0;
      genderStat.data.data.forEach((value) => {
        total += value;
      });
      return total;
    });
  }, []);

  return (
    <Grid item xs={12} md={4} lg={4}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Gender</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Box sx={{ p: 3, pb: 1 }}>
          <Stack spacing={2}>
            <Typography variant="h5" color="textSecondary">
              Total Student Number
            </Typography>
            <Typography variant="h2">{totalNumber}</Typography>
          </Stack>
        </Box>
        <Box sx={{ p: 1, pb: 5 }} id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height="351"
          />
        </Box>
      </MainCard>
    </Grid>
  );
}

export default GenderChart;
