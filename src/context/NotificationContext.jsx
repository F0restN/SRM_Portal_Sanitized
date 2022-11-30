/* eslint-disable no-shadow */
import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = React.createContext();
const initNotification = {
  id: uuidv4(),
  status: false,
  severity: 'success',
  mssg: 'Default Notification',
};

function NotificationContextProvider(props) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SEND_NOTIFICATION':
        return action.payload;
      case 'RESET_NOTIFICATION':
        return initNotification;
      default:
        return state;
    }
  }, initNotification);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationContextProvider };
