/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../index.css';
import config from '../config.json';

function Loginpage() {
  // const dispatch = useDispatch()

  const history = useHistory();
  const [logInfo, setLogInfo] = useState({
    identifier: '',
    password: '',
  });

  const errorHandle = (e) => {
    if (e && e.statusCode === 400) {
      alert('Not valid, please enter email and password again');
    } else {
      alert('Oops, something went wrong, please contact administrator');
    }
  };

  const authenticate = async () => {
    try {
      const res = await fetch(`${config.portal}/auth/local`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logInfo),
      }).catch((error) => errorHandle(error));

      const result = await res.json();

      // Update the value of react context if valid
      if (result && result.user) {
        const authenticationStatusInfo = {
          authenticationRole: result.user.role.name,
          jwtToken: result.jwt,
        };
        sessionStorage.setItem(
          'authenticationStatus',
          JSON.stringify(authenticationStatusInfo)
        );
        sessionStorage.setItem('currentUserName', result.user.username);

        // store.dispatch(update(authenticationStatusInfo))
        if (authenticationStatusInfo.authenticationRole === 'Faculty') {
          history.push('/faculty', authenticationStatusInfo);
        } else if (authenticationStatusInfo.authenticationRole === 'Staff') {
          history.push('/admin', authenticationStatusInfo);
        } else {
          alert('Not valid, please enter email and password again');
        }
      } else {
        alert('Not valid, please enter email and password again');
      }
    } catch (error) {
      errorHandle(error);
    }
  };

  return (
    <div>
      {/*<SiteHeader />*/}

      <Form className="login-form mt-5">
        <h2 className="text-center p-3">Plan of Study Management</h2>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="email"
            placeholder="Enter email address here"
            onChange={(e) =>
              setLogInfo({
                ...logInfo,
                identifier: e.target.value,
              })
            }
            value={logInfo.identifier}
          />
        </FormGroup>
        <div className="mb-4">
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLogInfo({
                  ...logInfo,
                  password: e.target.value,
                })
              }
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  authenticate();
                }
              }}
              value={logInfo.password}
            />
          </FormGroup>
        </div>
        <Button color="primary" block onClick={authenticate}>
          Sign in
        </Button>
        <div className="text-center mt-3">
          <a className="subtitle-link" href="mailto:parmantolab@gmail.com">
            Forget password
          </a>
        </div>
        {/*<LoginButton />*/}
      </Form>
    </div>
  );
}

export default withRouter(Loginpage);
