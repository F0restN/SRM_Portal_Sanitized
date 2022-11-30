import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useFetch from '../hooks/useFetch';

import config from '../config.json';

export default function LoginButton() {

    const {authenticated, setAuthenticated} = useContext(AppContext)
    const history = useHistory();

    const authenticate = async () => {
        let loginInfo = {
            identifier: 'yyf',
            password: 'abc123'
        }

        try {
            let res = await fetch(`${config.portal}/auth/local`,{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })

            let result = await res.json();
            console.log(result)

            // Update the value of react context if valid
            if (result && result.user) {
                setAuthenticated(result.user.role.name)
                history.push("/")

            } else {
                console.log("Current user: "+authenticated)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={authenticate}>Login</button>
    )
}
