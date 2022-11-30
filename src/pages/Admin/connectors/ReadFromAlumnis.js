import React from 'react'
import axios from 'axios';
import config from '../../../config.json';

export default  async function  ReadFromAlumnis() {
    const {data} = await axios.get(`${config.portal}/alumni`, {
        headers: {
          Authorization:
            `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
        },
      });

      
     
    return {data}
  
}