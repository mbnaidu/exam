import React, { useEffect, useState } from 'react'
import { Badge, Jumbotron,Card } from 'reactstrap'
import {Menu,Segment,Sidebar,Table,TableHeader,TableHeaderCell, TableBody,Button, Reveal, Image, CardContent,  Header, Placeholder, Message, ButtonContent, TableCell, Label, TableRow,} from 'semantic-ui-react'
import MenuIcon from '@material-ui/icons/Menu';import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStateValue } from '../../redux/StateProvider';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import "../../styles/AdminProfile.css"

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
    let gaya = 0;
    const [trail,setTrail] = useState([]);
const [selectedButton,setSelectedButton] = useState("");
const [{user}] = useStateValue();
const [subarray,setSubArray] = useState([])
    const [FINAL, SETFINAL] = useState([])
const [SAMPLEARRAY,SETSAMPLEARRAY] = useState([])
const [adminName, setAdminName] = useState("");
const [email, setEmail] = useState("");
const [contactNumber, setContactNumber] = useState("");
const [array,setArray] = useState([]);
const [students,setStudents] = useState([])
const [smodal, setsModal] = useState(false);
const [bmodal, setBModal] = useState(false);
const btoggle = () => setBModal(!bmodal);
const stoggle = () => setsModal(!smodal);
const [viewModal, setViewModal] = useState(false);
const viewModalToggle = () => setViewModal(!viewModal);
const [LISTLENGTH,setLISTLENGHT] = useState([]);
const [questionRender,setQuestionRender] = useState([]);
const [SINGLEQUESTIONS,SETSINGLEQUESTIONS] = useState([]);
const [singlequestions,setsinglequesions] = useState([]);
const [ID,SETID] = useState(0);
const [TESTID,SETTESTID] = useState(0);
const [length,setLength] = useState([]);
const [LENGTH,SETLENGTH] = useState([])
const show = () => {
    {students.map((s)=>{
        LENGTH.push(s.students.length)
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
                        trail[j]=res.data;
                        {res.data.map((r)=>{
                            if(r.testId == s.id){
                                SAMPLEARRAY.push(s.id+"-"+j+"-"+r.marks+"-"+r.isSubmitted);
                            }
                        })}
                    }
                }
            )
            axios.post('http://localhost:3001/getReportCard', {data}).then(
                function(res) {
                    if(res.data.msg) {
                        alert(res.data.msg);
                    } else {
                        subarray[gaya++] = res.data;
                    }
                }
            )
            }
        })}
            </div>
        )
    })}
    LISTLENGTH.push(SAMPLEARRAY.length);
}
    useEffect(()=>{
        {students.map((d)=>{
            const data = {
                "id":d.id,
            }
            axios.post('http://localhost:3001/getQuestions', {data}).then(
                function(res) {
                    if(res.data){
                        {res.data.map((r)=>{
                            SINGLEQUESTIONS.push(r.testId+"-"+r.questId+"-"+r.question+"-"+r.option1+"-"+r.option2+"-"+r.option3+"-"+r.option4+"-"+r.answer )
                            singlequestions[r.testId]=r.questId;
                        })}
                    }
                }
            )
        })}
    },[])

useEffect(() => {
    axios.post('http://localhost:3001/allTests').then(
        function(res) {
            if(res.data.msg) {
                alert(res.data.msg);
            } else {
                questionRender.push(res.data)
                {res.data.map((k)=>{
                    students.push(k);
                    length.push(k.students.length)
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
                    array.push(i);
                })}
            }
        }
    )
}, []);
    const [mmodal, setMModal] = useState(false);
    const mtoggle = () => setMModal(!mmodal);
    const [state, dispatch] = React.useReducer(exampleReducer, {
        animation: 'overlay',
        visible: false,
    })
    const [sample,setSample] = useState([])
    const { animation,direction, visible } = state
    const vertical = direction === 'bottom' || direction === 'top'
    const VerticalSidebar = ({ animation, direction, visible }) => (
        <Sidebar
            color = "blue"
            as={Menu}
            animation={animation}
            direction= "left"
            icon='labeled'
            inverted
            vertical
            visible={visible}
            width='thin'
        >
        <Menu.Item as='a' 
            onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });show()}}>
        <HomeIcon  fontSize="large" 
        />
        <h6>HOME</h6>
        </Menu.Item>
        <Menu.Item as='a' active onClick={() =>
            dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })
        }>
            <PersonIcon  fontSize="large" />
            <h6>PROFILE</h6>
        </Menu.Item>
            <Menu.Item as='a' onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });mtoggle()}}>
            <GroupIcon  fontSize="large" />
            <h6>STUDENTS </h6>
        </Menu.Item>
            <Menu.Item as='a' onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });}}>
            <NavLink to="/adminexam">
            <CreateIcon  fontSize="large" />
            <h6>ADD TEST</h6>
            </NavLink>
        </Menu.Item>
            <Menu.Item as='a' onClick={() => { dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });stoggle();show();}}>
            <CheckCircleIcon />
            <h6>CHECK TESTS</h6>
        </Menu.Item>
        <Menu.Item as='a' >
            <LiveHelpIcon  fontSize="large" />
            <h6>HELP</h6>
        </Menu.Item>
        <Menu.Item as='a' >
            <NavLink to="/">
            <ExitToAppIcon  fontSize="large" />
            <h6>SIGN OUT</h6>
            </NavLink>
        </Menu.Item>
    </Sidebar>
)
        const [singleStudent,SetSingleStudent] = useState([])
        const CALL = (id) =>{
            for(let a in trail[id]) {
                let t = trail[id][a]
                singleStudent.push(`${t.testId}, ${t.marks}, ${t.isSubmitted}`);
            }
        }
    return (
        <div>
            <Button color="primary"
                onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });show()}}>
                <MenuIcon />
            </Button>
        <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' ,height:700}} >
            {!vertical && (
                <VerticalSidebar
                    animation={animation}
                    direction={direction}
                    visible={visible}
                />
            )}
        <Sidebar.Pusher>
            <Segment basic>
                <div>
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
                    <div>
                        <Modal isOpen={viewModal} size="lg">
                            <ModalHeader ><strong>{TESTID}</strong></ModalHeader>
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
                            <Button color="black" onClick={()=>{viewModalToggle();SetSingleStudent([])}}><strong>CANCEL</strong></Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Modal isOpen={bmodal} size="lg" toggle={btoggle} >
                            <ModalHeader ><strong>All Tests</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                            <Card>
                                                <Table  hover bordered responsive>
                                                    {students.map((s)=>{
                                                        return(
                                                            <div>
                                                                <Button fluid color={selectedButton === s.id ? "green" : "blue"} outline={s.id === selectedButton ? false : true} onClick={()=>{SETID(s.id);}}>
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
                                                                        {SAMPLEARRAY.map((mb)=>{
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
                    </div>
                    <div>
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
                                                {array.map((s)=>{
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
                    </div>
                    <div>
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
                                                                    <Button color="success" outline onClick={()=>{btoggle();setSelectedButton(s.id);show()}}>
                                                                        STUDENTS <Badge color="success" >{s.students.length}</Badge>
                                                                    </Button></td>
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
                    </div>
                </div>
            </Segment>
        </Sidebar.Pusher>
    </Sidebar.Pushable>
    </div>
)
}

export default AdminProfile
