import { useCallback, useState } from "react"
import { Button, Form, Card } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import NewSurvey from "./NewSurvey";


export default function AddNewSurvey() {
    const [question, setQuestion] = useState([])
    const history = useHistory();
    const addQuestion = () => {
        setQuestion(question.concat(''))
    }

    const removeByIdx = useCallback( async (idx) => {
        let temp = [...question];
        temp.splice(idx, 1);
        setQuestion(temp)
    })

    console.log(question);

    return (
        <ul style={{"listStyle": "none"}}>
            {question.length > 0 ? 
                Object.keys(question).map(key => {
                    return (
                        <Card style={{width: '50em'}}>
                        <li key={key} style={{'padding': '10px', display: 'inline-block'}}>
                            <div style={{'padding': '10px'}}>
                                <Button style={{'padding': '10px', float: 'right'}} onClick={() => removeByIdx(key)}>X</Button>
                                <NewSurvey/>
                            </div>
                        </li>
                        </Card>
                    )
                })        
            : <div>Start drafting a new survey by adding the first question.</div>}
            <li style={{'padding': '10px', display: 'inline-block'}}>
                <Button onClick={addQuestion}>
                    Add New Question
                </Button>
            </li>
            <li style={{'padding': '10px', display: 'inline-block'}}>
                <Button disabled={question.length == 0} onClick={() => history.push('survey')}>
                    Save
                </Button>
            </li>
        </ul>
    )
}