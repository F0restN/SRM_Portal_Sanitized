import {CONFIG} from "../../../ENV";
import axios from "axios";

async function SelectedCoursesFetch(query, fetchConfig) {
    let data = []
    let loading = true
    let error = false

    try {
        let result = await axios.post(`${CONFIG.PORTAL}/students-courses/getSelectedCoursesForStudent`, query, fetchConfig)
        data = result.data
        loading = false
    }catch (e) {
        error = e
        loading = false
    }

    return [loading, error, data];
}

export default SelectedCoursesFetch;