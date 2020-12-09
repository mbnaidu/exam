import React, { useEffect, useState } from 'react'
import { Card, Jumbotron, Collapse,Table,Badge,Container,Row, Col, Nav } from 'reactstrap'
import {Checkbox,Grid,Header,Icon,Image,Menu,Segment,Sidebar,} from 'semantic-ui-react'
import MenuIcon from '@material-ui/icons/Menu';import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import NextWeekIcon from '@material-ui/icons/NextWeek';


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
function AdminExam() {    
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth()+1;
    const currentYear =  today.getFullYear();
    const [upcoming,setUpComing] = useState([]);
    const [present,setPresent] = useState([]);
    const [completed,setCompleted] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:3001/allTests').then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((k)=>{
                        MENU(k.from,k.to,k);
                    })}
                }
            }
        )
    }, []);
    const [isOpen, setOnOpen] = useState(false);
    const [upOpen, setUpOpen] = useState(false);
    const [coOpen, setCoOpen] = useState(false);
    const onToggle = () => setOnOpen(!isOpen);
    const upToggle = () => setUpOpen(!upOpen);
    const coToggle = () => setCoOpen(!coOpen);
    const [state, dispatch] = React.useReducer(exampleReducer, {
        animation: 'overlay',
        dimmed: true,
        visible: false,
        })
    const MENU = (a,b,d)=> {
        var from = a;
        var d1 = from.split("-");
        var givenDay = d1[2];
        var givenMonth = d1[1];
        var givenYear = d1[0];
        
        if(currentYear == givenYear){
            if(currentMonth == givenMonth){
                if(currentDay == givenDay){
                    present.push(d);
                }
                else if(currentDay > givenDay){
                    completed.push(d);
                }
                else if(currentDay < givenDay){
                    upcoming.push(d);
                }
            }
            else if(currentMonth > givenMonth){
                completed.push(d);
            }
            else if(currentMonth < givenMonth){
                upcoming.push(d);
            }
        }
        if(currentYear > givenYear){
            completed.push(d);
        }
        if(currentYear < givenYear){
            upcoming.push(d);
        }
    }
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
        <Menu.Item as='a' >
            <NavLink to="/admin">
            <PersonIcon  fontSize="large" />
            <h6>PROFILE</h6>
            </NavLink>
        </Menu.Item>
        <Menu.Item as='a' onClick={onToggle}>
            <CreateIcon fontSize="large"/>
            <h6>ONGOING EXAMS </h6>
        </Menu.Item>
        <Menu.Item as='a' onClick={coToggle}>
            <NextWeekIcon fontSize="large" />
            <h6>UPCOMING EXAMS </h6>
        </Menu.Item>
        <Menu.Item as='a' onClick={upToggle}>
            <UpdateIcon fontSize="large"/>
            <h6>COMPLETED EXAMS </h6>
        </Menu.Item>
        <Menu.Item as='a' active onClick={() =>
            dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })
        }>
            <CreateIcon  fontSize="large" />
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
            <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' ,height:900}} >
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
                        <Button color="success" href="/test" style={{ marginBottom: '1rem'}}>ASSIGN TEST</Button>
                    </div>
                    <div>
                        <Modal isOpen={isOpen} size="lg" toggle={onToggle} >
                            <ModalHeader ><strong>USERS</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                            <Card>
                                                <Table hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID </th>
                                                            <th>SUBJECT</th>
                                                            <th>TOPIC</th>
                                                            <th>START DATE</th>
                                                            <th>LAST DATE</th>
                                                            <th>TIMINIGS</th>
                                                            <th>TOTAL MARKS</th>
                                                        </tr>
                                                    </thead>
                                                    {present.map((u)=>{
                                                        return(
                                                        <tbody>
                                                            <tr>
                                                            <td>{u.id}</td>
                                                                <td>{u.subject}</td>
                                                                <td>{u.topic}</td>
                                                                <td>{u.from}</td>
                                                                <td>{u.to}</td>
                                                                <td>{u.starttime }{" to "}{ u.endtime}</td>
                                                                <td>{u.total}</td>
                                                            </tr>
                                                        </tbody>
                                                        )
                                                    })}
                                                </Table>
                                            </Card>
                                        </div>
                                    </ModalBody>
                            <ModalFooter>
                                <Button color="black" onClick={()=>{onToggle();}}><strong>CANCEL</strong></Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Modal isOpen={upOpen} size="lg" toggle={upToggle} >
                            <ModalHeader ><strong>USERS</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                            <Card>
                                                <Table hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID </th>
                                                            <th>SUBJECT</th>
                                                            <th>TOPIC</th>
                                                            <th>START DATE</th>
                                                            <th>LAST DATE</th>
                                                            <th>TIMINIGS</th>
                                                            <th>TOTAL MARKS</th>
                                                        </tr>
                                                    </thead>
                                                    {completed.map((u)=>{
                                                        return(
                                                        <tbody>
                                                            <tr>
                                                                <td>{u.id}</td>
                                                                <td>{u.subject}</td>
                                                                <td>{u.topic}</td>
                                                                <td>{u.from}</td>
                                                                <td>{u.to}</td>
                                                                <td>{u.starttime }{" to "}{ u.endtime}</td>
                                                                <td>{u.total}</td>
                                                            </tr>
                                                        </tbody>
                                                        )
                                                    })}
                                                </Table>
                                            </Card>
                                        </div>
                                    </ModalBody>
                            <ModalFooter>
                                <Button color="black" onClick={()=>{upToggle();}}><strong>CANCEL</strong></Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Modal isOpen={coOpen} size="lg" toggle={coToggle} >
                            <ModalHeader ><strong>USERS</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                        <Card>
                                            <Table hover>
                                                <thead>
                                                    <tr>
                                                        <th>ID </th>
                                                        <th>SUBJECT</th>
                                                        <th>TOPIC</th>
                                                        <th>START DATE</th>
                                                        <th>LAST DATE</th>
                                                        <th>TIMINIGS</th>
                                                        <th>TOTAL MARKS</th>
                                                    </tr>
                                                </thead>
                                                {upcoming.map((u)=>{
                                                    return(
                                                    <tbody>
                                                        <tr>
                                                            <td>{u.id}</td>
                                                            <td>{u.subject}</td>
                                                            <td>{u.topic}</td>
                                                            <td>{u.from}</td>
                                                            <td>{u.to}</td>
                                                            <td>{u.starttime }{" to "}{ u.endtime}</td>
                                                            <td>{u.total}</td>
                                                        </tr>
                                                    </tbody>
                                                    )
                                                })}
                                            </Table>
                                        </Card>
                                        </div>
                                    </ModalBody>
                            <ModalFooter>
                                <Button color="black" onClick={()=>{coToggle();}}><strong>CANCEL</strong></Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </div>
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
    )
}

export default AdminExam
