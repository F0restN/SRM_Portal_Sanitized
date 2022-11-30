/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NavBarData from './NavBarData';
import './NavBar.css';
import store from '../../store/store';
import icon from './favicon.ico';

export default function NavBar() {
  const history = useHistory();
  const [location, setLocation] = useState(history.location.pathname);
  const [authenticationStatus, setAuthenticationStatus] = useState(
    store.getState()
  );
  const role = authenticationStatus.authenticationRole;

  return (
    <div>
      {role !== false ? (
        <div>
          <Navbar className="navbar-title mb-3">
            <Container className="justify-content-center">
              <Navbar.Brand href="/dashboard">
                <img
                  alt=""
                  src={icon}
                  width="25"
                  height="28"
                  className="d-inline-block align-top"
                />{' '}
                Univ of Pitt - SHRS
              </Navbar.Brand>
            </Container>
          </Navbar>
          <div className="menu-bars">
            {NavBarData.map((item) => {
              if (item.authority === role || item.authority === 'All') {
                return (
                  <li
                    key={uuidv4()}
                    className={item.cName}
                    id={location === item.path ? 'active' : ''}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <div> No </div>
      )}
    </div>
  );
}
