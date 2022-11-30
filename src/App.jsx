import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// page
import Loginpage from './pages/Loginpage';
import Faculty from './pages/Faculty/Faculty';
import Admin from './pages/Admin/components/Admin';
// import CoursePicking from './pages/CoursePicking/index'
import CoursePlanner from './pages/CoursePlanner';
import AdminAddStudent from './pages/Admin/components/AdminAddStudent';
import AdminImportStudents from './pages/Admin/components/AdminImportStudents';
import AdminUploadAdmission from './pages/Admin/components/AdminUploadAdmission';
import StudentInfo from './pages/StudentInfoView/StudentInfo';
import AdminUploadGrades from './pages/Admin/components/AdminUploadGrades';
import AdminImportAlumniSurvey from './pages/Admin/components/AdminImportAlumniSurvey';
import AdminAddAlumni from './pages/Admin/components/AdminAddAlumni';
import AddNewSurvey from './pages/Survey/AddNewSurvey';

//components
import store from './store/store';
import Notification from './components/Notification';
import PrivateRoute from './components/PrivateRoute';
import SiteHeader from './components/SiteHeader/SiteHeader';
import NavBar from './components/NavBar/NavBar';
import AdminAlumni from './pages/Admin/components/AdminAlumni';
// import RosterAdmin from './pages/Admin/components/RosterAdmin';
import Dashboard from './pages/Dashboard/index';
import AdminEditStudent from './pages/Admin/components/AdminEditStudent';
import Survey from './pages/Survey';
import CourseEditor from './pages/CourseEditor';
import ThemeCustomization from './themes';

// layout imports
function App() {
  const [authenticationStatus, setAuthenticationStatus] = useState(
    store.getState()
  );

  const role = authenticationStatus.authenticationRole;

  return (
    <Router forceRefresh>
      <ThemeCustomization>
        {role !== false ? (
          <div className="OutContainer">
            <div className="sidebar">
              <NavBar />
            </div>
            <div className="App">
              <SiteHeader />
              <div className="main">
                {/* Notification Model */}
                <Notification />
                <Switch>
                  {/* General Pages*/}
                  <Route exact path="/">
                    <Loginpage />
                  </Route>

                  {/* Faculty Pages */}
                  <PrivateRoute path="/faculty">
                    <Faculty />
                  </PrivateRoute>
                  <PrivateRoute path="/CoursePlan">
                    <CoursePlanner />
                  </PrivateRoute>
                  <PrivateRoute path="/studentinfo">
                    <StudentInfo />
                  </PrivateRoute>
                  <PrivateRoute path="/dashboard">
                    <Dashboard />
                  </PrivateRoute>

                  {/*  Staff Pages  */}
                  <PrivateRoute path="/admin">
                    <Admin />
                  </PrivateRoute>
                  <PrivateRoute path="/adminAlumni">
                    <AdminAlumni />
                  </PrivateRoute>
                  {/* <PrivateRoute path="/adminReport">
                                      <AdminReport />
                                    </PrivateRoute> */}
                  <PrivateRoute path="/AdminAddStudent">
                    <AdminAddStudent />
                  </PrivateRoute>
                  <PrivateRoute path="/AdminEditStudent/:id">
                    <AdminEditStudent />
                  </PrivateRoute>
                  <PrivateRoute path="/AdminImportStudents">
                    <AdminImportStudents />
                  </PrivateRoute>
                  <PrivateRoute path="/AdminAddAlumni">
                    <AdminAddAlumni />
                  </PrivateRoute>
                  <PrivateRoute path="/AdminUploadAdmission">
                    <AdminUploadAdmission />
                  </PrivateRoute>
                  <PrivateRoute path="/AdminImportAlumniSurvey">
                    <AdminImportAlumniSurvey />
                  </PrivateRoute>
                  <PrivateRoute path="/AdminUploadGrades">
                    <AdminUploadGrades />
                  </PrivateRoute>
                  <PrivateRoute path="/survey">
                    <Survey />
                  </PrivateRoute>
                  <PrivateRoute path="/addNewSurvey">
                    <AddNewSurvey />
                  </PrivateRoute>
                  <PrivateRoute path="/courseEditor">
                    <CourseEditor />
                  </PrivateRoute>
                  {/* <PrivateRoute path="/alumni">
                                      <RosterAdminAlumni/>
                                    </PrivateRoute> */}
                </Switch>
              </div>
            </div>
          </div>
        ) : (
          <Loginpage />
        )}
      </ThemeCustomization>
    </Router>
  );
}

export default App;
