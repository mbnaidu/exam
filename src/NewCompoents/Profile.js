import React, { useState } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import Header from './Header';


function Profile() {
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);
    const users=[
        {id:"34234",username:"madhu",password:"babu",email:"madhucharliehash@gmail.com",contactNumber:"2452345"},
    ]
    const report = [
        {sno:"1",examdate:"12-03-2020",subject:"maths",topic:"linear",marks:"23",submittedDate:"12-03-2020"},
        {sno:"2",examdate:"12-03-2020",subject:"physics",topic:"linear",marks:"56",submittedDate:"12-03-2020"},
        {sno:"3",examdate:"12-03-2020",subject:"chemistry",topic:"linear",marks:"72",submittedDate:"12-03-2020"},
        {sno:"4",examdate:"12-03-2020",subject:"english",topic:"linear",marks:"45",submittedDate:"12-03-2020"}
    ]
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
                            {users.map((u)=>{
                                return(
                                <tbody>
                                    <tr>
                                        <td>{u.id}</td>
                                        <td>{u.username}</td>
                                        <td>{u.password}</td>
                                        <td>{u.email}</td>
                                        <td>{u.contactNumber}</td>
                                    </tr>
                                </tbody>
                                )
                            })}
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
                                        <td>{r.SNO}</td>
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
