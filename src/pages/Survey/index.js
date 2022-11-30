import { Tabs, Tab } from 'react-bootstrap'
import SurveyPage from './SurveyPage'

export default function Survey() {
    return (
        <Tabs defaultActiveKey={'template'}>
            <Tab eventKey={'template'} title='Survey Template List'>
                <SurveyPage/>
            </Tab>
            <Tab eventKey={'send'} title='Send a Survey '>
                Send Survey(s) to assigned alumni through Email.
            </Tab>
            <Tab eventKey={'more'} title='Survey Progress'>
                A graphic representation of the survey progress, e.g. how many people have completed the surveys, how many people answered yes for specific questions.
            </Tab>
        </Tabs>
    )
}
