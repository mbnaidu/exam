import React, { useState } from 'react';
import { Button,Input, InputGroup, InputGroupAddon, Container, Jumbotron, FormGroup, Col } from 'reactstrap';
import '../styles/Test.css'
import {  FormControl } from '@material-ui/core';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Test(props) {
    const [SUBJECT, SETSUBJECT] = useState("");
    const [TOPIC, SETTOPIC] = useState("");
    const [FROM, SETFROM] = useState("");
    const [TO, SETTO] = useState("");
    const [STUDENTS, SETSTUDENTS] = useState([]);
    const [QUESTIONS, SETQUESIONS] = useState([]);
    const [TOTALMARKS, SETTOTALMARKS] = useState(0);
    const [TOTALQUESTIONS,SETTOTALQUESTIONS]=useState(10);
    const FINALSUBMIT = () => {
        console.log(SUBJECT);
        console.log(TOPIC);
        console.log(FROM);
        console.log(TO);
        console.log(STUDENTS);
        console.log(QUESTIONS);
        console.log(TOTALMARKS);
        
    }
    const{
        className
    } = props;
    const studentslist = [
        {sno:"1",id:"1201",name:"student1",password:"1",email:"student1@gmail.com",contactnumber:"232654563",isChecked:false},
        {sno:"2",id:"1202",name:"student2",password:"2",email:"student2@gmail.com",contactnumber:"562654563",isChecked:false},
        {sno:"3",id:"1203",name:"student3",password:"3",email:"student3@gmail.com",contactnumber:"722654563",isChecked:false},
        {sno:"4",id:"1204",name:"sudent4",password:"4",email:"student4@gmail.com",contactnumber:"452654563",isChecked:false},
    ]
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
    const called = (c) => {
        console.log(c);
    }
    const [smodal, setSModal] = useState(false);
  const stoggle = () => setSModal(!smodal);
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
    const [a,setA] = useState("danger");
    const [b,setB] = useState("danger");
    const [c,setC] = useState("danger");
    const [d,setD] = useState("danger");
    const [e,setE] = useState("danger");
    const [f,setF] = useState("danger");
    const [g,setG] = useState("danger");
    const [h,setH] = useState("danger");
    const array = (full) => {
        console.log(full)
    }
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
    const [fmodal, setFModal] = useState(false);
    const ftoggle = () => setFModal(!fmodal);
    const submit = (event)=>{
        if(subject!="" && topic!="" && date!="" && timings!="" && students!="" && questions!="" && totalMarks!=""){
            setAssign("ASSIGNED");setA("success");setB("success");setC("success");setD("success");setE("success");setF("success");setG("success");setH("success");
        }
    }
    const [isOpen, setIsOpen] = useState(false);
    var kp;
    const MENU = (p) => {
        let input0;
        let input1 ;
        let input2 ;
        let input3;
        let input4 ;
        let answer ;
        let store0 = [];
        let store1 = [];
        let store2 = [];
        let store3 = [];
        let store4 = [];
        let full = [];
        const adding=()=>{
            if(store3!="" && store2!="" && store1!="" && store4!="" && store0!="" && answer!=""){
                full.push(store0[store0.length-1]);
                full.push(store1[store1.length-1]);
                full.push(store2[store2.length-1]);
                full.push(store3[store3.length-1]);
                full.push(store4[store4.length-1]);
                full.push(answer);
            }
        }
        const calling0 = (z)=>{if(z!="" && z!="undefined"){store0.push(z);}}
        const calling1 = (y)=>{if(y!="" && y!="undefined"){store1.push(y)}}
        const calling2 = (x)=>{if(x!="" && x!="undefined"){store2.push(x);}}
        const calling3 = (u)=>{if(u!="" && u!="undefined"){store3.push(u);}}
        const calling4 = (v)=>{if(v!="" && v!="undefined"){store4.push(v);}}
        const calling5 = (w)=>{if(w!="" && w!="undefined"){answer=w;}}
        return(
            <div>
                <ul>{Array.from(Array(5), (e, i) =>{
                        return(
                            <li key={i}>
                              <FormGroup row>
                                <Col sm={12}>
                                    {i+1}<Input placeholder="QUESTION" value={input0} onChange={event=> calling0(event.target.value)}/>
                                </Col>
                                <Col sm={6}>
                                    <div>
                                        <Input placeholder="OPTION 1" type="text" value={input1}   onChange={event=> calling1(event.target.value)}/>
                                        <Input placeholder="OPTION 2" type="text" value={input2}   onChange={event=> calling2(event.target.value)}/>
                                        <Input placeholder="OPTION 3" type="text" value={input3}   onChange={event=> calling3(event.target.value)}/>
                                        <Input placeholder="OPTION 4" type="text" value={input4}   onChange={event=> calling4(event.target.value)}/>
                                        <Input placeholder="SELECT CORRECT OPTION" min={0} max={4} type="number" step="1" value={answer} onChange={event=> calling5(event.target.value)}/>
                                        <Button onClick={()=>{adding();handleQuestions(full,i)}} color="success">CHECK</Button>
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
    const selectAll = (s) => {
        s.forEach(i => {
            finalStudents.push(i.id);
            STUDENTS.push(i.id);
        });
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
    const [startDate, setStartDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());
    return (
        <div>
           <Jumbotron fluid className="set">
                <Container >
                    <FormControl >
                        <InputGroup className="box1">
                            <Input  value={SUBJECT} onChange={event=> SETSUBJECT(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                    <Button className="btn1 "  color={a} outline onClick={()=>change()}>SET SUBJECT</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <InputGroup className="box2">
                            <Input value={TOPIC} onChange={event=> SETTOPIC(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn2" color={b} outline onClick={()=>change()} >SET TOPIC </Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <div>
                            <InputGroup className="box3">
                                <Input placeholder={startDate}/>
                                <InputGroupAddon addonType="append">
                                    <Button className="btn3" color={c} outline onClick={()=>{change();ftoggle();}} >SET DATE</Button>
                                    <Modal isOpen={fmodal}  className={className} size="lg">
                                        <ModalHeader toggle={ftoggle}><strong>T I M E</strong></ModalHeader>
                                        <ModalBody  size="lg">
                                        <div>
                                            <InputGroup>
                                                <Input  value={startDate} />
                                                    <InputGroupAddon addonType="append">
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={date1 => {setStartDate(date1);}}
                                                            showTimeSelect
                                                            timeFormat="HH:mm"
                                                            dateFormat="MMMM d, yyyy h:mm aa"
                                                        />
                                                    </InputGroupAddon>
                                            </InputGroup>
                                            <InputGroup>
                                                <Input  value={lastDate} />
                                                    <InputGroupAddon addonType="append">
                                                        <DatePicker
                                                            selected={lastDate}
                                                            onChange={date1 => {setLastDate(date1);}}
                                                            showTimeSelect
                                                            timeFormat="HH:mm"
                                                            dateFormat="MMMM d, yyyy h:mm aa"
                                                        />
                                                    </InputGroupAddon>
                                            </InputGroup>
                                        </div>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="primary" onClick={()=>{SETFROM(startDate);SETTO(lastDate);ftoggle();}}>SET DATE</Button>{' '}
                                        <Button color="secondary" onClick={ftoggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <br />
                        <div>
                            <InputGroup className="box4">
                                <Input />
                                <InputGroupAddon addonType="append">
                                    <Button className="btn4" color={e} outline onClick={()=>{change();stoggle();}}>SELECT STUDENTS</Button>
                                    <Modal isOpen={smodal}  className={className}>
                                        <ModalHeader toggle={stoggle}><strong>S T U D E N T S</strong></ModalHeader>
                                        <ModalBody>
                                            {studentslist.map((s)=>{                                             
                                                return(
                                                    <div>
                                                        <FormGroup check>
                                                        <label>
                                                        <input type="checkbox"
                                                            onClick={()=>{checked(s.id);}}
                                                            value={s.id}
                                                        />
                                                        {s.id}{' '}{s.name}
                                                        </label>
                                                        </FormGroup>
                                                    </div>
                                                )
                                            })}
                                        </ModalBody>
                                        <ModalFooter>
                                            <label>
                                                <input type="checkbox"
                                                    onClick={()=>{selectAll(studentslist)}}
                                                />
                                                SELECT ALL STUDENTS
                                            </label>
                                        <Button color="success" onClick={()=>{stoggle();change();handleStudents();}}>SUBMIT</Button>{' '}
                                        <Button color="danger" onClick={stoggle}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>                            
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <br />
                        <InputGroup className="box5">
                            <Input />
                            <InputGroupAddon addonType="append">
                                <div>
                                    <Button className="btn5" color={f} outline onClick={()=>{toggle();change();}}>SET QUESTIONS</Button>
                                    <Modal isOpen={modal}  className={className} >
                                        <ModalHeader toggle={toggle}><strong>Q U E S T I O N S</strong></ModalHeader>
                                        <ModalBody>
                                        <InputGroup>
                                            <Input placeholder="NUMBER OF QUESTIONS" min={0} max={100} type="number" step="5" value={ques} onChange={event=>{setQues(event.target.value);}}/>
                                        </InputGroup>
                                        <br />
                                        <Button color="success" outline onClick={()=>{toggleNested();SETTOTALQUESTIONS(ques);}}>SET QUESTIONS</Button>
                                        <Modal isOpen={nestedModal}  onClosed={closeAll ? toggle : undefined} size="lg">
                                            <ModalHeader size="lg">Question Paper</ModalHeader>
                                            <ModalBody size="lg">{MENU(ques)}</ModalBody>
                                            <ModalFooter>
                                            <Button color="success" onClick={()=>{toggleAll();change();setQuestions(20);}}>SUBMIT</Button>
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
                        <InputGroup className="box6">
                            <Input value={TOTALMARKS} onChange={event=> SETTOTALMARKS(event.target.value)}/>
                            <InputGroupAddon addonType="append">
                                <Button className="btn6" color={g} outline onClick={()=>change()} >SET TOTAL MARKS</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <br />
                        <Button className="btn7" color={h} onClick={()=>{submit();FINALSUBMIT()}}><strong>{assign}</strong></Button>
                    </FormControl>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Test
