import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
// import StudentTable from './StudentTable';
import StudentTable from './StudentTable';
import MainCard from '../../components/MainCard';

export default function Faculty() {
  return (
    <Grid container sx={{ pt: 0 }} rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Student List</Typography>
      </Grid>
      <Grid item xs={12}>
        <StudentTable />
        {/* <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 1 }}>
          </Box>
        </MainCard> */}
      </Grid>
    </Grid>
  );
}
