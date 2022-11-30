import { useState, useCallback } from "react";
import { Survey } from "survey-react-ui";
import { Modal, Button } from 'react-bootstrap'
import { StylesManager, Model } from "survey-core";
import "survey-core/modern.min.css";
import './survey.css'


export default function SurveyItem(props) {
    const [showSurvey, setShowSurvey] = useState(false)
    const handleCloseSurvey = () => setShowSurvey(false);

    // const alertResults = useCallback((sender) => {
    //     const results = JSON.stringify(sender.data);
    //     alert(results);
    // }, []);

    const surveyModel = new Model(props.surveyJSON);
    StylesManager.applyTheme("modern");
    surveyModel.mode = 'display'
    surveyModel.focusFirstQuestionAutomatic = false;

    // surveyModel.onComplete.add(alertResults);

    return (
        <div>
            <Button onClick={() => setShowSurvey(!showSurvey)}>View Survey: {props.name}</Button>
            <Modal show={showSurvey} onHide={handleCloseSurvey} dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title> Title</Modal.Title>
                </Modal.Header>
                    <Survey model={surveyModel}/>
                    <Button variant="primary" type="submit" onSubmit={() => handleCloseSurvey()}>
                        Save
                    </Button>
            </Modal>
        </div>
    )
    
}