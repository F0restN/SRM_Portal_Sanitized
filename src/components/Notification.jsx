/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import { Stack, Button, Snackbar, Alert, useStepContext } from '@mui/material';
import { NotificationContext } from '../context/NotificationContext';

export default function Notification() {
  const { state, dispatch } = useContext(NotificationContext);
  const [open, setOpen] = useState(state.status);

  useEffect(() => {
    setOpen(state.status);
  }, [state.status]);

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    dispatch({ type: 'RESET_NOTIFICATION' });
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        pt: '50px',
        pl: '15vw',
      }}
    >
      <Alert
        key={state.id}
        severity={state.severity}
        variant="filled"
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        {state.mssg}
      </Alert>
    </Snackbar>
  );
}
