import React from 'react'
import axios from 'axios';
import config from '../../../config.json';

export default  async function  AddAlumnis(Pbody) {
    await axios.post(`${config.portal}/alumni`, Pbody,{
        headers: {
          Authorization:
            `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
        },
      });

}