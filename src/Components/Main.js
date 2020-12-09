import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'

import SignUP from './SignUp';
import Login from './Login';
import Online from './Student/Online';
import AdminExam from './Admin/AdminExam';
import AdminProfile from './Admin/AdminProfile';
import AssignTest from './Admin/AssignTest';
import StudentProfile from './Student/StudentProfile';
import StudentExam from './Student/StudentExam';

class Main extends Component {
    render() {
        return (
        <div>
            <Switch>
                <Route exact path='/register' component={ SignUP } />
                <Route exact path='/' component={ Login } />
                <Route exact path='/admin' component={  AdminProfile}/> 
                <Route exact path='/profile' component={ StudentProfile } />
                <Route exact path='/exam' component={ StudentExam }/>
                <Route exact path='/online' component={ Online }/>                
                <Route exact path='/adminexam' component={ AdminExam }/>   
                <Route exact path='/test' component={ AssignTest }/>   
            </Switch>
        </div>  
        );
    }
}

export default Main
