import axios from "axios";
import config from '../../config.json'
import { useEffect, useState,  } from "react";
import { Table, Button} from 'reactstrap'

export default function CourseEditor() {
    const [info, setInfo] = useState();
    useEffect( () =>  { async function ReadFromAdvisors(){
        const {data} = await axios.get(`${config.portal}/courses`, {
            headers: {
              Authorization:
                `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
            },
          });

        setInfo(data)}
        ReadFromAdvisors()} ,[])
    return (
        <div>
            {info != null ? <div><CourseTable data = {info}/></div> : <div>Loading...</div>}
            <Button color="primary" onClick={() => {alert("saved!")}}>Save</Button>
        </div>
    )
}

function CourseTable(props) {
    console.log(props);
    return (
        <Table>
            <thead>
                <tr>
                    <td>Course ID</td>
                    <td>Credit</td>
                    <td>Time</td>
                    <td>Day</td>
                    <td>Course ID</td>
                    <td>Term</td>
                    <td>Prerequisites</td>
                </tr>
            </thead>
            <tbody>
                {props.data.slice(0, 10).map((data, index) => (
                    <tr key={data.uid}>
                        <td>{data.uid}</td>
                        <td>{data.credit}</td>
                        <td>{data.time}</td>
                        <td>{data.day}</td>
                        <td>{data.course_id}</td>
                        <td>{data.term}</td>
                        <td>{data.pre_req}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}