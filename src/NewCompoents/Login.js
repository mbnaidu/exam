import React, { useState } from 'react';
import { Button, Form,Input, InputGroup, InputGroupText, CardText, CardBody, Jumbotron, InputGroupAddon } from 'reactstrap';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { NavLink, Redirect } from 'react-router-dom';
import '../styles/Login.css'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [admin,setAdmin] = useState(false);
    const [student,setStudent] = useState(false);
    const handleInputChange=(event)=>{
        if(username === "ADMIN" && password === "ADMIN"){
          setAdmin(true);
        }
        else if ( password !='' && username !='' ){
          setStudent(true);
        }
        else{
          setPassword('');
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
                            <div>
                                { admin ? (
                                    <div>
                                        <Redirect to={'/admin'} />
                                    </div>
                                    ) : (
                                        <div>
                                        </div>
                                    )}
                            </div>
                            <div>
                                { student ? (
                                    <div>
                                        <Redirect to={'/profile'} />
                                    </div>
                                    ) : (
                                        <div>
                                        </div>
                                    )}
                            </div>
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