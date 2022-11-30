/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Column } from '@ant-design/plots';
import { Grid, Typography, Box } from '@mui/material';
import MainCard from '../../../components/MainCard';

function StudentCountTideSlide({ data }) {
  const config = {
    appendPadding: 20,
    data,
    // isStack: false,
    isGroup: true,
    height: 490,
    autoFit: false,
    smooth: true,
    xField: 'term',
    yField: 'value',
    seriesField: 'type',
    xAxis: {
      range: [0, 1],
    },
    slider: {
      start: 0,
      end: 1,
    },
    legend: {
      offsetX: 30,
      offsetY: -5,
      fontSize: 5,
    },
    tooltip: {
      showTitle: true,
    },
  };

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
            <Column {...config} />
          </div>
        </Box>
      </MainCard>
    </Grid>
  );
}

export default StudentCountTideSlide;
