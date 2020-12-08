import React,{useState} from 'react'
import { Button, Form, Jumbotron,FormGroup, Input, Label, FormFeedback } from 'reactstrap'
import '../styles/SignUp.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SignUp() {

    // To change directories
        const history = useHistory();

    //setting color before the input
        const [EM,setEM] = useState(false);
        const [ID,setID] = useState(false)
        const [UN,setUN] = useState(false)
        const [PA,setPA] = useState(false)
        const [PB,setPB] = useState(false)
        const [C,setC] = useState(false);

    // input
        const [id, setId] = useState("");
        const [username, setUsername] = useState("");
        const [password1, setPassword1] = useState("");
        const [password2, setPassword2] = useState("");
        const [email, setEmail] = useState("");
        const [contactNumber, setContactNumber] = useState("");

    // setting color after input
        const change = () => {
            if(email!=""){setEM(true)};
            if(email ===""){setEM(false)};
    
            if(id!=""){setID(true)};
            if(id ===""){setID(false)};
    
            if(username!=""){setUN(true)};
            if(username ===""){setUN(false)};
    
            if(password2!=""){setPB(true)};
            if(password2 === ""){setPB(false)};
    
            if(password1!=""){setPA(true)};
            if(password1 ===""){setPA(false)};
    
            if(contactNumber!=""){setC(true)};
            if(contactNumber === ""){setC(false)};
        }
    // checking input 
        function onSignupclickHandler() {
            if(id!="" && username!="" && password1!="" && password2!="" && email!="" && contactNumber!=""){
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
            }
        };
    return (
        <div>
            <div>
                <Jumbotron className="signup">
                    <Form>
                        <FormGroup  >
                            <Label className="id_label pl-2"><strong>REGISTER NUMBER</strong></Label>
                            <Input valid={ID} className="id_input pl-5"  type="text" value={id}   onChange={event=> {setId(event.target.value);change()}} this/>
                            <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                        </FormGroup>
                        <FormGroup  >
                            <Label className="email_label pl-2"><strong>E-MAIL</strong></Label>
                            <Input valid={EM} className="email_input pl-5" type="text" value={email}   onChange={event=> {setEmail(event.target.value);change()}}/>
                        </FormGroup>
                        <FormGroup  >
                            <Label className="username_label pl-2"><strong>USER NAME</strong></Label>
                            <Input valid={UN} className="username_input pl-5"  type="text" value={username }   onChange={event=> {setUsername(event.target.value);change()}}/>
                        </FormGroup>
                        <FormGroup  >
                            <Label className="password_label pl-2"><strong>PASSWORD</strong></Label>
                            <Input valid={PA} className="password_input pl-5" type="password" value={password1 }   onChange={event=> {setPassword1(event.target.value);change()}}/>
                            </FormGroup>
                        <FormGroup  >
                            <Label className="password_label pl-2"><strong>CONFIRM PASSWORD</strong></Label>
                            <Input valid={PB} className="confirm_input pl-5"  type="password" value={password2}   onChange={event=> {setPassword2(event.target.value);change()}}/>
                            </FormGroup>
                        <FormGroup  >
                            <Label className="contact_label pl-2"><strong>CONTACT NUMBER</strong></Label>
                            <Input valid={C} className="contact_input pl-5" type="number" value={contactNumber}   onChange={event=> {setContactNumber(event.target.value);change()}}/>
                            </FormGroup>
                    </Form>
                        <Button className="buttonl" style={{backgroundColor:"rgb(110,94,254) "}} onClick={()=>{onSignupclickHandler();change()}}><strong>Sign Up</strong></Button>
                </Jumbotron>
            </div>
        </div>
    )
}

export default SignUp
