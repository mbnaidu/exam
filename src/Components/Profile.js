import React, { useEffect, useState } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import { useStateValue } from '../redux/StateProvider';
import Header from './Header';
import axios from 'axios';


function Profile() {
    const [{user}] = useStateValue();
    const [adminName, setAdminName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [array,setArray] = useState([]);
    const toggle = () => setOpen(!isOpen);
   const report = [
        {sno:"1",examdate:"12-03-2020",subject:"maths",topic:"linear",marks:"23",submittedDate:"12-03-2020"},
        {sno:"2",examdate:"12-03-2020",subject:"physics",topic:"linear",marks:"56",submittedDate:"12-03-2020"},
        {sno:"3",examdate:"12-03-2020",subject:"chemistry",topic:"linear",marks:"72",submittedDate:"12-03-2020"},
        {sno:"4",examdate:"12-03-2020",subject:"english",topic:"linear",marks:"45",submittedDate:"12-03-2020"}
    ]
    useEffect(() => {
        let data = {
            "username": user.username,
        }
        axios.post('http://localhost:3001/studentDetails',{data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    console.log(res.data)
                    {res.data.map((i)=>{
                        setAdminName(i.username);
                        setPassword(i.password);
                        setEmail(i.email);
                        setContactNumber(i.contact);
                        setId(i.id);
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
        data = {
            "id":"12034"
        }
        axios.post('http://localhost:3001/getReportCard', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    console.log(res.data);
                }
            }
        )
    }, []);
    return (
        <div>
            <div>
                <div>
                    <Header/>
                </div>
                <div>
                    <Card>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>ID : </th>
                                    <th>USER NAME</th>
                                    <th>PASSWORD</th>
                                    <th>E-MAIL</th>
                                    <th>CONTACT NUMBER</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr>
                                        <td>{id}</td>
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
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem'}} className="reportcard">REPORT CARD</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>S.NO : </th>
                                    <th>DATE</th>
                                    <th>SUBJECT</th>
                                    <th>TOPIC</th>
                                    <th>SUBMISSION</th>
                                    <th>MARKS</th>
                                </tr>
                            </thead>
                            {report.map((r)=>{
                                return(
                                <tbody>
                                    <tr>
                                        <td>{r.sno}</td>
                                        <td>{r.examdate}</td>
                                        <td>{r.subject}</td>
                                        <td>{r.topic}</td>
                                        <td>{r.submittedDate}</td>
                                        <td>{r.marks}</td>
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

export default Profile
