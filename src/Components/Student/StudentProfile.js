import React, { useEffect, useState } from 'react'
import {Menu,Segment,Sidebar,Button, Reveal, Image, CardContent, Header, Placeholder} from 'semantic-ui-react'
import MenuIcon from '@material-ui/icons/Menu';import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStateValue } from '../../redux/StateProvider';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Card,Table, Collapse } from 'reactstrap';
import axios from 'axios';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

let ID = 0;

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
function StudentProfile() {

    //REPORT CARD
    const [testId,setTestId] = useState([]);
    const [marks,setMarks] = useState([]);
    const [isSubmitted,setIsSubmitted] = useState([]);
    const [subject,setSubject] = useState("");
    const [topic,setTopic] = useState("");
    const [subarray,setSubArray] = useState([])
    const [subarray1,setSubArray1] = useState([])
    const [finalArray,setFinalArray] = useState([]);

    const [{user}] = useStateValue();
    const [adminName, setAdminName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [array,setArray] = useState([]);
    const toggle = () => setOpen(!isOpen);
    useEffect(() => {
        let data = {
            "username": user.username,
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
                        setId(i.id);
                    })}
                    // ID="18pa1a1240"
                    ID = res.data[0].id;
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
        data = {
            "id":ID
        }
        axios.post('http://localhost:3001/getReportCard', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((r)=>{
                        testId.push(r.testId);
                        isSubmitted.push(r.isSubmitted);
                        marks.push(r.marks);
                        subarray.push(r);
                    })}
                }
            }
        )
        axios.post('http://localhost:3001/allTests').then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((m)=>{
                        subarray1.push(m);
                    })}                  
                }
            }
        )
    }, []);
    const ReportCard = () =>{
        {subarray1.map((s)=>{
            {subarray.map((m)=>{
                if(s.id == m.testId){
                    finalArray[m.testId]=m.testId+"-"+s.subject+"-"+s.topic+"-"+m.marks+"-"+m.isSubmitted;
                }
            })}
        })}
    }
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
        <Menu.Item as='a'>
            <NavLink to="/exam">
            <CreateIcon  fontSize="large" />
            <h6>TESTS</h6>
            </NavLink>
        </Menu.Item>
        <Menu.Item as='a' onClick={()=>{toggle();ReportCard()}}>
            <CheckCircleIcon />
            <h6>PERFORMANCE</h6>
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
        <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' ,height:800}} >
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
                <div>
                <Card className="admin_card" color="pink">
                <Placeholder fluid > 
                    <Reveal animated='rotate' className="m-5">
                            <Reveal.Content visible>
                            <Image circular size='small' src='https://react.semantic-ui.com/images/wireframe/square-image.png' centered/>
                            </Reveal.Content>
                            <Reveal.Content hidden>
                            <Image circular size='small' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
                            </Reveal.Content>
                        </Reveal>
                        <CardContent>
                                <Header className="m-5" color="blue">Id : {id.toUpperCase()}</Header>
                                <Header className="m-5" color="blue">Name : {adminName.toUpperCase()}</Header>
                                <Header className="m-5" color="blue">E-Mail : {email.toUpperCase()}</Header>
                                <Header className="m-5 " color="blue">Contact number : {contactNumber}</Header>
                        </CardContent>
                        </Placeholder>
                        </Card>
                </div>
            </div>
            <div>
                        <Modal isOpen={isOpen} size="lg" toggle={toggle} >
                            <ModalHeader ><strong>ALL TESTS</strong></ModalHeader>
                                <ModalBody>
                                        <div>
                                        <Card>
                                            <Table hover>
                                                <thead>
                                                    <tr>
                                                        <th>TEST ID</th>
                                                        <th>SUBJECT</th>
                                                        <th>TOPIC</th>
                                                        <th>MARKS</th>
                                                        <th>SUBMISSION</th>
                                                    </tr>
                                                </thead>
                                                {finalArray.map((r)=>{
                                                    var from = r;
                                                    var d1 = from.split("-")
                                                    return(
                                                    <tbody key={r}>
                                                        <tr>
                                                            <td>{d1[0]}</td>
                                                            <td>{d1[1]}</td>
                                                            <td>{d1[2]}</td>
                                                            <td>{d1[3]}</td>
                                                            <td>{d1[4] === "true" ? "SUBMITTED" : "NOT SUBMITTED"}</td>
                                                        </tr>
                                                    </tbody>
                                                    )
                                                })}
                                            </Table>
                                        </Card>
                                        </div>
                                    </ModalBody>
                            <ModalFooter>
                                <Button color="black" onClick={()=>{toggle();}}><strong>CANCEL</strong></Button>{' '}
                            </ModalFooter>
                        </Modal>
                <Collapse isOpen={isOpen}>
                    
                </Collapse>
            </div>
        </div>
            </Segment>
        </Sidebar.Pusher>
    </Sidebar.Pushable>
    </div>
    )
}

export default StudentProfile
