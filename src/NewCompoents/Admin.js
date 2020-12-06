import React, { useState, useEffect } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { useStateValue } from '../redux/StateProvider';


function Admin() {
    const [{user}] = useStateValue();
    useEffect(() => {
        const data = {
            "username": user ? ` ${user.username}` : ""
        }
        axios.post('http://localhost:3001/studentDetails',{data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    console.log(res.data);
                }
            }
        )
        axios.post('http://localhost:3001/allStudents').then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    console.log(res.data);
                }
            }
        )
    });
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);
    const admins=[
        {username:"madhu",password:"babu",email:"madhucharliehash@gmail.com",contactNumber:"2452345",address:"14-10-1/1,bhimavaram,gunipudi"},
    ]
    const students = [
        {sno:"1",id:"1201",name:"student1",password:"1",email:"student1@gmail.com",contactnumber:"232654563"},
        {sno:"2",id:"1202",name:"student2",password:"2",email:"student2@gmail.com",contactnumber:"562654563"},
        {sno:"3",id:"1203",name:"student3",password:"3",email:"student3@gmail.com",contactnumber:"722654563"},
        {sno:"4",id:"1204",name:"sudent4",password:"4",email:"student4@gmail.com",contactnumber:"452654563"}
    ]
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
                                    <th>ADDRESS</th>
                                </tr>
                            </thead>
                            {admins.map((a)=>{
                                return(
                                <tbody>
                                    <tr>
                                        <td>{a.username}</td>
                                        <td>{a.password}</td>
                                        <td>{a.email}</td>
                                        <td>{a.contactNumber}</td>
                                        <td>{a.address}</td>
                                    </tr>
                                </tbody>
                                )
                            })}
                        </Table>
                    </Card>
                </div>
            </div>
            <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem'}} >STUDENT DETAILS</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>S.NO </th>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PASSWORD</th>
                                    <th>E-MAIL</th>
                                    <th>CONTACT NUMBER</th>
                                </tr>
                            </thead>
                            {students.map((s)=>{
                                return(
                                <tbody>
                                    <tr>
                                        <td>{s.sno}</td>
                                        <td>{s.id}</td>
                                        <td>{s.name}</td>
                                        <td>{s.password}</td>
                                        <td>{s.email}</td>
                                        <td>{s.contactnumber}</td>
                                    </tr>
                                </tbody>
                                )
                            })}
                        </Table>
                    </Card>
                </Collapse>
            </div>
        </div>
    )
}

export default Admin
