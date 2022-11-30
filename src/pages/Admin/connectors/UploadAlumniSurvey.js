import React from 'react'
import axios from 'axios';
import config from '../../../config.json';

export default async function  UploadAlumniSurvey(Pbody) {
    await axios.post(`${config.portal}/course-registrations`, Pbody,{
        headers: {
          Authorization:
            `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
        },
      });

}