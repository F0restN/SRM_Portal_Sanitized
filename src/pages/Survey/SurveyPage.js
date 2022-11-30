import { useEffect, useState } from "react";

import axios from "axios";
import config from './../../config.json'
import SurveyItem from "./SurveyItem";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function SurveyPage() {
    const history = useHistory()

    const[surveyList, setSurveyList] = useState([]);
    async function getSurveyList() {
        const { data } = await axios.get(`${config.portal}/surveys?_sort=id`, {
            method: "GET",
            headers: {
                Authorization:
                    `Bearer ${JSON.parse(sessionStorage.getItem("authenticationStatus")).jwtToken}`,
            },
        })
        setSurveyList(data)
    }

    useEffect(() => {
        getSurveyList()
    }, [])

    if (surveyList.length === 0) {
        return <div>No Data</div>
    } else {
        return (
            <div>
                <ul style={{"listStyle": "none"}}>
                    {Object.keys(surveyList).map(key => {
                        return (<li key={key} style={{'padding': '10px'}}>
                            <SurveyItem surveyJSON = {surveyList[key].surveyJSON} name={surveyList[key].name}/>
                        </li>)
                    })}
                    <li style={{'padding': '10px'}}><Button onClick={() => {history.push('/addNewSurvey')}}>Add New Survey</Button></li>
                </ul>
            </div>
        );    
    }
}