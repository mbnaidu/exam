import React, { useState } from 'react';
import { Button, Form,Input, InputGroup, InputGroupAddon, Container, Jumbotron, FormGroup, Label, Col, Collapse, CardBody } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import '../styles/Login.css'
import { Card, FormControl } from '@material-ui/core';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function Test(props) {
    const{
        className
    } = props;
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    }
    const [ques,setQues] = useState();
    const [subject,setSubject] = useState("");
    const [topic,setTopic] = useState("");
    const [date,setDate] = useState("");
    const [from,setFrom] = useState("");
    const [to,setTo] = useState("");
    const [timings,setTimings] = useState("");
    const [students,setStudents] = useState([]);
    const [questions,setQuestions] = useState([]);
    const [totalMarks,setTotalMarks] = useState(0);
    const [i,setI] = useState(0);
    const [assign,setAssign] = useState("ASSIGN");
    const [a,setA] = useState("danger");
    const [b,setB] = useState("danger");
    const [c,setC] = useState("danger");
    const [d,setD] = useState("danger");
    const [e,setE] = useState("danger");
    const [f,setF] = useState("danger");
    const [g,setG] = useState("danger");
    const [h,setH] = useState("danger");
    
    const change = (event) =>{
        if(subject!=""){setA("success");}
        if(subject==""){setA("danger");}
        if(topic!=""){setB("success");}
        if(topic==""){setB("danger");}
        if(date!=""){setC("success");}
        if(date==""){setC("danger");}
        if(timings!=""){setD("success");}
        if(timings==""){setD("danger");}
        if(students!=""){setE("success");}
        if(students==""){setE("danger");}
        if(questions!=""){setF("success");}
        if(questions==""){setF("danger");}
        if(totalMarks!=""){setG("success");}
        if(totalMarks==""){setG("danger");}
    }
    const submit = (event)=>{
        if(subject!="" && topic!="" && date!="" && timings!="" && students!="" && questions!="" && totalMarks!=""){
            setAssign("ASSIGNED");setA("success");setB("success");setC("success");setD("success");setE("success");setF("success");setG("success");setH("success");
        }
    }
    const [isOpen, setIsOpen] = useState(false);
    const Qtoggle = () => setIsOpen(!isOpen);
    const question = () =>{
        return(
            <div>
                <Input />
            </div>
        )
    }
    const options = ( ) => {
        const [input1,setInput1]=useState("");
    const [input2,setInput2]=useState("");
    const [input3,setInput3]=useState("");
    const [input4,setInput4]=useState("");
    const adding=(m1,m2,m3,m4)=>{
        console.log(m1,m2,m3,m4)
        let madhu = [];
        madhu.push(m1,m2,m3,m4);
        console.log(madhu)
    }
        return(
            <div>hi</div>
        )
    }
    const MENU = ( ) => {
        return(
            <div>
                <ul>{Array.from(Array(20), (e, i) =>{
                        return(
                            <li key={i}>
                              <FormGroup row>
                                    <Col sm={10}>
                                        {question()}
                                    </Col>
                                    <Col sm={2}>
                                        {options()}
                                    </Col>
                                </FormGroup>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    return (
        <div>
           <Jumbotron fluid className="box">
                <Container >
                    <FormControl className="inbox">
                        <InputGroup>
                            <Input className="inp1" value={subject} onChange={event=> setSubject(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                    <Button className="btn1 "  color={a} outline onClick={()=>change()}>SET SUBJECT</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input value={topic} onChange={event=> setTopic(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn2" color={b} outline onClick={()=>change()} >SET TOPIC </Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input value={date} onChange={event=> setDate(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn3" color={c} outline onClick={()=>change()} >SET DATE</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input value={timings} onChange={event=> setTimings(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn4" color={d} outline onClick={()=>change()} >SET TIMINGS</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input value={students} onChange={event=> setStudents(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn5" color={e} outline onClick={()=>change()} >SELECT STUDENTS</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input value={questions} onChange={event=> setQuestions(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <div>
                                    <Button className="btn6" color={f} onClick={()=>{toggle();change();}}>SET QUESTIONS</Button>
                                    <Modal isOpen={modal} toggle={toggle} className={className} >
                                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                                        <ModalBody>
                                        <InputGroup>
                                            <Input placeholder="NUMBER OF QUESTIONS" min={0} max={100} type="number" step="5" value={ques} onChange={event=> setQues(event.target.value)}/>
                                        </InputGroup>
                                        <br />
                                        <Button color="success" outline onClick={()=>{toggleNested();}}>SET QUESTIONS</Button>
                                        <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined} size="lg">
                                            <ModalHeader size="lg">Nested Modal title</ModalHeader>
                                            <ModalBody size="lg">{MENU()}</ModalBody>
                                            <ModalFooter>
                                            <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
                                            <Button color="secondary" onClick={toggleAll}>All Done</Button>
                                            </ModalFooter>
                                        </Modal>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input value={totalMarks} onChange={event=> setTotalMarks(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn8" color={g} outline onClick={()=>change()} >SET TOTAL MARKS</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <Button color={h} onClick={()=>{submit()}}><strong>{assign}</strong></Button>
                    </FormControl>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Test
