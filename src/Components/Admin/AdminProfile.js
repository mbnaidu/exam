import React, { useEffect, useState } from 'react'
import { Card, Table,Badge, Jumbotron } from 'reactstrap'
import {Menu,Segment,Sidebar, TableBody,Button} from 'semantic-ui-react'
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
    let madhu = 0;
const [selectedButton,setSelectedButton] = useState("");
const [{user}] = useStateValue();
const [FINALARRAY,SETFINALARRAY] = useState([])
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
const show = () => {
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
                        {res.data.map((r)=>{
                            if(r.testId == s.id){
                                SAMPLEARRAY.push(s.id+"-"+j+"-"+r.marks+"-"+r.isSubmitted);
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
    LISTLENGTH.push(SAMPLEARRAY.length);
}
useEffect(() => {
    axios.post('http://localhost:3001/allTests').then(
        function(res) {
            if(res.data.msg) {
                alert(res.data.msg);
            } else {
                questionRender.push(res.data)
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
        <Menu.Item as='a' onClick={mtoggle}>
            <GroupIcon  fontSize="large" />
            <h6>STUDENTS </h6>
        </Menu.Item>
        <Menu.Item as='a' >
            <NavLink to="/adminexam">
            <CreateIcon  fontSize="large" />
            <h6>ADD TEST</h6>
            </NavLink>
        </Menu.Item>
        <Menu.Item as='a' onClick={()=>{stoggle();show()}}>
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
    return (
        <div>
            <Button color="primary"
                onClick={() =>
                dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}>
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
        <Sidebar.Pusher >
            <Segment basic>
                <div>
                    <div>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>ADMINS</th>
                                        <th>E-MAIL</th>
                                        <th>CONTACT NUMBER</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr>
                                            <td>{adminName}</td>
                                            <td>{email}</td>
                                            <td>{contactNumber}</td>
                                        </tr>
                                    </tbody>
                            </Table>
                        </Card>
                    </div>
                    <div>
                        <Modal isOpen={viewModal} size="lg" toggle={viewModalToggle} >
                            <ModalHeader ><strong>TEST DETAILS</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                            <Card>
                                                {SINGLEQUESTIONS.map((q)=>{
                                                    var babu=0;
                                                    console.log(singlequestions[ID])
                                                    var Q = q;
                                                    var d1 = Q.split("-");
                                                    if(d1[0] == ID ){
                                                        for(var i=0;i<=singlequestions[ID];i++){
                                                            babu++;
                                                            if(babu<singlequestions[ID]){
                                                                return(
                                                                    <div>
                                                                        {d1[1]}
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                    }
                                                })}
                                            </Card>
                                        </div>
                                    </ModalBody>
                            <ModalFooter>
                            <Button color="black" onClick={()=>{viewModalToggle();}}><strong>CANCEL</strong></Button>{' '}
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
                                                                <Button fluid color={selectedButton === s.id ? "green" : "blue"} outline={s.id === selectedButton ? false : true} onClick={()=>{viewModalToggle();SETID(s.id)}}>
                                                                    TEST ID : {s.id}
                                                                </Button>
                                                                <Jumbotron>
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
                                                                                    <Table hover bordered responsive>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th>ID</th>
                                                                                                <th>MARKS</th>
                                                                                                <th>STATUS</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td>{j}</td>
                                                                                                <td>{d1[2]}</td>
                                                                                                <td>
                                                                                                    <Button color={d1[3]==="true" ? "green" : "red"}>{d1[3] === "true" ? "SUBMITTED" : "NOT SUBMITTED"}</Button>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </Table>
                                                                                )
                                                                            }
                                                                        })}
                                                                    </div>
                                                                )
                                                            })}
                                                                </Jumbotron>
                                                            </div>
                                                        )
                                                    })}
                                                </Table>
                                            </Card>
                                        </div>
                                    </ModalBody>
                            <ModalFooter>
                                <Button color="black" onClick={()=>{btoggle();}}><strong>CANCEL</strong></Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Modal isOpen={mmodal} size="lg" toggle={mtoggle} >
                            <ModalHeader ><strong>STUDENT DETAILS</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                            <Card>
                                                <Table  hover bordered responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>USERNAME</th>
                                                            <th>E-MAIL</th>
                                                            <th>CONTACT NUMBER</th>
                                                        </tr>
                                                    </thead>
                                                    {array.map((s)=>{
                                                        return(
                                                        <tbody>
                                                            <tr>
                                                                <td>{s.id}</td>
                                                                <td>{s.username}</td>
                                                                <td>{s.email}</td>
                                                                <td>{s.contact}</td>
                                                            </tr>
                                                        </tbody>
                                                        )
                                                    })}
                                                </Table>
                                            </Card>
                                        </div>
                                    </ModalBody>
                            <ModalFooter>
                            <Button color="black" onClick={()=>{mtoggle();}}><strong>CANCEL</strong></Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Modal isOpen={smodal} size="lg" toggle={stoggle}>
                            <ModalHeader ><strong>Assigned Tests</strong></ModalHeader>
                                <ModalBody>
                                        <div>
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
                                                                <td>{d1[2]+"-"+d1[1]+"-"+d1[0]}</td>
                                                                <td>{d2[2]+"-"+d2[1]+"-"+d2[0]}</td>
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
                                        </div>
                                    </ModalBody>
                            <ModalFooter>
                            <Button color="black" onClick={()=>{stoggle();}}><strong>CANCEL</strong></Button>{' '}
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
