import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

import MainCard from '../../../components/MainCard';
import store from '../../../store/store';
import { CONFIG } from '../../../ENV';

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 450,
  },
  colors: ['#00e396'],
  plotOptions: {
    bar: {
      barHeight: '60%',
      borderRadius: 4,
      horizontal: true,
    },
  },
  tooltip: {
    enabled: true,
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: [
      'Andi Saptono',
      'Leming Zhou',
      'Patricia Anania-Firouzan',
      'Dilhari DeAlmeida',
    ],
  },
};

const initData = [
  {
    data: [10, 20, 30, 40],
  },
];

function AdvisorChart() {
  const [authenticationStatus, setAuthenticationStatus] = useState(
    store.getState()
  );
  const [options, setOptions] = useState(barChartOptions);
  const [series, setSeries] = useState(initData);

  useEffect(async () => {
    const advisorStat = await axios.post(
      `${CONFIG.PORTAL}/students/getAdvisorStat`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authenticationStatus.jwtToken}`,
        },
      }
    );

    setSeries([
      {
        data: advisorStat.data.data,
      },
    ]);

    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: advisorStat.data.advisor_name,
      },
    }));
  }, []);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Advisor</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Box sx={{ p: 1, pr: 1 }}>
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height="450"
              width="100%"
            />
          </div>
        </Box>
      </MainCard>
    </Grid>
  );
}

export default AdvisorChart;
