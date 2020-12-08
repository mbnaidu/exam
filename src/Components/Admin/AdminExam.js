import React, { useState, useEffect } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import AdminHeader from './AdminHeader';
import axios from 'axios';

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
    const MENU = (a,b,d)=> {
        var from = a;
        var d1 = from.split("-");
        var givenDay = d1[2];
        var givenMonth = d1[1];
        var givenYear = d1[0];
        
        console.log(currentDay,currentMonth,currentYear);
        console.log(givenDay,givenMonth,givenYear);

        if(currentYear == givenYear){
            if(currentMonth == givenMonth){
                if(currentDay == givenDay){
                    present.push(d);
                }
                else if(currentDay > givenDay){
                    completed.push(d);
                }
                else if(currentDay < givenDay){
                    upcoming.push(d);
                }
            }
            else if(currentMonth > givenMonth){
                completed.push(d);
            }
            else if(currentMonth < givenMonth){
                upcoming.push(d);
            }
        }
        if(currentYear > givenYear){
            completed.push(d);
        }
        if(currentYear < givenYear){
            upcoming.push(d);
        }

        // var dateFrom = a;
        // var dateTo = b;
        // var dateCheck = TODAY;

        // var d1 = dateFrom.split("-");
        // var d2 = dateTo.split("-");
        // var c = dateCheck.split("-");

        // var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]); 
        // var to = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        // var check = new Date(c[2], parseInt(c[1])-1, c[0]);

        // if(from <= check && to >= check ){
        // }
        // else if(from < check  && to < check){
        // }
        // else if(from > check  && to > check){
        // }
    }

    const [isOpen, setOnOpen] = useState(false);
    const [upOpen, setUpOpen] = useState(false);
    const [coOpen, setCoOpen] = useState(false);
    const onToggle = () => setOnOpen(!isOpen);
    const upToggle = () => setUpOpen(!upOpen);
    const coToggle = () => setCoOpen(!coOpen);

    return (
        <div>
            <div>
                <AdminHeader/>
            </div>
            <div>
                <Button color="success" href="/test" style={{ marginBottom: '1rem'}}>ASSIGN TEST</Button>
            </div>
            <div>
                <Button color="info" onClick={()=>{onToggle();}} style={{ marginBottom: '1rem'}}>ONGOING EXAMS</Button>
                    <Collapse isOpen={isOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>ID </th>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>START DATE</th>
                                        <th>LAST DATE</th>
                                        <th>TIMINIGS</th>
                                        <th>TOTAL MARKS</th>
                                    </tr>
                                </thead>
                                {present.map((u)=>{
                                    return(
                                    <tbody>
                                        <tr>
                                        <td>{u.id}</td>
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
                <Button color="info" onClick={()=>{upToggle();}} style={{ marginBottom: '1rem'}}>COMPLETED EXAMS</Button>
                    <Collapse isOpen={upOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>ID </th>
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
                                            <td>{u.id}</td>
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
                <Button color="info" onClick={()=>{coToggle();}} style={{ marginBottom: '1rem'}}>UPCOMING EXAMS</Button>
                    <Collapse isOpen={coOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>ID </th>
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
                                            <td>{u.id}</td>
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
    )
}

export default AdminExam
