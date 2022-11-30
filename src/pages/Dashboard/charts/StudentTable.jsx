import React, { useState } from 'react';
// material-ui
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Theme from '../../../themes/theme';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
    width: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'track',
    headerName: 'Track',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  // {
  //   field: 'start_year',
  //   headerName: 'Start Year',
  //   type: 'number',
  //   width: 150,
  //   headerAlign: 'center',
  //   align: 'center',
  // },
  {
    field: 'concatStartTerm',
    headerName: 'Start Term',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  // {
  //   field: 'expected_grad_year',
  //   headerName: 'Grad Year',
  //   type: 'number',
  //   width: 150,
  //   headerAlign: 'center',
  //   align: 'center',
  // },
  {
    field: 'concatGradTerm',
    headerName: 'Grad Term',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'plan_available',
    headerName: 'POS',
    type: 'boolean',
    width: 80,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'advisor',
    headerName: 'Advisor',
    type: 'string',
    width: 100,
    headerAlign: 'center',
    align: 'center',
  },
];

// ==============================|| STUDENT TABLE - TABLE / RENDER ||============================== //

export default function StudentTable({ studentList }) {
  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        display: 'flex',
        maxWidth: '100%',
        // '& td, & th': { whiteSpace: 'nowrap' },
      }}
    >
      <DataGrid
        autoHeight
        rows={studentList}
        columns={headCells}
        columnBuffer={10}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // showColumnRightBorder
        disableSelectionOnClick
        aria-labelledby="tableTitle"
        initialState={{
          sorting: {
            sortModel: [{ field: 'concatStartTerm', sort: 'asc' }],
          },
        }}
        sx={{
          '.MuiTablePagination-toolbar': {
            // backgroundColor: 'rgba(100,100,100,0.5)',
            // lineHeight: 1,
            p: 0,
            m: 0,
            display: 'flex',
            justifyContent: 'center',
            alignmentContent: 'center',
          },
          '.MuiTablePagination-displayedRows, .MuiTablePagination-input': {
            p: 0,
            m: 0,
            fontSize: '0.875rem',
          },
          '.MuiDataGrid-cell': {
            borderTop: '1px solid #f0f0f0',
          },
          // '& .MuiDataGrid-root:first-child': {
          //   pl: 2,
          // },
          // '& .MuiDataGrid-root:last-child': {
          //   pr: 3,
          // },
        }}
        // experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
