import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'

import Login from './Login';
import SignUP from './SignUp';
import Admin from './Admin/Admin';
import Exam from './Student/Exam';
import Online from './Student/Online';
import Profile from './Student/Profile';
import Test from './Admin/Test';
import AdminExam from './Admin/AdminExam';

class MainPage extends Component {
    render() {
        return (
        <div>
            <Switch>
                <Route exact path='/' component={ Login } />
                <Route exact path='/admin' component={ Admin }/> 
                <Route exact path='/register' component={ SignUP } />
                <Route exact path='/profile' component={ Profile } />
                <Route exact path='/exam' component={ Exam }/>
                <Route exact path='/online' component={ Online }/>                
                <Route exact path='/adminexam' component={ AdminExam }/>   
                <Route exact path='/test' component={ Test }/>   
            </Switch>
        </div>  
        );
    }
}

export default MainPage