import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './SiteHeader.css';
import { useHistory } from 'react-router-dom';
import store from '../../store/store';

export default function SiteHeader() {
  // const [show, setShow] = useState(false);
  const [authenticationStatus] = useState(store.getState);
  const history = useHistory();

  const userName = sessionStorage.getItem('currentUserName');
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);
  const logOut = () => {
    sessionStorage.clear();
    history.push('/');
  };

  const role = authenticationStatus.authenticationRole;
  return (
    <IconContext.Provider
      value={{ color: 'blue', className: 'global-class-name', size: '1.3em' }}
    >
      {/*<div className="site-header">*/}
      {/*    { role !== false*/}
      {/*        ?*/}
      {/*<div className="site-header-navbar">*/}
      {/*    <AiIcons.AiOutlineBars onClick={handleShow}/>*/}
      {/*    <NavBar show={show} handleClose={handleClose} role={role} />*/}
      {/*</div>*/}
      {/*        : <div className="site-header-navbar"> </div>*/}

      {/*    }*/}

      {role !== false ? (
        <Navbar className="site-header">
          <Container>
            <Navbar.Brand className="site-header-title ml-0">
              Student Relationship Management Hub
            </Navbar.Brand>
          </Container>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="site-header-item">
                <Navbar.Text> Welcome, </Navbar.Text>
                <NavDropdown title={userName} align="end">
                  <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <div className="site-header-navbar"> </div>
      )}

      {/*<div className="site-header-title">*/}
      {/*    University of Pittsburgh - SHRS*/}
      {/*</div>*/}

      {/*{role !== false*/}
      {/*    ?*/}
      {/*    <div className="site-header-setting">*/}
      {/*        <AiIcons.AiFillSetting />*/}
      {/*        <Button color = "primary" onClick = {logOut}> Logout </Button>*/}
      {/*    </div>*/}
      {/*    : <div className="site-header-setting"> </div>*/}
      {/*}*/}
      {/*</Link>*/}
      {/*</div>*/}
    </IconContext.Provider>
  );
}
