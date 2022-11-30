import React, {useEffect, useState} from 'react';
import store from "../../../store/store";
import axios from "axios";
import config from "../../../config.json";

async function StudentFetch(query, fetchConfig) {
    let data = []
    let loading = true
    let error = false

    try {
        let result = await axios.post(`${config.portal}/students/getStudentInfo`, query, fetchConfig);
        data = result.data[0]
        loading = false
    } catch (e) {
        error = e
        loading = false
    }

    return [loading, error, data];
}

export default StudentFetch;