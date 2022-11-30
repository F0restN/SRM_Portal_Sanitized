import React from 'react'
import axios from 'axios';
import config from '../../../config.json';

export default  async function  UploadAdDoc(Pbody,targetId) {
    const formData = new FormData()
    formData.append('files', Pbody)
    
    await axios.post(`${config.portal}/upload`, formData, {
        headers: {
          Authorization:
            `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
        },
      }).then((response)=>{
        
        const imageId = response.data[0].id
       
        axios.put(`${config.portal}/Students/${targetId}`,{admission_package:imageId},{
          headers: {
            Authorization:
              `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
          },
        })


      });

}
