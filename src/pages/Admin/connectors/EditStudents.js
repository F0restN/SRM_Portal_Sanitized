import React from 'react'
import axios from 'axios';
import config from '../../../config.json';

export default  async function  EditStudents(Pbody,targetId) {
    await axios.put(`${config.portal}/students/${targetId}`, Pbody,{
        headers: {
          Authorization:
            `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
        },
      });

}