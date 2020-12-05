import React, { useState } from 'react';
import { Button, Form,Input, InputGroup, InputGroupText, CardText, CardBody, Jumbotron, InputGroupAddon } from 'reactstrap';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import '../styles/Login.css'
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState("false");
    const [errorText, setErrorText] = useState("");
    const handleInputChange=(event)=>{
        if(!username || !password) {
            setErrorText(errorText + 'Username/Password cannot be empty');
            setErrors("true");
        } 
        else {
        const data = {
            "username":username,
            "password":password
        }
        axios.post('http://localhost:3001/login', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    if(username === "madhu" && password === "madhu"){
                        console.log("JI")
                        history.push("/admin");
                    }
                    else{
                        history.push("/profile");
                    }
                }
            }
        )
    }
    }
    return (
        <div>
            <div className="login ">
                <Form>
                    <Jumbotron className="logincard ">
                            <img  top height="120" className="loginlogo" src={require('../Shared/vit.ico')} alt="Card image cap"  />
                        <CardBody>
                            <InputGroup className="login_username">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText style={{borderColor:"rgb(110,94,254)"}}><PersonIcon style={{color:"rgb(110,94,254)"}} /></InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Username"  value={username}  style={{borderColor:"rgb(110,94,254)"}} onChange={event=> setUsername(event.target.value)}/>
                            </InputGroup>
                            <InputGroup className="login_password" >
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText style={{borderColor:"rgb(110,94,254)"}}><LockIcon style={{color:"rgb(110,94,254)"}} /></InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Password" style={{borderColor:"rgb(110,94,254)"}} type="password" value={password} onChange={event=> setPassword(event.target.value)}/>
                            </InputGroup>
                            <NavLink to="/" className="login_forgotpassword">Forgot Password ?</NavLink>
                            <InputGroup  >
                                <Button className="loginbutton" size="md" block onClick={() => {handleInputChange()}}><strong>Login</strong></Button>
                            </InputGroup>
                        </CardBody>
                        <div className="cardfooter">
                            <CardText><strong> NEW USER . . .? </strong><NavLink to="/register"  ><strong>Sign Up</strong></NavLink></CardText>
                        </div>
                    </Jumbotron>
                </Form>
            </div>
        </div>
    )
}

export default Login