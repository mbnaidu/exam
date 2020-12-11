import React,{useState} from 'react'
import { Button, Form, Jumbotron,FormGroup, Input, Label, FormFeedback, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import '../styles/SignUp.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SignUp() {

    // To change directories
        const history = useHistory();

    //setting color before the input
        const [EM,setEM] = useState(false);
        const [EMD,setEMD] = useState(false);

        const [ID,setID] = useState(false);
        const [IDD,setIDD] = useState(false);

        const [UN,setUN] = useState(false);
        const [UND,setUND] = useState(false);

        const [PA,setPA] = useState(false);
        const [PAD,setPAD] = useState(false);

        const [PB,setPB] = useState(false);
        const [PBD,setPBD] = useState(false);
        
        const [C,setC] = useState(false);
        const [CD,setCD] = useState(false);


    // input
        const [id, setId] = useState("");
        const [username, setUsername] = useState("");
        const [password1, setPassword1] = useState("");
        const [password2, setPassword2] = useState("");
        const [email, setEmail] = useState("");
        const [contactNumber, setContactNumber] = useState("");

    // setting color after input
        const id_change = () =>{
            if(id.length === 7){setID(false);setIDD(true);};
            if(id.length >7 || id.length<7){setID(true);setIDD(false)};
        }
        const email_change = () => {
            if(email.length>=8){setEM(false);setEMD(true);};
            if(email.length<7){setEM(true);setEMD(false);};
        }
        const username_change = () => {
            if(username.length>5){setUN(false);setUND(true)};
            if(username.length<4){setUN(true);setUND(false)};
        }
        const password_change = (a,b) =>{
            if(b === a){setPB(false);setPBD(true)};
            if(b !== a){setPB(true);setPBD(false)};
        }
        const contactNumber_change = (c) => {
            if(contactNumber.length===9 ){setCD(true);setC(false)};
            if(contactNumber.length>9 || contactNumber.length<9){setC(true);setCD(false)};
        }
        
const [viewModal, setViewModal] = useState(false);
const viewModalToggle = () => setViewModal(true);
    // checking input 
        function onSignupclickHandler() {
            if(id!="" && username!="" && password1!="" && password2!="" && email!="" && contactNumber!=""){
                viewModalToggle();
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
                        }
                    }
                )
            }
        };
    return (
        <div>
            <div>
                <Modal isOpen={viewModal} size="lg" toggle={viewModalToggle} >
                    <ModalHeader ><strong>Sign Up Details....</strong></ModalHeader>
                        <ModalBody>
                                SUCCESSFULLY REGISTERED
                                </ModalBody>
                            <ModalFooter>
                            <Button color="success" href="/"><strong>Continue...</strong></Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </div>
        <div className="hero-image"> 
            <div className="signup">
                <a href="/">
                <img  top height="120" className="signup_image" src={require('../Shared/vit.ico')} alt="" />
                </a>
                    <div className="sign__up">
                    <Form>
                        <FormGroup  >
                            <div class="form-floating ">
                                <Input type="email" className={ID ? "form-control is-invalid" : "form-control "}  id="floatingInput" placeholder="name@example.com" valid={IDD} value={id}   onChange={event=> {setId(event.target.value);id_change()}} this required/>
                                <Label >Register Id</Label>
                                <div className={ID ? "invalid-tooltip" : ""}>
                                    {ID ? "ID length should be greater than 8" : ""}
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup  >
                            <div class="form-floating">
                                <Input type="password" className={EM ? "form-control is-invalid" : "form-control "} id="floatingPassword" placeholder="Password" valid={EMD}  type="text" value={email}   onChange={event=> {setEmail(event.target.value);email_change()}}/>
                                <Label for="floatingPassword">E-Mail</Label>
                                <div className={EM ? "invalid-tooltip" : ""}>
                                    {EM ? "length should be greater than 8" : ""}
                            </div>
                            </div>
                        </FormGroup>
                        <FormGroup  >
                            <div class="form-floating">
                                <Input type="password" className={UN ? "form-control is-invalid" : "form-control "} id="floatingPassword" placeholder="Password" valid={UND}   type="text" value={username }   onChange={event=> {setUsername(event.target.value);username_change()}}/>
                                <Label for="floatingPassword">Username</Label>
                            <div className={UN ? "invalid-tooltip" : ""}>
                                    {UN ? "length should be greater than 5" : ""}
                            </div>
                            </div>
                        </FormGroup>
                        <FormGroup  >
                            <div class="form-floating">
                                <Input type="password" className="form-control "  id="floatingPassword" placeholder="Password"  type="password" value={password1 }   onChange={event=> {setPassword1(event.target.value);}}/>
                                <Label for="floatingPassword">Password</Label>
                            </div>
                        </FormGroup>
                        <FormGroup  >
                            <div class="form-floating">
                                <Input type="password" className={PB ? "form-control is-invalid" : "form-control "} id="floatingPassword" placeholder="Password" valid={PBD}   type="password" value={password2}   onChange={event=> {setPassword2(event.target.value);password_change(password1,event.target.value)}}/>
                                <Label for="floatingPassword">Confirm password</Label>
                            <div className={PB ? "invalid-tooltip" : ""}>
                                    {PB ? "NOT MATCHED" : ""}
                            </div>
                            </div>
                            </FormGroup>
                        <FormGroup  >
                            <div class="form-floating">
                                <Input type="password" className={C ? "form-control is-invalid" : "form-control "} id="floatingPassword" placeholder="Password" valid={CD}  type="number" value={contactNumber}   onChange={event=> {setContactNumber(event.target.value);contactNumber_change(contactNumber)}}/>
                                <Label for="floatingPassword">Contact number</Label>
                            <div className={C ? "invalid-tooltip" : ""}>
                                    {C ? "Please enter correct number" : ""}
                            </div>
                            </div>
                            </FormGroup>
                    </Form>
                        <Button className="signup_Button "  onClick={()=>{onSignupclickHandler();}}><strong>Sign Up</strong></Button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SignUp
