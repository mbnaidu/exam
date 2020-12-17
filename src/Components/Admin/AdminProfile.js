import React, { useEffect, useState } from 'react'
import { Badge, Jumbotron,Card,Modal, ModalHeader, ModalBody, ModalFooter,Input, FormGroup, InputGroup, InputGroupAddon, Container, Col} from 'reactstrap'
import {Menu,Segment,Sidebar,Table,TableHeader,TableHeaderCell, TableBody,Button, Reveal, Label,Image, CardContent,  Header, Placeholder, Message, ButtonContent, TableCell, TableRow,} from 'semantic-ui-react'
import { useStateValue } from '../../redux/StateProvider';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
// CSS
    import "../../styles/AdminProfile.css"
// ICONS 
    import MenuIcon from '@material-ui/icons/Menu';
    import PersonIcon from '@material-ui/icons/Person';
    import HomeIcon from '@material-ui/icons/Home';
    import GroupIcon from '@material-ui/icons/Group';
    import CreateIcon from '@material-ui/icons/Create';
    import ExitToAppIcon from '@material-ui/icons/ExitToApp';
    import CheckCircleIcon from '@material-ui/icons/CheckCircle';
    import LiveHelpIcon from '@material-ui/icons/LiveHelp';
    import { FormControl } from '@material-ui/core';
// SIDEBAR ANIMATION
    function exampleReducer(state, action) {
        switch (action.type) {
            case 'CHANGE_ANIMATION':
                return { ...state, animation: action.animation, visible: !state.visible }
            case 'CHANGE_DIRECTION':
                return { ...state, direction: action.direction, visible: false }
            default:
            throw new Error()
        }
    }
