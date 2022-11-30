import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotificationContext } from '../context/NotificationContext';

function sendNotification(level, message) {
  const { state, dispatch } = useContext(NotificationContext);

  dispatch({
    type: 'SEND_NOTIFICATION',
    payload: {
      id: uuidv4(),
      status: true,
      severity: level,
      mssg: message,
    },
  });
}

export default sendNotification;
