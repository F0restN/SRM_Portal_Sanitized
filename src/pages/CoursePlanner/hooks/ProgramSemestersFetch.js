import React, {useEffect, useState} from 'react';
import store from "../../../store/store";
import axios from "axios";
import config from "../../../config.json";
import {CONFIG} from "../../../ENV";

async function ProgramSemester(query, fetchConfig) {
    let data = []
    let loading = true
    let error = false

    try {
        let overallProgramSemestersResponse = await axios.post(`${CONFIG.PORTAL}/programs/getOverallSemesters`, query, fetchConfig);
        data = overallProgramSemestersResponse.data
        loading = false
    } catch (e) {
        error = e
        loading = false
    }

    return [loading, error, data];
}

export default ProgramSemester;