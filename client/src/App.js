/* Treehouse FSJS Techdegree
 * Project 10 - Full Stack App
 * By Justin Black
 
 Going for Exceeds Expectations but okay with meeting expecatations
 */

import React, { PureComponent } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header.js';
import CreateCourse from './components/CreateCourse.js';
import UpdateCourse from './components/UpdateCourse.js';
import CourseDetail from './components/CourseDetail.js';
import UserSignIn from './components/UserSignIn.js';
import UserSignUp from './components/UserSignUp.js';
import UserSignOut from './components/UserSignOut.js';
import Courses from './components/Courses.js';
import NotFound from './components/NotFound.js';
import withContext from './Context';
import Authenticated from './components/Authenticated';
import PrivateRoute from './PrivateRoute.js';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailInWithContext = withContext(CourseDetail);



class App extends PureComponent  {

  render() {
    return (
      <BrowserRouter>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' component={Courses} />
          <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
          <Route exact path='/courses/:id' component={CourseDetailInWithContext} /> 
          <Route exact path='/signin' component={UserSignInWithContext} /> 
          <Route exact path='/signup' component={UserSignUpWithContext} /> 
          <Route exact path='/signout' component={UserSignOutWithContext} /> 
          <Route exact path='/signout' component={UserSignOut} /> 
          <PrivateRoute exact path='/authenticated' component={AuthWithContext} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} /> 
          <Route exact path='/forbidden' component={Forbidden} /> 
          <Route exact path='/error' component={UnhandledError} /> 
          <Route component= {NotFound} /> 
        </Switch>
      </div> 
      </BrowserRouter>
    );
  }
}

export default App;