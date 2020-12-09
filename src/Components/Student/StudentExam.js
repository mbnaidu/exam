import React, { useState,useEffect } from 'react'
import { Table,Button, Collapse,Container, Card } from 'reactstrap';
import axios from 'axios';
import { useStateValue } from '../../redux/StateProvider';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { blue, green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import {Header, Menu,Segment,Sidebar,} from 'semantic-ui-react'
import MenuIcon from '@material-ui/icons/Menu';import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import UpdateIcon from '@material-ui/icons/Update';
import NextWeekIcon from '@material-ui/icons/NextWeek';

let id = 0;

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
function StudentExam() {
    const [start,setStart] =useState("START");
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
                    id = res.data[0].id;
                    // id="18pa1a1240"
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
        <Menu.Item as='a' onClick={()=>{onToggle()}}>
            <NavLink to="/exam" >
            <CreateIcon  fontSize="large" />
            <h6>TODAY</h6>
            </NavLink>
        </Menu.Item>
        <Menu.Item as='a' onClick={()=>{coToggle()}}>
            <NextWeekIcon  fontSize="large" />
            <h6>UP COMING</h6>
        </Menu.Item>
        <Menu.Item as='a' onClick={()=>{upToggle()}}>
            <UpdateIcon  fontSize="large" />
            <h6>COMPLETED</h6>
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
            <Sidebar.Pushable as={Segment}  style={{ overflow: 'hidden' ,height:800}} >
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
                    <Collapse isOpen={isOpen}>
                        <Header>TODAY EXAMS</Header>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>START DATE</th>
                                        <th>LAST DATE</th>
                                        <th>TIMINIGS</th>
                                        <th>TOTAL MARKS</th>
                                    </tr>
                                </thead>
                                {present.map((u)=>{
                                    var f = false;
                                    {subarray.map((s)=>{
                                        if(s.testId == u.id){
                                            if(s.isSubmitted){
                                                f = true;
                                            }
                                        }
                                    })}
                                        return(
                                            <tbody key={u.id}>
                                                <tr>
                                                    <td>{u.subject}</td>
                                                    <td>{u.topic}</td>
                                                    <td>{u.from}</td>
                                                    <td>{u.to}</td>
                                                    <td>{u.starttime }{" to "}{ u.endtime}</td>
                                                    <td>{u.total}</td>
                                                    <td><Button color={ f ? "danger" : "success"}  onClick={()=>{startTest(u.id,u.starttime,u.endtime,f);}}><strong>{ f ? "SUBMITTED" : "START"}</strong></Button></td>
                                                </tr>
                                            </tbody>
                                        )
                                })}
                            </Table>
                        </Card>
                    </Collapse>
            </div>
            <div>
                    <Collapse isOpen={upOpen}>
                    <Header>COMPLETED EXAMS</Header>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
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
                    </Collapse>
            </div>
            <div>
                    <Collapse isOpen={coOpen}>
                    <Header>UPCOMING EXAMS</Header>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
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
