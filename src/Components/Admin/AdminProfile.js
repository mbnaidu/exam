import React, { useEffect, useState } from 'react'
import { Badge, Jumbotron,Card,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Menu,Segment,Sidebar,Table,TableHeader,TableHeaderCell, TableBody,Button, Reveal, Image, CardContent,  Header, Placeholder, Message, ButtonContent, TableCell, Label, TableRow,} from 'semantic-ui-react'
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
    // PROFILE
        const [{user}] = useStateValue();
        const [adminName, setAdminName] = useState("");
        const [email, setEmail] = useState("");
        const [contactNumber, setContactNumber] = useState("");
    // ALL REPORT CARDS
        const [allReportCards,setAllReportCards] = useState([]);
        const [singleStudent,SetSingleStudent] = useState([]);
        const [TESTID,SETTESTID] = useState(0);
    // ALL TESTS
            const [allTests,setAllTests] = useState([]);
            const [students,setStudents] = useState([]);
            const [LISTLENGTH,setLISTLENGHT] = useState([]);
    // ALL STUDENT DETIALS
        const [allStudentDetails,setAllStudentDetails] = useState([]);
    // TOGGLE METHODS
        //---- STUDENT DETAILS -----
            const [mmodal, setMModal] = useState(false);
            const mtoggle = () => setMModal(!mmodal);
            //------ REPORT CARD --------
                const [viewModal, setViewModal] = useState(false);
                const viewModalToggle = () => setViewModal(!viewModal);
        //------ ASSIGNED TESTS ------
            const [smodal, setsModal] = useState(false);
            const stoggle = () => setsModal(!smodal);
            //----- ALL TESTS -------
                const [bmodal, setBModal] = useState(false);
                const btoggle = () => setBModal(!bmodal);
    // SETTING INDIVIDUAL REPORT CARD
        const CALL = (id) =>{
            for(let a in allReportCards[id]) {
                let t = allReportCards[id][a]
                singleStudent.push(`${t.testId}, ${t.marks}, ${t.isSubmitted}`);
            }
        }
    // ALL TEST DETAILS AND GETTING REPORT CARD FOR EVERY STUDENT
        const show = () => {
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
                <Menu.Item as='a' onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });show();console.log(students);console.log(allTests)}}><HomeIcon  fontSize="large" />
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
                <Button color="primary"
                    onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });show()}}>
                    <MenuIcon />
                </Button>
            {/* SIDE BAR */}
                <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' ,height:700}} >
                    {!vertical && (<VerticalSidebar animation={animation} direction={direction} visible={visible}/>)}
                <Sidebar.Pusher>
                    <Segment basic>
                        <div>
                            {/* PROFILE  */}
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
                                </div>
                            {/* STUDENTS */}
                                {/* STUDENTS DETIALS */}
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
                                    </div>
                                {/* REPROT CARD */}
                                    <div>
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
                                                <Button color="black" onClick={()=>{viewModalToggle();SetSingleStudent([])}}><strong>CANCEL</strong></Button>{' '}
                                                </ModalFooter>
                                            </Modal>
                                    </div>
                            {/* CHECK TESTS */}
                                {/* ASSIGNED TESTS */}
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
                                                                                    <Button color="success" outline onClick={()=>{btoggle();show()}}>
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
                                {/* ALL TESTS DETAILS */}
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
                                                                                <Button fluid color="blue" >
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
                                </div>
                        </div>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
)
}
export default AdminProfile
