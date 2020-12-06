import React, { useState, useEffect } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { Menu } from '@material-ui/core';

function AdminExam() {
    const [ID,SETID] = useState("");
    const [SUBJECT, SETSUBJECT] = useState("");
    const [TOPIC, SETTOPIC] = useState("");
    const [FROM, SETFROM] = useState("");
    const [TO, SETTO] = useState("");
    const [TOTAL, SETTOTAL] = useState(0);    
    const [array,setArray] = useState([])
    const [upcoming,setUpComing] = useState([]);
    const [present,setPresent] = useState([]);
    const [completed,setCompleted] = useState([]);

    
    const [currentDate, setCurrentDate] = useState(new Date().getDate());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    
    useEffect(() => {
        axios.post('http://localhost:3001/allTests').then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((r)=>{
                        array.push(r);
                    })}
                }
            }
        )
    }, []);
    const MENU = (a,b,c) => {
        console.log(a,b,c);
        console.log(currentDate,currentMonth,currentYear);
        if(currentYear < c){
            console.log("f");
        }
        else if(currentYear > c){
            console.log("p");
        }
        else if(currentYear === c){
            console.log("hi")
            if(currentMonth < b){
                console.log("f");
            }
            else if(currentMonth > b){
                console.log("p");
            }
            else if(currentMonth === b){
                if(currentDate < a){
                    console.log("f");
                }
                else if(currentDate > a){
                    console.log("p");
                }
                else if(currentDate === a){
                    console.log("pre");
                }
            }
        }
    }
    const Menu = (u) =>{
        console.log(u);
        {u.map((k)=>{
            MENU((k.from[0]+k.from[1]),(k.from[3]+k.from[4]),(k.from[6]+k.from[7]+k.from[8]+k.from[9]));
        })}
        
    }
    const [isOpen, setOnOpen] = useState(false);
    const [upOpen, setUpOpen] = useState(false);
    const [coOpen, setCoOpen] = useState(false);
    const onToggle = () => setOnOpen(!isOpen);
    const upToggle = () => setUpOpen(!upOpen);
    const coToggle = () => setCoOpen(!coOpen);

    const ongoingexams = [
        {sno:"1",subject:"maths",topic:"linear",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"2",subject:"physics",topic:"linear",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"3",subject:"chemistry",topic:"linear",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"4",subject:"english",topic:"linear",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"}
    ]
    const upcomingexams = [
        {sno:"1",date:"12-03-2020",subject:"maths",topic:"linear",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"2",date:"12-03-2020",subject:"physics",topic:"linear",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"3",date:"12-03-2020",subject:"chemistry",topic:"linear",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"4",date:"12-03-2020",subject:"english",topic:"linear",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"}
    ]
    const completedexams = [
        {sno:"1",date:"12-03-2020",subject:"maths",topic:"linear",marks:"23",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"2",date:"12-03-2020",subject:"physics",topic:"linear",marks:"56",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"3",date:"12-03-2020",subject:"chemistry",topic:"linear",marks:"72",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"},
        {sno:"4",date:"12-03-2020",subject:"english",topic:"linear",marks:"45",lastdate:"12-03-2020",timings:"10:00am - 12:00noon"}
    ]
    return (
        <div>
            <div>
                <AdminHeader/>
            </div>
            <div>
                <Button color="success" href="/test" style={{ marginBottom: '1rem'}}>ASSIGN TEST</Button>
            </div>
            <div>
                <Button color="primary" onClick={onToggle} style={{ marginBottom: '1rem'}}>ONGOING EXAMS</Button>
                    <Collapse isOpen={isOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>TEST NUMBER</th>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>START DATE</th>
                                        <th>LAST DATE</th>
                                        <th>TOTAL MARKS</th>
                                    </tr>
                                </thead>
                                {ongoingexams.map((o)=>{
                                    return(
                                    <tbody>
                                        <tr>
                                            <td>{o.sno}</td>
                                            <td>{o.subject}</td>
                                            <td>{o.topic}</td>
                                            <td>{o.lastdate}</td>
                                            <td>{o.timings}</td>
                                            <td><Button color="success" href="/online"><strong>START</strong></Button></td>
                                        </tr>
                                    </tbody>
                                    )
                                })}
                            </Table>
                        </Card>
                    </Collapse>
            </div>
            <div>
                <Button color="primary" onClick={()=>{upToggle();Menu(array)}} style={{ marginBottom: '1rem'}}>UPCOMING EXAMS</Button>
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
                                        <th>TOTAL MARKS</th>
                                    </tr>
                                </thead>
                                {array.map((u)=>{
                                    return(
                                    <tbody>
                                        <tr>
                                            <td>{u.id}</td>
                                            <td>{u.subject}</td>
                                            <td>{u.topic}</td>
                                            <td>{u.from}</td>
                                            <td>{u.to}</td>
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
                <Button color="primary" onClick={coToggle} style={{ marginBottom: '1rem'}}>COMPLETED EXAMS</Button>
                    <Collapse isOpen={coOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>S.NO : </th>
                                        <th>EXAM DATE</th>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>LAST DATE</th>
                                        <th>TIMINGS</th>
                                    </tr>
                                </thead>
                                {completedexams.map((c)=>{
                                    return(
                                    <tbody>
                                        <tr>
                                            <td>{c.sno}</td>
                                            <td>{c.date}</td>
                                            <td>{c.subject}</td>
                                            <td>{c.topic}</td>
                                            <td>{c.lastdate}</td>
                                            <td>{c.timings}</td>
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
