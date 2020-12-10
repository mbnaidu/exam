import React, { useEffect, useState } from 'react';
import { Button,Input, InputGroup, InputGroupAddon, Container, Jumbotron, FormGroup, Col, Table, Card, Label } from 'reactstrap';
import '../../styles/Test.css'
import {  FormControl } from '@material-ui/core';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

var kp;

function AssignTest(props) {


    const [array,setArray] = useState([]);

    //let studentslist;
    useEffect(() => {
        axios.post('http://localhost:3001/allStudents').then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((i)=>{
                        array.push(i);
                    })}
                }
            }
        )
    },[]);
    const{
        className
    } = props;
    const today = new Date();
    var currentDay = today.getDate();
    var currentMonth = today.getMonth()+1;
    var currentYear = today.getFullYear();

    const [SUBJECT, SETSUBJECT] = useState("");
    const [TOPIC, SETTOPIC] = useState("");
    const [FROM, SETFROM] = useState("");
    const [TO, SETTO] = useState("");
    const [STARTTIME,SETSTARTTIME] = useState("");
    const [ENDTIME,SETENDTIME] = useState("");
    const [STUDENTS, SETSTUDENTS] = useState([]);
    const [QUESTIONS, SETQUESIONS] = useState([]);
    const [TOTALMARKS, SETTOTALMARKS] = useState();
    const [TOTALQUESTIONS,SETTOTALQUESTIONS]=useState(10);
    const FINALSUBMIT = () => {

        // console.log(SUBJECT);
        // console.log(TOPIC);
        let submittedDate = currentDay+"-"+currentMonth+"-"+currentYear;
        

        // console.log(TO);
        // console.log(STARTTIME);
        // console.log(ENDTIME);
        // console.log(STUDENTS);
        // console.log(QUESTIONS);
        // console.log(TOTALMARKS);
        
        if(SUBJECT!="" && TOPIC!="" && FROM!="" && TO!="" && STUDENTS!="" && QUESTIONS!="" && TOTALMARKS!="" && STARTTIME!="" && ENDTIME!="" ){
            setAssign("ASSIGNED");
            const data = {
                "subject":SUBJECT,
                "topic":TOPIC,
                "from":FROM,
                "to":TO,
                "starttime":STARTTIME,
                "endtime":ENDTIME,
                "students": STUDENTS,
                "questions":QUESTIONS,
                "total":TOTALMARKS,
                "submittedDate":submittedDate,
            }
            axios.post('http://localhost:3001/addTest', {data}).then(
                function(res) {
                    if(res.data) {
                        
                    }
                }
            )
        }

    }
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
    // TOGGLE
        const [studentmodal, setStudentModal] = useState(false);
        const studenttoggle = () => setStudentModal(!studentmodal);

        const [timemodal, setTimeModal] = useState(false);
        const timetoggle = () => setTimeModal(!timemodal);

        const [datemodal, setDateModal] = useState(false);
        const datetoggle = () => setDateModal(!datemodal);

    const [ques,setQues] = useState();
    const [subject,setSubject] = useState("");
    const [topic,setTopic] = useState("");
    const [date,setDate] = useState("");
    const [timings,setTimings] = useState("");
    const [students,setStudents] = useState([]);
    const [questions,setQuestions] = useState([]);
    const [totalMarks,setTotalMarks] = useState(0);
    const [i,setI] = useState(0);
    const [assign,setAssign] = useState("ASSIGN");
    const [isOpen, setIsOpen] = useState(false);
    const MENU = (p) => {
        kp = p;
        let input0;
        let input1 ;
        let input2 ;
        let input3;
        let input4 ;
        let store0 = [];
        let store1 = [];
        let store2 = [];
        let store3 = [];
        let store4 = [];
        let full = [];
        const [visible, setVisible] = useState(true);
        const onDismiss = () => setVisible(false);
        return(
            <div>
                <ul>{Array.from(Array(10), (e, i) =>{
                    var answer;
                    var question;
                    var option1;
                    var option2 ;
                    var option3;
                    var option4 ;
                    const calling1 = (a,b,c,d) => {
                        console.log(a,b,c,d)
                    }
                    const Option1 = (a) => {
                        console.log(a)
                    }
                    const Option2 = (a) => {
                        console.log(a)
                    }
                    const Option3 = (a) => {
                        console.log(a)
                    }
                    const Option4 = (a) => {
                        console.log(a)
                    }
                        return(
                            <li key={i}>
                                <FormGroup row>
                                <Col sm={12}>
                                    {i+1}<Input placeholder="QUESTION" value={question} />
                                </Col>
                                <Col sm={6}>
                                    <div>
                                        <Input placeholder="OPTION 1" type="text" value={option1} onChange={event=> Option1(event.target.value)}/>
                                        <Input placeholder="OPTION 2" type="text" value={option2} onChange={event=> Option2(event.target.value)}/>
                                        <Input placeholder="OPTION 3" type="text" value={option3} onChange={event=> Option3(event.target.value)}/>
                                        <Input placeholder="OPTION 4" type="text" value={option4} onChange={event=> Option4(event.target.value)}/>
                                        <Input placeholder="SELECT CORRECT OPTION" min={0} max={4} type="number" step="1" value={answer} onChange={event=> Option1(event.target.value)}/>
                                        <Button onClick={()=>{calling1(option1,option2,option3,option4);handleQuestions(full,i)}} color="success"><strong>ADD THIS QUESTION</strong></Button>
                                    </div>
                                </Col>
                            </FormGroup>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    const [studentArray,setStudentArray] = useState([""]);
    const [finalStudents,setfinalStudents] = useState([]);
    const checked = (id) => {
        var c=0;
        for(var i=0;i<studentArray.length;i++){
            if(studentArray[i]===id){
                c=c+1;
            }
        }
        if(c===0){
            studentArray.push(id);
        }
        else{
            var index = studentArray.indexOf(id)
            if (index !== -1) {
                studentArray.splice(index, 1);
            }
        }
    }
    const selectAll = () => {
        {array.map((a)=>{
            STUDENTS.push(a.id);
        })}
    }
    const handleStudents = () => {
        for(var i=0;i<studentArray.length;i++){
            if(studentArray[i]!=""){
                finalStudents.push(studentArray[i]);
                STUDENTS.push(studentArray[i]);
            }
        }
        setStudents(20);
    }
    const handleQuestions= (full,k) => {
        console.log(k+1)
        for(var i=0;i<full.length;i++){
            if(full[i]!=""){
                    QUESTIONS.push(full[i]);
            }
        }
    }
    return (
        <div>
            <Jumbotron className="set">
                <Container >
                    <FormControl >
                        <InputGroup className="box1">
                            <Input  value={SUBJECT} onChange={event=> SETSUBJECT(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                    <Button className="btn1 "  color={SUBJECT.length>0 ? "success" : "danger"} outline >SET SUBJECT</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup className="box2">
                            <Input value={TOPIC} onChange={event=> SETTOPIC(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn2" color={TOPIC.length>0 ? "success" : "danger"} outline  >SET TOPIC </Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <div>
                            <InputGroup className="box3">
                                <Input placeholder={FROM.length>0 || TO.length >0 ? FROM+"      TO      "+TO : ""} disabled/>
                                <InputGroupAddon addonType="append">
                                    <Button className="btn3" color={FROM.length>0 && TO.length>0 ? "success" : "danger"} outline onClick={()=>{datetoggle();}} >SET DATE</Button>
                                    <Modal isOpen={datemodal}  className={className}>
                                        <ModalHeader ><strong>D A T E</strong></ModalHeader>
                                        <ModalBody  size="lg">
                                        <div>
                                            <FormGroup>
                                                <Label> START DATE</Label>
                                                <Input
                                                type="date"
                                                value={FROM}
                                                onChange={event=>{SETFROM(event.target.value)}}
                                                placeholder="START DATE  DD-MM-YYYY"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label >END DATE</Label>
                                                <Input
                                                type="date"
                                                value={TO}
                                                onChange={event=>{SETTO(event.target.value)}}
                                                placeholder="LAST DATE  DD-MM-YYYY"
                                                />
                                            </FormGroup>
                                        </div>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="primary" onClick={()=>{datetoggle();}}>SET DATE</Button>{' '}
                                        <Button color="secondary" onClick={datetoggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <br />
                        <div>
                            <InputGroup className="box6">
                                <Input placeholder={STARTTIME.length>0 || ENDTIME.length>0 ? STARTTIME+"     TO    "+ENDTIME : ""} disabled/>
                                <InputGroupAddon addonType="append">
                                    <Button className="btn3" color={STARTTIME.length>0 && ENDTIME.length>0 ? "success" : "danger"} outline onClick={()=>{timetoggle();}} >SET TIME</Button>
                                    <Modal isOpen={timemodal}  className={className}>
                                        <ModalHeader ><strong>D A T E</strong></ModalHeader>
                                        <ModalBody  size="lg">
                                        <div>
                                            <FormGroup>
                                                <Label> START TIME</Label>
                                                <Input
                                                type="time"
                                                value={STARTTIME}
                                                onChange={event=>{SETSTARTTIME(event.target.value)}}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label >END TIME</Label>
                                                <Input
                                                type="time"
                                                value={ENDTIME}
                                                onChange={event=>{SETENDTIME(event.target.value)}}
                                                />
                                            </FormGroup>
                                        </div>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="primary" onClick={()=>{timetoggle();}}>SET TIME</Button>{' '}
                                        <Button color="secondary" onClick={timetoggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <br/>
                        <div>
                            <InputGroup className="box4">
                                <Input placeholder={STUDENTS.length>0 ? STUDENTS.length : ""} disabled/>
                                <InputGroupAddon addonType="append">
                                    <Button className="btn4" color={STUDENTS.length>0 ? "success" : "danger"} outline onClick={()=>{studenttoggle();}}>SELECT STUDENTS</Button>
                                    <Modal isOpen={studentmodal}  >
                                        <ModalHeader ><strong>S T U D E N T S</strong></ModalHeader>
                                        <ModalBody>
                                            {array.map((s)=>{  
                                                return(
                                                    <div>
                                                        <Card>
                                                            <FormGroup check>
                                                            <Label>
                                                            <Input type="checkbox"
                                                                onClick={()=>{checked(s.id);}}
                                                                value={s.id}
                                                            />
                                                            {s.id}{' '}{s.username}
                                                            </Label>
                                                            </FormGroup>
                                                        </Card>
                                                    </div>
                                                )
                                            })}
                                        </ModalBody>
                                        <ModalFooter>
                                            <label>
                                                <input type="checkbox"
                                                    onClick={()=>{selectAll(array)}}
                                                />
                                                SELECT ALL STUDENTS
                                            </label>
                                        <Button color="success" onClick={()=>{studenttoggle();handleStudents()}}>SUBMIT</Button>{' '}
                                        <Button color="danger" onClick={()=>{studenttoggle();}}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>                            
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <br />
                        <InputGroup className="box5">
                            <Input placeholder={QUESTIONS.length>0 ? "TOTAL QUESTIONS  " + QUESTIONS.length : ""} disabled/>
                            <InputGroupAddon addonType="append">
                                <div>
                                    <Button className="btn5" color={QUESTIONS.length>0 ? "success" : "danger"} outline onClick={()=>{toggle();}}>SET QUESTIONS</Button>
                                    <Modal isOpen={modal}  className={className} >
                                        <ModalHeader toggle={toggle}><strong>Q U E S T I O N S</strong></ModalHeader>
                                        <ModalBody>
                                        <InputGroup>
                                            <Input placeholder="NUMBER OF QUESTIONS" type="text" value={ques} onChange={event=>{setQues(event.target.value);}}/>
                                        </InputGroup>
                                        <br />
                                        <Button color="success" outline onClick={()=>{toggleNested();SETTOTALQUESTIONS(ques);}}>SET QUESTIONS</Button>
                                        <Modal isOpen={nestedModal}  onClosed={closeAll ? toggle : undefined} size="lg">
                                            <ModalHeader size="lg">Question Paper</ModalHeader>
                                            <ModalBody size="lg">{MENU(ques)}</ModalBody>
                                            <ModalFooter>
                                            <Button color="success" onClick={()=>{toggleAll();setQuestions(20);}}>SUBMIT</Button>
                                            <Button color="danger" onClick={toggleAll}>CANCEL</Button>
                                            </ModalFooter>
                                        </Modal>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="danger" onClick={toggle}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup className="box6" placeholder={TOTALMARKS>0 ? TOTALMARKS : ""}>
                            <Input value={TOTALMARKS} onChange={event=> SETTOTALMARKS(event.target.value)} type="number"/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn6" color={TOTALMARKS > 0 ? "success" : "danger"} outline  >SET TOTAL MARKS</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <Button className="btn7" color={assign === "ASSIGN" ? "danger" : "success"} onClick={()=>{FINALSUBMIT()}}><strong>{assign}</strong></Button>
                    </FormControl>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default AssignTest