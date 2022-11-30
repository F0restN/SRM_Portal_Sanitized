import React from 'react'
import axios from 'axios';
import config from '../../../config.json';

export default  async function  ReadFromStudents() {
    const {data} = await axios.get(`${config.portal}/Students`, {
        headers: {
          Authorization:
            `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
        },
      });

      
     
    return {data}
  
}
