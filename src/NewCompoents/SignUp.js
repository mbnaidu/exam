import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Form, Jumbotron,FormGroup, Input } from 'reactstrap'
import '../styles/SignUp.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SignUp() {
    const history = useHistory();
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    function onSignupclickHandler() {
        const data = {
            "id":id,
            "username":username,
            "password":password1,
            "email":email,
            "isStudent": true,
            "contact":contactNumber,
        }
        axios.post('http://localhost:3001/signup', {data}).then(
            function(res) {
                if(res.data) {
                    history.push("/");
                }
            }
        )
    };
    return (
        <div>
            <div>
                <Jumbotron className="signup">
                    <Form>
                    <FormGroup row >
                            <Input className="input__change__email pl-5" placeholder="ID " type="number" value={id}   onChange={event=> setId(event.target.value)}/>
                        </FormGroup>
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
                            <FormGroup row >
                            <Input className="input__change__email pl-5" placeholder="Contact Number " type="number" value={contactNumber}   onChange={event=> setContactNumber(event.target.value)}/>
                        </FormGroup>
                        </Form>
                </Jumbotron>
                <Button className="buttonl" style={{backgroundColor:"rgb(110,94,254) "}} onClick={onSignupclickHandler}><NavLink to="/"  ><strong>Sign Up</strong></NavLink></Button>
            </div>
        </div>
    )
}

export default SignUp
