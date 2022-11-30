import { Tabs, Tab } from 'react-bootstrap'
import StudentTable from './StudentTable'
import AlumniTable from './AlumniTable'
import Report from './Report'

export default function FacultyTable() {
    return (
        <div>
            <Tabs>
                <Tab eventKey="pos" title="Plan of Study">
                    <StudentTable style = {{display:"inline-block"}} type = "pos"/>
                </Tab>

                {/* <Tab eventKey="alumni" title="Alumni">
                    <AlumniTable style = {{display:"inline-block"}} type = "alumni"/>
                </Tab> */}

                <Tab eventKey="report" title="Report">
                    <Report/>
                </Tab>

            </Tabs>
        </div>
    )
}