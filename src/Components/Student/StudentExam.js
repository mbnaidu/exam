import React, { useState,useEffect } from 'react'
import {  Collapse, Card } from 'reactstrap';
import axios from 'axios';
import { useStateValue } from '../../redux/StateProvider';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { blue } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import {ButtonContent, Header, Menu,Segment,Sidebar,Button,Table,TableHeader,TableBody, TableRow, TableHeaderCell, TableCell, Label, Icon, MenuItem} from 'semantic-ui-react'
import MenuIcon from '@material-ui/icons/Menu';import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';













let id = 0;

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
function StudentExam() {
    const [subarray,setSubArray] = useState([])
    const history = useHistory();
    const BlueRadio = withStyles({
        root: {
          color: blue[400],
          '&$checked': {
            color: blue[600],
          },
        },
        checked: {},
      })((props) => <Radio color="default" {...props} />);
    // GETTING TODAY'S DATE AND DAY
    const today = new Date();

    const currentDay = today.getDate();
    const currentMonth = today.getMonth()+1;
    const currentYear =  today.getFullYear();

    const hours = today.getHours();
    const minutes = today.getMinutes();

    const [upcoming,setUpComing] = useState([]);
    const [present,setPresent] = useState([]);
    const [completed,setCompleted] = useState([]);


    const [{user}] = useStateValue();
    const [isOpen, setOnOpen] = useState(false);
    const [upOpen, setUpOpen] = useState(false);
    const [coOpen, setCoOpen] = useState(false);
    const onToggle = () => setOnOpen(!isOpen);
    const upToggle = () => setUpOpen(!upOpen);
    const coToggle = () => setCoOpen(!coOpen);
    const [EXAM,SETEXAM] = useState(false);
    const [examArray,setExamArray] = useState([]);
 
    useEffect(() => {
        let data = {
            "username": user.username,
        }
        axios.post('http://localhost:3001/studentDetails',{data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    // id = res.data[0].id;
                    id="18pa1a20"
                }
            }
        )
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
        data = {
            "id":id
        }
        axios.post('http://localhost:3001/getReportCard', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((r)=>{
                        subarray.push(r);
                    })}
                }
            }
        )
    },[]);
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
        if(d.students.indexOf(id)>=0){
            if(currentYear >= givenYear && currentYear <=GivenYear){
                if(currentMonth > givenMonth && currentMonth > GivenMonth){
                    completed.push(d);        
                }
                else if(currentMonth <givenMonth && currentMonth < GivenMonth){
                    upcoming.push(d);        
                }
                else if(currentMonth >= givenMonth && currentMonth<=GivenMonth){
                    if(currentDay >= givenDay && currentDay <= GivenDay){
                        present.push(d);        
                    }
                    else if(currentDay > givenDay && currentDay > GivenDay){
                        completed.push(d);        
                    }
                    else if(currentDay < givenDay && currentDay < GivenDay){
                        upcoming.push(d);        
                    }
                }
            }
            if(currentYear > givenYear && currentYear >GivenYear){  
                completed.push(d);        
            }
            if(currentYear < givenYear && currentYear<GivenYear){
                upcoming.push(d);        
            }
        }
        
    }
    function startTest(testId,starttime,endtime,isSubmitted) {
        console.log(isSubmitted)

        var s = starttime.split(":");
        var e = endtime.split(":");

        var h1 = s[0];
        var m1 = s[1];

        var h2 = e[0];
        var m2 = e[1];
        if(hours >= h1 && hours <=h2){
            if(!isSubmitted){
                const data = {
                    "id":testId,
                }
                axios.post('http://localhost:3001/getQuestions', {data}).then(
                    function(res) {
                        if(res.data){
                            console.log(res.data)
                                history.push({
                                    pathname: '/online',
                                    state: res.data
                                })
                        }
                    }
                )
            }
        }
    }
    const [state, dispatch] = React.useReducer(exampleReducer, {
        animation: 'overlay',
        visible: false,
    })
    const { animation, direction, visible } = state
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
        <Menu.Item as='a'  >
            <NavLink to="/profile">
            <PersonIcon  fontSize="large" />
            <h6>PROFILE</h6>
            </NavLink>
        </Menu.Item>
        <Menu.Item as='a' active onClick={() =>
            dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })
        }>
            <CheckCircleIcon />
            <h6>TESTS</h6>
        </Menu.Item>
        <Menu.Item as='a'  onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });onToggle()}}>
            <NavLink to="/exam" >
            <LooksOneIcon  fontSize="large" />
                    <Looks4Icon  fontSize="large" />
            <h6>TODAY EXAMS</h6>
            </NavLink>
        </Menu.Item>
        <Menu.Item as='a' onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });coToggle()}}>
            <EventNoteIcon  fontSize="large" />
            <h6>UP COMING</h6>
        </Menu.Item>
        <Menu.Item as='a' onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });upToggle()}}>
            <EventAvailableIcon  fontSize="large" />
            <h6>COMPLETED</h6>
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
        <div className="overflow-auto">
            <Button color="primary"
                onClick={() =>
                dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}>
                <MenuIcon />
            </Button>
            <Sidebar.Pushable as={Segment}  style={{ overflow: 'show' ,height:700}} >
                {!vertical && (
                    <VerticalSidebar
                        animation={animation}
                        direction={direction}
                        visible={visible}
                    />
                )}
            <Sidebar.Pusher >
                <Segment basic>
                <div >
                    <div>
                            <Collapse isOpen={isOpen}>
                                <Card>
                                <Menu compact>
                                    <MenuItem as='a'>
                                                        <Button color="green" onClick={() => { onToggle(); dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}}><Header>TODAY EXAMS</Header></Button>
                                    <Label color='green' floating>
                                        {present.length}
                                    </Label>
                                    </MenuItem>
                                </Menu>
                                    <Table celled color="green">
                                        <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell>SUBJECT</TableHeaderCell>
                                            <TableHeaderCell>TOPIC</TableHeaderCell>
                                            <TableHeaderCell>START DATE</TableHeaderCell>
                                            <TableHeaderCell>LAST DATE</TableHeaderCell>
                                            <TableHeaderCell>TIMINIGS</TableHeaderCell>
                                            <TableHeaderCell>TOTAL MARKS</TableHeaderCell>
                                            <TableHeaderCell>STATUS</TableHeaderCell>
                                        </TableRow>
                                        </TableHeader>
                                        {present.map((u)=>{
                                            var FROM = u.from;
                                            var TO = u.to;
                                            var d2 = TO.split("-");
                                            var d1 = FROM.split("-");
                                            var f = false;
                                            {subarray.map((s)=>{
                                                if(s.testId == u.id){
                                                    if(s.isSubmitted){
                                                        f = true;
                                                    }
                                                }
                                            })}
                                                return(
                                                    <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                    <Label ribbon color="green">{u.subject}</Label>
                                                    </TableCell>
                                                    <TableCell>{u.topic}</TableCell>
                                                    <TableCell>{d1[2]+"-"+d1[1]+"-"+d1[0]}</TableCell>
                                                    <TableCell>{d2[2]+"-"+d2[1]+"-"+d2[0]}</TableCell>
                                                    <TableCell>{u.starttime }{" to "}{ u.endtime}</TableCell>
                                                    <TableCell>{u.total}</TableCell>
                                                    <TableCell>
                                                    <Button animated="vertical" inverted color={f ? "red" : "green"} onClick={()=>{startTest(u.id,u.starttime,u.endtime,f);}}>
                                                                { f ? (<div>
                                                                    <ButtonContent visible>SUBMITTED</ButtonContent>
                                                                    <ButtonContent hidden>0 Attempts left</ButtonContent>
                                                                </div>) : (
                                                                    <div>
                                                                        <ButtonContent visible >START</ButtonContent>
                                                                        <ButtonContent hidden>{u.starttime}</ButtonContent>
                                                                    </div>
                                                                )}
                                                                </Button>
                                                    </TableCell>
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
                                <Table celled color="orange">
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
                </div>
                </Segment>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
    </div>
    )
}

export default StudentExam
