import React, { useEffect, useState } from 'react'
import { Card, Jumbotron, Table,Badge,Container,Row, Col } from 'reactstrap'
import {Menu,Segment,Sidebar,} from 'semantic-ui-react'
import MenuIcon from '@material-ui/icons/Menu';import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStateValue } from '../../redux/StateProvider';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_ANIMATION':
            return { ...state, animation: action.animation, visible: !state.visible }
        case 'CHANGE_DIMMED':
            return { ...state, dimmed: action.dimmed }
        case 'CHANGE_DIRECTION':
            return { ...state, direction: action.direction, visible: false }
        default:
        throw new Error()
    }
}
function AdminProfile() {
const [{user}] = useStateValue();
const [adminName, setAdminName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [contactNumber, setContactNumber] = useState("");
const [array,setArray] = useState([]);
const [students,setStudents] = useState([])
const [smodal, setsModal] = useState(false);
const [bmodal, setBModal] = useState(false);
const btoggle = () => setBModal(!bmodal);
const stoggle = () => setsModal(!smodal);
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
        "username": user.username,
    }
    axios.post('http://localhost:3001/studentDetails',{data}).then(
        function(res) {
            if(res.data.msg) {
                alert(res.data.msg);
            } else {
                {res.data.map((i)=>{
                    setAdminName(i.username);
                    setPassword(i.password);
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
        dimmed: true,
        visible: false,
    })
    const { animation, dimmed, direction, visible } = state
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
            onClick={() =>
            dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })
        }>
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
            <h6>TESTS</h6>
            </NavLink>
        </Menu.Item>
        <Menu.Item as='a' onClick={stoggle}>
            <CheckCircleIcon />
            <h6>TESTS</h6>
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
        <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' ,height:800}} >
            {!vertical && (
                <VerticalSidebar
                    animation={animation}
                    direction={direction}
                    visible={visible}
                />
            )}
        <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment basic>
                <div>
                    <div>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>ADMINS</th>
                                        <th>PASSWORD</th>
                                        <th>E-MAIL</th>
                                        <th>CONTACT NUMBER</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr>
                                            <td>{adminName}</td>
                                            <td>{password}</td>
                                            <td>{email}</td>
                                            <td>{contactNumber}</td>
                                        </tr>
                                    </tbody>
                            </Table>
                        </Card>
                    </div>
                    <div>
                    </div>
                    <div>
                        <Modal isOpen={bmodal} size="lg" toggle={btoggle} >
                            <ModalHeader ><strong>USERS</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                            <Card>
                                                <Table  hover bordered responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>USERS</th>
                                                        </tr>
                                                    </thead>
                                                    {students.map((s)=>{
                                                        return(
                                                        <tbody>
                                                            {s.students.map((j)=>{
                                                                if(j !== ""){
                                                                    return(
                                                                        <div>
                                                                            <tr>
                                                                                <td>{j}</td>
                                                                            </tr>
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                        </tbody>
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
                            <ModalHeader ><strong>USERS</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                            <Card>
                                                <Table  hover bordered responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>USERNAME</th>
                                                            <th>PASSWORD</th>
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
                                                                <td>{s.password}</td>
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
                            <ModalHeader ><strong>QUIZES</strong></ModalHeader>
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
                                                        return(
                                                        <tbody>
                                                            <tr>
                                                                <td>{s.id}</td>
                                                                <td>{s.from}</td>
                                                                <td>{s.to}</td>
                                                                <td>{s.subject}</td>
                                                                <td>{s.topic}</td>
                                                                <td>
                                                                    <Button color="primary" outline onClick={()=>{btoggle()}}>
                                                                        STUDENTS <Badge color="primary" >{s.students.length}</Badge>
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
