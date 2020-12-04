import { FormGroup, Input } from '@material-ui/core'
import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Form, Jumbotron } from 'reactstrap'
import '../styles/Register.css'

function Registration() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    return (
        <div>
            <div>
                <Jumbotron className="jumb">
                    <Form>
                        <FormGroup row >
                            <Input className="input__change__email pl-5" placeholder="E - Mail " type="text" value={email}   onChange={event=> setEmail(event.target.value)}/>
                        </FormGroup>
                        <FormGroup row >
                            <Input className="input__change__username pl-5" placeholder="Username" type="text" value={username }   onChange={event=> setUsername(event.target.value)}/>
                        </FormGroup>
                            <FormGroup row >
                                <Input className="input__change__password pl-5" placeholder="Password" type="password" value={password1 }   onChange={event=> setPassword1(event.target.value)}/>
                                </FormGroup>
                            <FormGroup row >
                                <Input className="input__change__confirm pl-5" placeholder="Confirm Password" type="password" value={password2}   onChange={event=> setPassword2(event.target.value)}/>
                            </FormGroup>
                        </Form>
                </Jumbotron>
                <Button className="buttonl" style={{backgroundColor:"rgb(110,94,254) "}} ><NavLink to="/"  ><strong>Sign Up</strong></NavLink></Button>
            </div>
        </div>
    )
}

export default Registration
