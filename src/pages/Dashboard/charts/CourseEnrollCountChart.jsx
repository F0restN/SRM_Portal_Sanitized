import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Column } from '@ant-design/plots';
// material-ui
import {
  Box,
  Grid,
  MenuItem,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import MainCard from '../../../components/MainCard';

function CourseEnrollCountChart({ data, appearedSemester }) {
  const [graphTerm, setGraphTerm] = useState('2022 Fall');
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let count = 0;
    data[graphTerm].forEach((obj) => {
      count += obj.value;
    });
    setTotalCount(count);
  }, [graphTerm]);

  const config = {
    appendPadding: 20,
    data: data[graphTerm],
    xField: 'type',
    yField: 'value',
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.8,
      },
    },
    meta: {
      type: {
        alias: 'Course ID',
      },
      sales: {
        alias: 'Enroll Count',
      },
    },
    // minColumnWidth: 40,
    maxColumnWidth: 100,
  };
  // return <Column {...config} />;

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
        <Box sx={{ p: 3, pb: 1 }}>
          <Typography variant="h5" color="textSecondary">
            Total Student Number : {totalCount}
          </Typography>
        </Box>
        <Box sx={{ pt: 1, pr: 2 }}>
          {/*<CourseEnrollmentCountChart slot={slot} />*/}
          <Column {...config} />
        </Box>
      </MainCard>
    </Grid>
  );
}

CourseEnrollCountChart.propTypes = {
  appearedSemester: propTypes.array,
  data: propTypes.array,
};

CourseEnrollCountChart.defaultProps = {
  appearedSemester: [{ value: '2022 Fall', label: '2022 Fall' }],
  data: [{ 2020: [{ type: 2100, value: 0 }] }],
};

export default CourseEnrollCountChart;
