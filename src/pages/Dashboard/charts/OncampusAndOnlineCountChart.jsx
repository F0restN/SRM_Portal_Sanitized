/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import {
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { CONFIG } from '../../../ENV';
import store from '../../../store/store';
import MainCard from '../../../components/MainCard';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 420,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '60%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['MON', 'TUE', 'WED', 'THR', 'FRI'],
  },
  yaxis: {
    // decimalsInFloat: 0,
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
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: true,
    theme: 'light',
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
      colors: 'grey.500',
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2,
    },
    // itemMargin: {
    //     horizontal: 15,
    //     vertical: 50
    // }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

// ==============================|| SALES COLUMN CHART ||============================== //

function OncampusAndOnlineCountChart({ appearedSemester }) {
  // Material UI Theme relative
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;
  // Component relative
  const [authenticationStatus, setAuthenticationStatus] = useState(
    store.getState()
  );
  // const [graphTerm, setGraphTerm] = useState(appearedSemester[0].value);
  const [graphTerm, setGraphTerm] = useState('2022 Fall');
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(columnChartOptions);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(async () => {
    const selectedSemesterArr = graphTerm.split(' ');
    const oncampusAndOnlineCountData = await axios.post(
      `${CONFIG.PORTAL}/courses/getOnlineOnCmpStat`,
      {
        year: Number(selectedSemesterArr[0]),
        term: selectedSemesterArr[1],
        _limit: -1,
      },
      {
        headers: {
          Authorization: `Bearer ${authenticationStatus.jwtToken}`,
        },
      }
    );
    console.log(oncampusAndOnlineCountData);

    const onlineFormatDate = [];
    const oncampusFormatDate = [];
    for (const item of oncampusAndOnlineCountData.data.stat) {
      onlineFormatDate.push(item.online);
      oncampusFormatDate.push(item.oncmp);
    }
    setSeries([
      {
        name: 'ONLINE',
        data: onlineFormatDate,
      },
      {
        name: 'ONCAMPUS',
        data: oncampusFormatDate,
      },
    ]);
    setIsRendered(true);
  }, [graphTerm]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary],
          },
        },
      },
      yaxis: {
        labels: {
          formatter(val) {
            return val.toFixed(0);
          },
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: 'light',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500',
        },
      },
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Online / Oncampus Count</Typography>
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
      {isRendered ? (
        <MainCard sx={{ mt: 1 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <ReactApexChart
              options={columnChartOptions}
              series={series}
              type="bar"
              height="422"
            />
          </Box>
        </MainCard>
      ) : (
        <p />
      )}
    </Grid>
  );
}

export default OncampusAndOnlineCountChart;
