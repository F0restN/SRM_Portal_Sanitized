import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  Box,
  Grid,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
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
  let onlineNub = 20;
  let oncmpNub = 20;

  useEffect(async () => {
    const genderStat = await axios.post(
      `${CONFIG.PORTAL}/students/getTypeStat`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authenticationStatus.jwtToken}`,
        },
      }
    );
    setSeries(genderStat.data.data);
    onlineNub = series[genderStat.data.label.indexOf('ONCMP')];
    setOptions((prevState) => ({
      ...prevState,
      labels: genderStat.data.label,
    }));
  }, []);

  return (
    <Grid item xs={12} md={4} lg={4}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Student Type Pie Chart</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
          <ListItemButton divider>
            <ListItemText primary="Total Online Student" />
            <Typography variant="h5">
              {series[options.labels.indexOf('ONLINE')]}
            </Typography>
          </ListItemButton>
          <ListItemButton divider>
            <ListItemText primary="Total On-campus Student" />
            <Typography variant="h5">
              {series[options.labels.indexOf('ONCMP')]}
            </Typography>
          </ListItemButton>
        </List>
        <Box sx={{ p: 3 }}>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height="365"
          />
        </Box>
      </MainCard>
    </Grid>
  );
}

export default GenderChart;
