import React from 'react';
import axios from 'axios';
import config from '../../../config.json';

export default async function AddStudents(Pbody) {
  return axios.post(`${config.portal}/students`, Pbody, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem('authenticationStatus')).jwtToken
      }`,
    },
  });
}
