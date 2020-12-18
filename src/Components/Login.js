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
        <div className="hero-image">
            <div className="hero-text" >
                    <div className="logincard ">
                            <img  top height="120" className="loginlogo" src={require('../Shared/vit.ico')} alt="" />
                        <CardBody>
                            <InputGroup className="login_username">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText style={{borderColor:" rgb(171, 96, 221)"}}><PersonIcon style={{color:" rgb(171, 96, 221)"}} /></InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Username"  value={username}  style={{borderColor:" rgb(171, 96, 221)"}} onChange={event=> setUsername(event.target.value)}/>
                            </InputGroup>
                            <InputGroup className="login_password" >
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText style={{borderColor:" rgb(171, 96, 221)"}}><LockIcon style={{color:" rgb(171, 96, 221)"}} /></InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Password" style={{borderColor:" rgb(171, 96, 221)"}} type={input} value={password} onChange={event=> setPassword(event.target.value)}/>
                                    <InputGroupText style={{borderColor:" rgb(171, 96, 221)"}}>{Visibile ? <VisibilityOffOutlinedIcon style={{color:" rgb(171, 96, 221)"}} onClick={()=>{onclick();}} /> : <VisibilityIcon style={{color:" rgb(171, 96, 221)"}} onClick={()=>{onclick();}}/>}</InputGroupText>                            </InputGroup>
                            <NavLink to="/" className="login_forgotpassword ">Forgot Password ?</NavLink>
                            <InputGroup  >
                                <Button className="login_Buttonb" size="md" block onClick={() => {handleInputChange();loginToApp(username);}}><strong>Login</strong></Button>
                            </InputGroup>
                        </CardBody>
                        <div className="card_footer">
                            <CardText><strong className="new_here"> NEW HERE . . .? </strong><NavLink to="/register"  ><strong className="login_signup">Sign Up</strong></NavLink></CardText>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Login