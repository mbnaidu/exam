import React, { useState } from 'react';
import { Button, Form,Input, InputGroup, InputGroupText, CardText, CardBody, Jumbotron, InputGroupAddon } from 'reactstrap';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { NavLink, useHistory } from 'react-router-dom';
import '../styles/Login.css'
import axios from 'axios';
import { useStateValue } from '../redux/StateProvider'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';


function Login() {
    const [state,dispatch] = useStateValue();
    const loginToApp = () => {
        dispatch({
            type:"SET_USER",
            user:{username}
        })
    };
    const [Visibile,setVisible] = useState(true);
    const [input,setInput] = useState("password");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const onclick = () => {
        if(input === "text"){
            setVisible(true);
            setInput("password")
        }
        else{
            setVisible(false);
            setInput("text");
        }
    }
    const handleInputChange=(event)=>{
        if(!username || !password) {
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
            <div className="login">
                <Form>
                    <Jumbotron className="logincard ">
                            <img  top height="120" className="loginlogo" src={require('../Shared/vit.ico')} alt="" />
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
                                <Input placeholder="Password" style={{borderColor:"rgb(110,94,254)"}} type={input} value={password} onChange={event=> setPassword(event.target.value)}/>
                                    <InputGroupText style={{borderColor:"rgb(110,94,254)"}}>{Visibile ? <VisibilityOffOutlinedIcon style={{color:"rgb(110,94,254)"}} onClick={()=>{onclick();}} /> : <VisibilityIcon style={{color:"rgb(110,94,254)"}} onClick={()=>{onclick();}}/>}</InputGroupText>                            </InputGroup>
                            <NavLink to="/" className="login_forgotpassword">Forgot Password ?</NavLink>
                            <InputGroup  >
                                <Button className="loginbutton" size="md" block onClick={() => {handleInputChange();loginToApp(username);}}><strong>Login</strong></Button>
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