import React, { useState, useEffect } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { useStateValue } from '../redux/StateProvider';
import { Menu } from '@material-ui/core';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function Admin() {
    const [{user}] = useStateValue();
    const [adminName, setAdminName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [array,setArray] = useState([]);

    useEffect(() => {
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
                    <Button color="success" onClick={()=>{mtoggle()}}><strong>STUDENTS DETAILS</strong></Button>
                    <Modal isOpen={mmodal} size="lg">
                        <ModalHeader ><strong>STUDENTS</strong></ModalHeader>
                            <ModalBody>
                                    <div>
                                        <Card>
                                            <Table hover>
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
                        <Button color="danger" onClick={()=>{mtoggle();setArray([])}}><strong>CANCEL</strong></Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Admin
