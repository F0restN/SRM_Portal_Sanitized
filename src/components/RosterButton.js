import { Button } from "reactstrap";
import '../index.css'


export default function RosterButton(props) {
    return (
        <div>
            {/* {props.plan_available == true ? <Button color = 'primary' style = {{display:"inline"}}>View/Edit Plan</Button> : <Button style = {{display:"inline-block"}}>Create Plan</Button>} */}
            {props.plan_available == true ? <Button color = 'primary' style = {{display:"inline"}}>Create PDF</Button> : <Button style = {{display:"inline-block"}}>Create PDF</Button>}
        </div>
    )
}