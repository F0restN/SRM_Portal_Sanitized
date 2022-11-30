import { Survey } from "survey-react-ui";
import { StylesManager, Model } from "survey-core";
import "survey-core/modern.min.css";
import './survey.css'
import { useHistory } from "react-router-dom";
import { useCallback, useState } from "react"
import { Button, Form } from 'react-bootstrap'

export default function NewSurvey() {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [optionList, setOptionList] = useState([]);

    const removeByIdx = useCallback( async (idx) => {
        let temp = [...optionList];
        temp.splice(idx, 1);
        setOptionList(temp)
    })

    function addNewOption() {
        let temp = [...optionList];
        temp.push('')
        setOptionList(temp)            
    }
    return (
        <Form >
            <Form.Group className="mb-3" controlId="msg">
                <Form.Label>Question Title</Form.Label>
                <Form.Control className="w-25" placeholder="Type question Here" onChange={(e) => {setTitle(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Question Type</Form.Label>
                    <Form.Check inline type='radio' label='Multiple-choice' value='multi-choice' name="questionType" onChange={(e) => {setType(e.target.value)}}>
                    </Form.Check>
                    <Form.Check inline type='radio' label='True/False' value='tf' name="questionType" onChange={(e) => {setType(e.target.value)}}>
                    </Form.Check>
                    <Form.Check inline type='radio' label='Short answer' value='short-answer' name="questionType" onChange={(e) => {setType(e.target.value)}}>
                </Form.Check>
            </Form.Group>
            {type === 'multi-choice' ? 
                <Form.Group>
                    {optionList.length > 0 ? 
                    <>
                        {Object.keys(optionList).map(key => {return (
                            <div key={key} className={'option-' + key}>
                                <Form.Control  style={{padding: '10px', display: 'inline-block'}} className="w-25" placeholder="Type option Here"/>
                                <Button style={{display: 'inline-block'}} onClick={() => removeByIdx(key)}>X</Button>
                            </div>
                        )})}
                    </> : 
                    <></>}
                    <Button onClick={() => addNewOption()}>+ Add Another Option</Button>
                </Form.Group> : 
            <div></div>}
            <Form.Group>
                <Form.Label>Is this a required question?</Form.Label>
                <Form.Check inline type='radio' label='Yes' name="required">
                </Form.Check>
                <Form.Check inline type='radio' label='No' name="required">
                </Form.Check>
            </Form.Group>
        </Form>
    )    
}