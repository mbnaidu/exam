import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import Admin from './Admin';
import Exam from './Exam';
import LoginPageForAll from './LoginPageForAll';
import Online from './Online';
import Profile from './Profile';
import Registration from './RegistrationPage';
import Test from './Test';
import AdminExam from './AdminExam';

class MainPage extends Component {
    render() {
        return (
        <div>
            <Switch>
                <Route exact path='/' component={ LoginPageForAll } />
                <Route exact path='/register' component={ Registration } />
                <Route exact path='/profile' component={ Profile } />
                <Route exact path='/exam' component={ Exam }/>
                <Route exact path='/online' component={ Online }/>                
                <Route exact path='/admin' component={ Admin }/> 
                <Route exact path='/adminexam' component={ AdminExam }/>   
                <Route exact path='/test' component={ Test }/>   
            </Switch>
        </div>  
        );
    }
}

export default MainPage
