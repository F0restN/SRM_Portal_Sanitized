import React, { useEffect, useState } from 'react'
import store from '../store/store';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
    const [authenticationStatus] = useState(store.getState())
    
    return (
        <Route
            {...rest}
            render={ () =>
                authenticationStatus.authenticationRole !== false ? (
                    children
                ) : (
                    <Redirect
                        to="/"
                    />
                )
            }
        />
    );
}

export default withRouter(PrivateRoute)