function AdminProfile() {
    // 1 (--PROFILE--)
        const [{user}] = useStateValue();
        const [adminName, setAdminName] = useState("");
        const [email, setEmail] = useState("");
        const [contactNumber, setContactNumber] = useState("");
    // 2 (--STUDENTS--)
        // 2.1 (--STUDENT DETAILS--)
            const [mmodal, setMModal] = useState(false);
            const mtoggle = () => setMModal(!mmodal);
            const [allStudentDetails,setAllStudentDetails] = useState([]);
            const [allReportCards,setAllReportCards] = useState([]);
            const CALL = (id) =>{
                for(let a in allReportCards[id]) {
                    let t = allReportCards[id][a]
                    singleStudent.push(`${t.testId}, ${t.marks}, ${t.isSubmitted}`);
                }
            }
        // 2.2 (--REPORT CARD--)
            const [viewModal, setViewModal] = useState(false);
            const viewModalToggle = () => setViewModal(!viewModal);
            const [singleStudent,SetSingleStudent] = useState([]);
            const [TESTID,SETTESTID] = useState(0);
    // 3 (--CHECK TESTS--)
        // 3.1 (--ASSIGNED TESTS--)
            const [smodal, setsModal] = useState(false);
            const stoggle = () => setsModal(!smodal);
            const [students,setStudents] = useState([]);
            const show = () => {
                for(var i=1;i<=students.length;i++){
                    const data = {
                        "id" : i,
                    }
                    axios.post('http://localhost:3001/getQuestions', {data}).then(
                        function(res) {
                            if(res.data){
                                {res.data.map((m)=>{
                                    allQuestions[m.testId] = res.data
                                })}
                            }
                        }
                    )
                }
                {students.map((s)=>{
                    return(
                        <div>
                            {s.students.map((j)=>{
                        if(j !== ""){
                            let data = {
                                "id":j,
                            }
                        axios.post('http://localhost:3001/getReportCard', {data}).then(
                            function(res) {
                                if(res.data.msg) {
                                    alert(res.data.msg);
                                } else {
                                    allReportCards[j]=res.data;
                                    {res.data.map((r)=>{
                                        if(r.testId == s.id){
                                            allTests.push(s.id+"-"+j+"-"+r.marks+"-"+r.isSubmitted);
                                        }
                                    })}
                                }
                            }
                        )
                        }
                    })}
                        </div>
                    )
                })}
                LISTLENGTH.push(allTests.length);
            }
        // 3.2 (--ALL TESTS DETAILS--)
            const [bmodal, setBModal] = useState(false);
            const btoggle = () => setBModal(!bmodal);
            const [allTests,setAllTests] = useState([]);
            const [LISTLENGTH,setLISTLENGHT] = useState([]);
            const [allQuestions,setAllQuestions] = useState([]);
            const ques = (id) =>{
                for(let a in allQuestions[id]){
                    let t = allQuestions[id][a]
                    singleQuestion.push(`${t.questId}, ${t.question}, ${t.subtopic} ,${t.option1}, ${t.option2}, ${t.option3}, ${t.option4}, ${t.answer}`);
                }
            }
        //  3.3 (--SINGLE TEST QUESTION PAPER--)
            const [singleQuestionmodal, setSingleQuestionModal] = useState(false);
            const singleQuestionToggle = () => setSingleQuestionModal(!singleQuestionmodal);
            const [questionId,setQuestionId] = useState(1);
            const [singleQuestion,setSingleQuestion] = useState([]);
            let count = 0;
        // 3.4 (--ASSIGN TEST--)
            const [assignModel, setAssignModel] = useState(false);
            const assignModelToggle = () => setAssignModel(!assignModel);
            // 3.4.1 (--SUBJECT--)
                const [SUBJECT, SETSUBJECT] = useState("");
            // 3.4.2 (--TOPIC--)
                const [TOPIC, SETTOPIC] = useState("");
            // 3.4.3 (--DATE--)
                const [datemodal, setDateModal] = useState(false);
                const datetoggle = () => setDateModal(!datemodal);
                const [FROM, SETFROM] = useState("");
                const [TO, SETTO] = useState("");
            // 3.4.4 (--TIME--)
                const [STARTTIME,SETSTARTTIME] = useState("");
                const [ENDTIME,SETENDTIME] = useState("");
                const [timemodal, setTimeModal] = useState(false);
                const timetoggle = () => setTimeModal(!timemodal);
            // 3.4.5 (--STUDENTS--) 
                const [NEWSTUDENTS, SETNEWSTUDENTS] = useState([]);
                const [studentArray,setStudentArray] = useState([""]);
                const [finalStudents,setfinalStudents] = useState([]);
                const [studentmodal, setStudentModal] = useState(false);
                const studenttoggle = () => setStudentModal(!studentmodal);
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
                    {allStudentDetails.map((a)=>{
                        NEWSTUDENTS.push(a.id);
                    })}
                }
                const handleStudents = () => {
                    for(var i=0;i<studentArray.length;i++){
                        if(studentArray[i]!=""){
                            finalStudents.push(studentArray[i]);
                            NEWSTUDENTS.push(studentArray[i]);
                        }
                    }
                }
            // 3.4.6 (--QUESTIONS--)
                const [modal, setModal] = useState(false);
                const toggle = () => setModal(!modal);
                const [nestedModal, setNestedModal] = useState(false);
                const toggleNested = () => {
                    setNestedModal(!nestedModal);
                    setCloseAll(false);
                }
                const [closeAll, setCloseAll] = useState(false);
                const toggleAll = () => {
                    setNestedModal(!nestedModal);
                    setCloseAll(true);
                }
                const [NEWQUESTION,SETNEWQUESTION] = useState([]);
            // 3.4.7 (--TOTAL MARKS--)
                const [TOTALMARKS, SETTOTALMARKS] = useState();
            // 3.4.8 (--SUBMIT--)
                const [assign,setAssign] = useState("assign");
                const FINALSUBMIT = () => {        
                    if(SUBJECT!="" && TOPIC!="" && FROM!="" && TO!="" && NEWSTUDENTS!="" && NEWQUESTION!="" && TOTALMARKS>0 && STARTTIME!="" && ENDTIME!="" ){
                        viewModalToggle();
                        setAssign("ASSIGNED")
                        const data = {
                            "subject":SUBJECT,
                            "topic":TOPIC,
                            "from":FROM,
                            "to":TO,
                            "starttime":STARTTIME,
                            "endtime":ENDTIME,
                            "students": NEWSTUDENTS,
                            "questions":NEWQUESTION,
                            "total":TOTALMARKS,
                        }
                        axios.post('http://localhost:3001/addTest', {data}).then(
                            function(res) {
                                if(res.data) {
                                }
                            }
                        )
                    }
                }
    // USEEFFECT
        useEffect(() => {
            axios.post('http://localhost:3001/allTests').then(
                function(res) {
                    if(res.data.msg) {
                        alert(res.data.msg);
                    } else {
                        {res.data.map((k)=>{
                            students.push(k);
                        })}
                    }
                }
            )
            const data = {
                "username":user.username,
            }
            axios.post('http://localhost:3001/studentDetails',{data}).then(
                function(res) {
                    if(res.data.msg) {
                        alert(res.data.msg);
                    } else {
                        {res.data.map((i)=>{
                            setAdminName(i.username);
                            setEmail(i.email);
                            setContactNumber(i.contact);
                        })}
                    }
                }
            )
            axios.post('http://localhost:3001/allStudents').then(
                function(res) {
                    if(res.data.msg) {
                        alert(res.data.msg);
                    } else {
                        {res.data.map((i)=>{
                            allStudentDetails.push(i);
                        })}
                    }
                }
            )
        }, []);
    // SIDE BAR SETTINGS
        const [state, dispatch] = React.useReducer(exampleReducer, {animation: 'overlay',visible: false,})
        const { animation,direction, visible } = state
        const vertical = direction === 'bottom' || direction === 'top'
    // SIDE BAR ICONS
        const VerticalSidebar = ({ animation, direction, visible }) => (
            <Sidebar  color = "blue" as={Menu} animation={animation} direction= "left" icon='labeled' inverted vertical visible={visible} width='thin'>
            {/* HOME */}
                <Menu.Item as='a' onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });show();}}><HomeIcon  fontSize="large" />
                    <h6>HOME</h6>
                </Menu.Item>
            {/* PROFILE */}
                <Menu.Item as='a' active onClick={() =>dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}><PersonIcon  fontSize="large" />
                    <h6>PROFILE</h6>
                </Menu.Item>
            {/* STUDENTS */}
                <Menu.Item as='a' onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });mtoggle()}}><GroupIcon  fontSize="large" />
                    <h6>STUDENTS </h6>
                </Menu.Item>
            {/* ADD TEST */}
                <Menu.Item as='a' onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });}}><NavLink to="/adminexam"><CreateIcon  fontSize="large" />
                    <h6>ADD TEST</h6></NavLink>
                </Menu.Item>
            {/* CHECK TESTS */}
                <Menu.Item as='a' onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });stoggle();show();}}><CheckCircleIcon />
                    <h6>CHECK TESTS</h6>
                </Menu.Item>
            {/* HELP */}
                <Menu.Item as='a' ><LiveHelpIcon  fontSize="large" />
                    <h6>HELP</h6>
                </Menu.Item>
            {/* SIGN OUT */}
                <Menu.Item as='a' ><NavLink to="/"><ExitToAppIcon  fontSize="large" />
                    <h6>SIGN OUT</h6></NavLink>
                </Menu.Item>
        </Sidebar>
)
    return (
        <div>
            {/* MENU BOTTON */}
                <button className="ui inverted primary button lg"
                    onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });show()}}>
                    <MenuIcon />
                </button>
            {/* SIDE BAR */}
                <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' ,height:700}} >
                    {!vertical && (<VerticalSidebar animation={animation} direction={direction} visible={visible}/>)}
                <Sidebar.Pusher>
                    <Segment basic>
                        <div>
                            {/* 1 (--PROFILE--)  */}
                                    <Card className="admin_card" color="blue">
                                            <Placeholder fluid > 
                                                <Reveal animated='rotate' className="m-5">
                                                    <Reveal.Content visible>
                                                    <Image circular size='small' src='https://react.semantic-ui.com/images/wireframe/square-image.png' centered/>
                                                    </Reveal.Content>
                                                    <Reveal.Content hidden>
                                                    <Image circular size='small'  src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
                                                    </Reveal.Content>
                                                </Reveal>
                                                <CardContent>
                                                    <Header className="m-5" color="grey" id="admin">Admin : {adminName.toUpperCase()}</Header>
                                                    <Header className="m-5" color="grey" id="email">E-Mail : {email.toUpperCase()}</Header>
                                                    <Header className="m-5" color="grey" id="contact">Contact Number : {contactNumber}</Header>
                                                </CardContent>
                                            </Placeholder>
                                        </Card>
                            {/* 2 (--STUDENTS--) */}
                                {/* 2.1 (--STUDENT DETAILS--) */}
                                    <Modal isOpen={mmodal} size="lg" toggle={mtoggle} >
                                                <Header color="blue" className="pl-3 pt-5"><strong>STUDENT DETAILS</strong></Header>
                                                    <ModalBody>
                                                            <Message >
                                                                <Card >
                                                                <Table celled color="blue">
                                                                    <TableHeader>
                                                                    <TableRow>
                                                                        <TableHeaderCell>ID</TableHeaderCell>
                                                                        <TableHeaderCell>USERNAME</TableHeaderCell>
                                                                        <TableHeaderCell>E-MAIL</TableHeaderCell>
                                                                        <TableHeaderCell>CONTACT NUMBER</TableHeaderCell>
                                                                    </TableRow>
                                                                    </TableHeader>
                                                                    {allStudentDetails.map((s)=>{
                                                                            return(
                                                                                <TableBody>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                <Label ribbon color="blue" as="button" onClick={()=>{viewModalToggle();SETTESTID(s.id);CALL(s.id)}}>{s.id}</Label>
                                                                                </TableCell>
                                                                                <TableCell>{s.username}</TableCell>
                                                                                <TableCell>{s.email}</TableCell>
                                                                                <TableCell>{s.contact}</TableCell>
                                                                            </TableRow>
                                                                            </TableBody>
                                                                            )
                                                                    })}
                                                                </Table>
                                                                </Card>
                                                            </Message>
                                                        </ModalBody>
                                                <ModalFooter>
                                                            <Button color="blue" onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });mtoggle();}}><strong>CANCEL</strong></Button>{' '}
                                                </ModalFooter>
                                            </Modal>
                                {/* 2.2 (--REPORT CARD--) */}
                                    <Modal isOpen={viewModal} size="lg">
                                                    <ModalHeader ><strong>REPORT CARD --- {TESTID}</strong></ModalHeader>
                                                        <ModalBody>
                                                                <div>
                                                                    <Card>
                                                                        <Table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>
                                                                                        TEST ID'S
                                                                                    </th>
                                                                                    <th>
                                                                                        MARKS
                                                                                    </th>
                                                                                    <th>
                                                                                        STATUS
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                        {singleStudent.map((m)=>{
                                                                            let d = m.split(",")
                                                                            return(
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>{d[0]}</td>
                                                                                        <td>{d[1]}</td>
                                                                                        <td>{d[2]}</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            )
                                                                        })}
                                                                        </Table>
                                                                    </Card>
                                                                </div>
                                                            </ModalBody>
                                                    <ModalFooter>
                                                    <button className="ui inverted black button lg"  onClick={()=>{viewModalToggle();SetSingleStudent([])}}><strong>CANCEL</strong></button>{' '}
                                                    </ModalFooter>
                                                </Modal>
                            {/* 3 (--CHECK TESTS--) */}
                                {/* 3.1 (--ASSIGNED TESTS--) */}
                                    <Modal isOpen={smodal} size="lg" toggle={stoggle}>
                                            <Header color="green" className="pt-3 pl-3" ><strong>Assigned Tests</strong></Header>
                                                <ModalBody>
                                                        <Message color="green">
                                                            <Card>
                                                                <Table  hover bordered responsive>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>TEST ID</th>
                                                                            <th>START DATE</th>
                                                                            <th>LAST DATE</th>
                                                                            <th>SUBJECT</th>
                                                                            <th>TOPIC</th>
                                                                            <th>STUDENTS</th>
                                                                            <th>TOTAL MARKS</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {students.map((s)=>{
                                                                        var FROM = s.from;
                                                                        var TO = s.to;
                                                                        var d1 = FROM.split("-");
                                                                        var d2 = TO.split("-");
                                                                        return(
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>{s.id}</td>
                                                                                <td>{d1[2]+"/"+d1[1]+"/"+d1[0]}</td>
                                                                                <td>{d2[2]+"/"+d2[1]+"/"+d2[0]}</td>
                                                                                <td>{s.subject}</td>
                                                                                <td>{s.topic}</td>
                                                                                <td>
                                                                                    <button classMame="ui inverted green button lg" onClick={()=>{btoggle();show()}}>STUDENTS<Badge inverted color="grey" >{s.students.length}</Badge></button>
                                                                                </td>
                                                                                <td>{s.total}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                        )
                                                                    })}
                                                                </Table>
                                                            </Card>
                                                        </Message>
                                                    </ModalBody>
                                            <ModalFooter>
                                                        <Button color="green" onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });stoggle();}}><strong>CANCEL</strong></Button>{' '}
                                            </ModalFooter>
                                        </Modal>
                                {/* 3.2 (--ALL TESTS DETAILS--) */}
                                    <Modal isOpen={bmodal} size="lg" toggle={btoggle} >
                                                <ModalHeader ><strong>All Tests</strong></ModalHeader>
                                                    <ModalBody>
                                                            <div>
                                                                <Card>
                                                                    <Table  hover bordered responsive>
                                                                        {students.map((s)=>{
                                                                            return(
                                                                                <div>
                                                                                    <Button fluid color="blue" onClick={()=>{setQuestionId(s.id);singleQuestionToggle();ques(s.id)}}>
                                                                                        TEST ID : {s.id}
                                                                                    </Button>
                                                                                    <Jumbotron>
                                                                                        <Table hover bordered responsive>
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>DEATILS</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                {s.students.map((j)=>{
                                                                                    var babu = 0;
                                                                                    return(
                                                                                        <div>
                                                                                            {allTests.map((mb)=>{
                                                                                                babu++;
                                                                                                var check =mb;
                                                                                                var d1 = check.split("-");
                                                                                                if(d1[1] == j && d1[0]==s.id && babu <= LISTLENGTH[1]){
                                                                                                    return(
                                                                                                        <tr>
                                                                                                            <td>{"ID : "+j}</td>
                                                                                                            <td>{"MARKS : "+d1[2]}</td>
                                                                                                            <td>
                                                                                                                <Button animated="vertical" inverted color={d1[3]=== "true" ? "green" : "red"} >
                                                                                                                    { d1[3] == "true" ? (<div>
                                                                                                                        <ButtonContent visible>SUBMITTED</ButtonContent>
                                                                                                                        <ButtonContent hidden>12-02-2020</ButtonContent>
                                                                                                                    </div>) : (
                                                                                                                        <div>
                                                                                                                            <ButtonContent visible >NOT SUBMIITED</ButtonContent>
                                                                                                                            <ButtonContent hidden ><Button loading></Button></ButtonContent>
                                                                                                                        </div>
                                                                                                                    )}
                                                                                                                </Button>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    )
                                                                                                }
                                                                                            })}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                                            </tbody>
                                                                                        </Table>
                                                                                    </Jumbotron>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </Table>
                                                                </Card>
                                                            </div>
                                                        </ModalBody>
                                                <ModalFooter>
                                                            <Button color="blue" onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });btoggle();}}><strong>CANCEL</strong></Button>{' '}
                                                </ModalFooter>
                                            </Modal>
                                {/* 3.3 (--SINGLE TEST QUESTION PAPER--) */}
                                    <Modal isOpen={singleQuestionmodal} size="lg"  >
                                                    <ModalHeader ><strong>{questionId}</strong></ModalHeader>
                                                        <ModalBody>
                                                                <div>
                                                                    <Card>
                                                                        {singleQuestion.map((m)=>{
                                                                            count = count+1;
                                                                            let d1 = m.split(",");
                                                                            return(
                                                                            <div>
                                                                                <Jumbotron>
                                                                                <div class="ui checkbox">
                                                                                    <input type="checkbox" name="example" onClick={()=>{NEWQUESTION.push(m)}}/>
                                                                                    <label>{count} Question</label>
                                                                                </div>
                                                                                <Input value={d1[1]}/>
                                                                                <Label>
                                                                                    Topic
                                                                                </Label>
                                                                                <Input value={d1[2]}/>
                                                                                <Label>
                                                                                    Options
                                                                                </Label>
                                                                                <Input value={d1[3]}/>
                                                                                <Input value={d1[4]}/>
                                                                                <Input value={d1[5]}/>
                                                                                <Input value={d1[6]}/>
                                                                                <Label>
                                                                                    Answer
                                                                                </Label>
                                                                                <Input value={d1[7]}/>
                                                                            </Jumbotron>
                                                                            </div>
                                                                            )
                                                                        })}
                                                                    </Card>
                                                                </div>
                                                            </ModalBody>
                                                    <ModalFooter>
                                                                <Button color="blue" onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });assignModelToggle()}}><strong>ASSIGN</strong></Button>{' '}
                                                                <Button color="blue" onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });singleQuestionToggle();setSingleQuestion([])}}><strong>CANCEL</strong></Button>{' '}
                                                    </ModalFooter>
                                                </Modal>
                                {/* 3.4 (--ASSIGN TEST--) */}
                                    <Modal isOpen={assignModel} size="lg"  >
                                                    <ModalHeader ><strong>ASSIGNING TEST</strong></ModalHeader>
                                                    <ModalBody>
                                                            <div>
                                                                <Jumbotron >
                                                                    <Container >
                                                                        <FormControl >
                                                                            {/* 3.4.1 (--SUBJECT--) */}
                                                                                <InputGroup className="box1">
                                                                                <Input  value={SUBJECT} onChange={event=> SETSUBJECT(event.target.value)}/>
                                                                                <InputGroupAddon addonType="append">
                                                                                        <Button className="btn1 "  color={SUBJECT.length>0 ? "green" : "red"} outline >SET SUBJECT</Button>
                                                                                </InputGroupAddon>
                                                                            </InputGroup>
                                                                                <br />
                                                                            {/* 3.4.2 (--TOPIC--) */}
                                                                                <InputGroup className="box2">
                                                                                <Input value={TOPIC} onChange={event=> SETTOPIC(event.target.value)}/>
                                                                                <InputGroupAddon addonType="append">
                                                                                    <Button className="btn2" color={TOPIC.length>0 ? "green" : "red"} outline  >SET TOPIC </Button>
                                                                                </InputGroupAddon>
                                                                            </InputGroup>
                                                                                <br />
                                                                            {/* 3.4.3 (--DATE--) */}
                                                                                <InputGroup className="box3">
                                                                                    <Input placeholder={FROM.length>0 || TO.length >0 ? FROM+"      TO      "+TO : ""} disabled/>
                                                                                    <InputGroupAddon addonType="append">
                                                                                        <Button className="btn3" color={FROM.length>0 && TO.length>0 ? "green" : "red"} outline onClick={()=>{datetoggle();}} >SET DATE</Button>
                                                                                        <Modal isOpen={datemodal}  >
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
                                                                                <br />
                                                                            {/* 3.4.4 (--TIME--) */}
                                                                                <InputGroup className="box6">
                                                                                    <Input placeholder={STARTTIME.length>0 || ENDTIME.length>0 ? STARTTIME+"     TO    "+ENDTIME : ""} disabled/>
                                                                                    <InputGroupAddon addonType="append">
                                                                                        <Button className="btn3" color={STARTTIME.length>0 && ENDTIME.length>0 ? "green" : "red"} outline onClick={()=>{timetoggle();}} >SET TIME</Button>
                                                                                        <Modal isOpen={timemodal} >
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
                                                                                <br/>
                                                                            {/* 3.4.5 (--STUDENTS--) */}
                                                                                <InputGroup className="box4">
                                                                                    <Input placeholder={NEWSTUDENTS.length>0 ? NEWSTUDENTS.length : ""} disabled/>
                                                                                    <InputGroupAddon addonType="append">
                                                                                        <Button className="btn4" color={NEWSTUDENTS.length>0 ? "green" : "red"} outline onClick={()=>{studenttoggle();}}>SELECT STUDENTS</Button>
                                                                                        <Modal isOpen={studentmodal}  >
                                                                                            <ModalHeader ><strong>S T U D E N T S</strong></ModalHeader>
                                                                                            <ModalBody>
                                                                                                {allStudentDetails.map((s)=>{  
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
                                                                                                        onClick={()=>{selectAll(allStudentDetails)}}
                                                                                                    />
                                                                                                    SELECT ALL STUDENTS
                                                                                                </label>
                                                                                            <Button color="green" onClick={()=>{studenttoggle();handleStudents()}}>SUBMIT</Button>{' '}
                                                                                            <Button color="red" onClick={()=>{studenttoggle();}}>Cancel</Button>
                                                                                            </ModalFooter>
                                                                                        </Modal>                            
                                                                                    </InputGroupAddon>
                                                                                </InputGroup>
                                                                                <br />
                                                                            {/* 3.4.6 (--QUESTIONS--) */}
                                                                                <InputGroup className="box5">
                                                                                    <Input  disabled/>
                                                                                    <InputGroupAddon addonType="append">
                                                                                        <div>
                                                                                            <Button className="btn5"  onClick={()=>{toggle();}}>SET QUESTIONS</Button>
                                                                                            <Modal isOpen={modal}   >
                                                                                                <ModalHeader toggle={toggle}><strong>Q U E S T I O N S</strong></ModalHeader>
                                                                                                <ModalBody>
                                                                                                <InputGroup>
                                                                                                    <Input placeholder="NUMBER OF QUESTIONS" type="text"/>
                                                                                                </InputGroup>
                                                                                                <br />
                                                                                                <Button color="green" outline onClick={()=>{toggleNested();}}>SET QUESTIONS</Button>
                                                                                                <Modal isOpen={nestedModal}  onClosed={closeAll ? toggle : undefined} size="lg">
                                                                                                    <ModalHeader size="lg">Question Paper</ModalHeader>
                                                                                                    <ModalBody size="lg">
                                                                                                        {NEWQUESTION.map((m)=>{
                                                                                                            let d1 = m.split(",");
                                                                                                            return(
                                                                                                                <div>
                                                                                                                    <Jumbotron>
                                                                                                                                    <Label>{count} Question</Label>
                                                                                                                                <Input value={d1[1]}/>
                                                                                                                                <Label>
                                                                                                                                    Topic
                                                                                                                                </Label>
                                                                                                                                <Input value={d1[2]}/>
                                                                                                                                <Label>
                                                                                                                                    Options
                                                                                                                                </Label>
                                                                                                                                <Input value={d1[3]}/>
                                                                                                                                <Input value={d1[4]}/>
                                                                                                                                <Input value={d1[5]}/>
                                                                                                                                <Input value={d1[6]}/>
                                                                                                                                <Label>
                                                                                                                                    Answer
                                                                                                                                </Label>
                                                                                                                                <Input value={d1[7]}/>
                                                                                                                            </Jumbotron>
                                                                                                                </div>
                                                                                                            )
                                                                                                        })}
                                                                                                    </ModalBody>
                                                                                                    <ModalFooter>
                                                                                                    <Button color="green" onClick={()=>{toggleAll();}}>SUBMIT</Button>
                                                                                                    <Button color="red" onClick={toggleAll}>CANCEL</Button>
                                                                                                    </ModalFooter>
                                                                                                </Modal>
                                                                                                </ModalBody>
                                                                                                <ModalFooter>
                                                                                                <Button color="red" onClick={toggle}>Cancel</Button>
                                                                                                </ModalFooter>
                                                                                            </Modal>
                                                                                        </div>
                                                                                    </InputGroupAddon>
                                                                                </InputGroup>
                                                                                <br />
                                                                            {/* 3.4.7 (--TOTAL MARKS--) */}
                                                                                <InputGroup className="box6" placeholder={TOTALMARKS>0 ? TOTALMARKS : ""}>
                                                                                    <Input value={TOTALMARKS} onChange={event => SETTOTALMARKS(event.target.value)} type="number" />  
                                                                                        <InputGroupAddon addonType="append">
                                                                                        <Button className="btn6" color={TOTALMARKS > 0 ? "green" : "red"} outline  >SET TOTAL MARKS</Button>
                                                                                    </InputGroupAddon>
                                                                                </InputGroup>
                                                                                <br />
                                                                        </FormControl>
                                                                    </Container>
                                                                </Jumbotron>
                                                            </div>
                                                        </ModalBody>
                                                        {/* 3.4.8 (--SUBMIT--) */}
                                                    <ModalFooter>
                                                        <Button onClick={()=>{FINALSUBMIT()}} color={assign == assign ? "red" : "green"}>{assign}</Button>
                                                        <Button color="blue" onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });assignModelToggle();}}><strong>CANCEL</strong></Button>{' '}
                                                    </ModalFooter>
                                                </Modal>
                        </div>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
)
}
export default AdminProfile
