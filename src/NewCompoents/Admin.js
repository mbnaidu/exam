import React, { useState, useEffect } from 'react'
import { Card,Table,Button, Collapse, Badge, Container, Row, Col } from 'reactstrap';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { useStateValue } from '../redux/StateProvider';
import { Menu } from '@material-ui/core';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function Admin(props) {
    const {
        className
      } = props;
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
                    console.log(res.data)
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
    return (
        <div>
            <div>
                <div>
                    <AdminHeader/>
                </div>
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
            </div>
            <div>
            <div>
            <Container>
                
            </Container>
            <Row>
                <Col sm={{ size: 'auto', offset: 1 }}><Button color="success" onClick={()=>{mtoggle()}}><strong>STUDENTS DETAILS</strong></Button></Col>
                <Col sm={{ size: 'auto', offset: 1 }}><Button color="success" onClick={()=>{stoggle()}}><strong>ASSIGNED QUIZES</strong></Button></Col>
            </Row>
            </div>
                <div>
                    <Modal isOpen={bmodal} size="lg" toggle={btoggle} >
                        <ModalHeader ><strong>STUDENTS</strong></ModalHeader>
                            <ModalBody>
                                    <div>
                                        <Card>
                                            <Table  hover bordered responsive>
                                                <thead>
                                                    <tr>
                                                        <th>STUDENTS</th>
                                                    </tr>
                                                </thead>
                                                {students.map((s)=>{
                                                    console.log(s)
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
                        <ModalHeader ><strong>STUDENTS</strong></ModalHeader>
                            <ModalBody>
                                    <div>
                                        <Card>
                                            <Table dark hover bordered responsive>
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
        </div>
    )
}

export default Admin
