import React, { useEffect, useState } from 'react'
import { Card, Jumbotron, Collapse,Badge,Container,Row, Col, Nav } from 'reactstrap'
import MenuIcon from '@material-ui/icons/Menu';import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';

import {ButtonContent, Header, Menu,Segment,Sidebar,Button,Table,TableHeader,TableBody, TableRow, TableHeaderCell, TableCell, Label, Icon, MenuItem} from 'semantic-ui-react'

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
        visible: false,
        })
    const MENU = (a,b,d)=> {
        var from = a;
        var to = b;
        var d2 = to.split("-");
        var d1 = from.split("-");
        var givenDay = d1[2];
        var givenMonth = d1[1];
        var givenYear = d1[0];
        var GivenDay = d2[2];
        var GivenMonth = d2[1];
        var GivenYear = d2[0];
            if (currentYear >= givenYear && currentYear <= GivenYear) {
                if (currentMonth > givenMonth && currentMonth > GivenMonth) {
                    completed.push(d);
                }
                else if (currentMonth < givenMonth && currentMonth < GivenMonth) {
                    upcoming.push(d);
                }
                else if (currentMonth >= givenMonth && currentMonth <= GivenMonth) {
                    if (currentDay >= givenDay && currentDay <= GivenDay) {
                        present.push(d);
                    }
                    else if (currentDay > givenDay && currentDay > GivenDay) {
                        completed.push(d);
                    }
                    else if (currentDay < givenDay && currentDay < GivenDay) {
                        upcoming.push(d);
                    }
                }
            }
            if (currentYear > givenYear && currentYear > GivenYear) {
                completed.push(d);
            }
            if (currentYear < givenYear && currentYear < GivenYear) {
                upcoming.push(d);
            }
    }
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
        <Menu.Item as='a' onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });onToggle()}}>
            <LooksOneIcon fontSize="large"/>
                <Looks4Icon fontSize="large"/>
            <h6>TODAY EXAMS </h6>
        </Menu.Item>
        <Menu.Item as='a' onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });coToggle()}}>
            <EventNoteIcon fontSize="large" />
            <h6>UPCOMING EXAMS </h6>
        </Menu.Item>
        <Menu.Item as='a' onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });upToggle()}}>
            <EventAvailableIcon fontSize="large"/>
            <h6>COMPLETED EXAMS </h6>
        </Menu.Item>
        <Menu.Item as='a' active onClick={() =>
            dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })
        }>
            <CreateIcon  fontSize="large" />
            <h6>TESTS</h6>
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
            <Sidebar.Pushable as={Segment} style={{ overflow: 'show' ,height:700}} >
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
                        <Button color="green" href="/test" style={{ marginBottom: '1rem'}}>ASSIGN TEST</Button>
                    </div>
                    <div>
                    <Collapse isOpen={isOpen}>
                        <Card >
                        <Menu compact>
                            <MenuItem as='a'>
                                            <Button color="green" onClick={() => { onToggle(); dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}}><Header>TODAY EXAMS</Header></Button>
                            <Label color='green' floating>
                                {present.length}
                            </Label>
                            </MenuItem>
                        </Menu>
                            <Table celled color="green" striped>
                                <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>TEST ID</TableHeaderCell>
                                    <TableHeaderCell>SUBJECT</TableHeaderCell>
                                    <TableHeaderCell>TOPIC</TableHeaderCell>
                                    <TableHeaderCell>START DATE</TableHeaderCell>
                                    <TableHeaderCell>LAST DATE</TableHeaderCell>
                                    <TableHeaderCell>TIMINIGS</TableHeaderCell>
                                    <TableHeaderCell>TOTAL MARKS</TableHeaderCell>
                                </TableRow>
                                </TableHeader>
                                {present.map((u)=>{
                                    var FROM = u.from;
                                    var TO = u.to;
                                    var d2 = TO.split("-");
                                    var d1 = FROM.split("-");
                                        return(
                                            <TableBody>
                                        <TableRow>
                                            <TableCell>
                                            <Label ribbon color="green">{u.id}</Label>
                                            </TableCell>
                                            <TableCell>{u.subject}</TableCell>
                                            <TableCell>{u.topic}</TableCell>
                                            <TableCell>{d1[2]+"-"+d1[1]+"-"+d1[0]}</TableCell>
                                            <TableCell>{d2[2]+"-"+d2[1]+"-"+d2[0]}</TableCell>
                                            <TableCell>{u.starttime }{" to "}{ u.endtime}</TableCell>
                                            <TableCell>{u.total}</TableCell>
                                        </TableRow>
                                        </TableBody>
                                        )
                                })}
                            </Table>
                        </Card>
                    </Collapse>
            </div>
            <div>
                    <Collapse isOpen={coOpen}>
                        <Card>
                        <Menu compact>
                            <MenuItem as='a'>
                                            <Button color="orange" onClick={() => { coToggle(); dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}}><Header>UPCOMING EXAMS</Header></Button>
                            <Label color='orange' floating>
                                {upcoming.length}
                            </Label>
                            </MenuItem>
                        </Menu>
                        <Table celled color="orange" >
                            <TableHeader>
                            <TableRow>
                                <TableHeaderCell>SUBJECT</TableHeaderCell>
                                <TableHeaderCell>TOPIC</TableHeaderCell>
                                <TableHeaderCell>START DATE</TableHeaderCell>
                                <TableHeaderCell>LAST DATE</TableHeaderCell>
                                <TableHeaderCell>TIMINIGS</TableHeaderCell>
                                <TableHeaderCell>TOTAL MARKS</TableHeaderCell>
                            </TableRow>
                            </TableHeader>
                                {upcoming.map((u)=>{
                                    var FROM = u.from;
                                    var TO = u.to;
                                    var d2 = TO.split("-");
                                    var d1 = FROM.split("-");
                                    var f = false;
                                    return (
                                        <TableBody>
                                        <TableRow>
                                            <TableCell>
                                            <Label ribbon color="orange">{u.subject}</Label>
                                            </TableCell>
                                            <TableCell>{u.topic}</TableCell>
                                            <TableCell>{d1[2]+"-"+d1[1]+"-"+d1[0]}</TableCell>
                                            <TableCell>{d2[2]+"-"+d2[1]+"-"+d2[0]}</TableCell>
                                            <TableCell>{u.starttime }{" to "}{ u.endtime}</TableCell>
                                            <TableCell>{u.total}</TableCell>
                                        </TableRow>
                                        </TableBody>
                                    )
                                })}
                            </Table>
                        </Card>
                    </Collapse>
            </div>
            <div>
                    <Collapse isOpen={upOpen}>
                        <Card>
                        <Menu compact>
                            <MenuItem as='a'>
                                            <Button color="red" onClick={() => { upToggle(); dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}}><Header >COMPLETED EXAMS</Header></Button>
                            <Label color='red' floating>
                                {completed.length}
                            </Label>
                            </MenuItem>
                        </Menu>
                        <Table celled color="red" >
                            <TableHeader>
                            <TableRow>
                                <TableHeaderCell>SUBJECT</TableHeaderCell>
                                <TableHeaderCell>TOPIC</TableHeaderCell>
                                <TableHeaderCell>START DATE</TableHeaderCell>
                                <TableHeaderCell>LAST DATE</TableHeaderCell>
                                <TableHeaderCell>TIMINIGS</TableHeaderCell>
                                <TableHeaderCell>TOTAL MARKS</TableHeaderCell>
                            </TableRow>
                            </TableHeader>
                            {completed.map((u)=>{
                                    var FROM = u.from;
                                    var TO = u.to;
                                    var d2 = TO.split("-");
                                    var d1 = FROM.split("-");
                                    return(
                                        <TableBody>
                                        <TableRow>
                                            <TableCell>
                                            <Label ribbon color="red">{u.subject}</Label>
                                            </TableCell>
                                            <TableCell>{u.topic}</TableCell>
                                            <TableCell>{d1[2]+"-"+d1[1]+"-"+d1[0]}</TableCell>
                                            <TableCell>{d2[2]+"-"+d2[1]+"-"+d2[0]}</TableCell>
                                            <TableCell>{u.starttime }{" to "}{ u.endtime}</TableCell>
                                            <TableCell>{u.total}</TableCell>
                                        </TableRow>
                                        </TableBody>
                                    )
                                })}
                        </Table>
                        </Card>
                    </Collapse>
            </div>
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
    )
}

export default AdminExam
