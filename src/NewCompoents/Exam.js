import React, { useState,useEffect } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import Header from './Header';
import axios from 'axios';
import { useStateValue } from '../redux/StateProvider';

function Exam() {
    const [{user}] = useStateValue();
    const [id, setId] = useState("");
    const [isOpen, setOnOpen] = useState(false);
    const [upOpen, setUpOpen] = useState(false);
    const [coOpen, setCoOpen] = useState(false);
    const onToggle = () => setOnOpen(!isOpen);
    const upToggle = () => setUpOpen(!upOpen);
    const coToggle = () => setCoOpen(!coOpen);
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
                        setId(i.id);
                    })}
                }
            }
        )
    });
    console.log(id);
    const ongoingexams = [
        {sno:"1",subject:"maths",topic:"linear",startdate:"12-03-2020",lastdate:"12-03-2020"},
        {sno:"2",subject:"physics",topic:"linear",startdate:"12-03-2020",lastdate:"12-03-2020"},
        {sno:"3",subject:"chemistry",topic:"linear",startdate:"12-03-2020",lastdate:"12-03-2020"},
        {sno:"4",subject:"english",topic:"linear",startdate:"12-03-2020",lastdate:"12-03-2020"}
    ]
    const upcomingexams = [
        {sno:"1",startdate:"12-03-2020",subject:"maths",topic:"linear",lastdate:"12-03-2020"},
        {sno:"2",startdate:"12-03-2020",subject:"physics",topic:"linear",lastdate:"12-03-2020"},
        {sno:"3",startdate:"12-03-2020",subject:"chemistry",topic:"linear",lastdate:"12-03-2020"},
        {sno:"4",startdate:"12-03-2020",subject:"english",topic:"linear",lastdate:"12-03-2020"}
    ]
    const completedexams = [
        {sno:"1",startdate:"12-03-2020",subject:"maths",topic:"linear",marks:"23",lastdate:"12-03-2020"},
        {sno:"2",startdate:"12-03-2020",subject:"physics",topic:"linear",marks:"56",lastdate:"12-03-2020"},
        {sno:"3",startdate:"12-03-2020",subject:"chemistry",topic:"linear",marks:"72",lastdate:"12-03-2020"},
        {sno:"4",startdate:"12-03-2020",subject:"english",topic:"linear",marks:"45",lastdate:"12-03-2020"}
    ]
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <Button color="primary" onClick={onToggle} style={{ marginBottom: '1rem'}}>ONGOING EXAMS</Button>
                    <Collapse isOpen={isOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>S.NO : </th>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>LAST DATE</th>
                                        <th>TIMINGS</th>
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
                <Button color="primary" onClick={upToggle} style={{ marginBottom: '1rem'}}>UPCOMING EXAMS</Button>
                    <Collapse isOpen={upOpen}>
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
                                {upcomingexams.map((u)=>{
                                    return(
                                    <tbody>
                                        <tr>
                                            <td>{u.sno}</td>
                                            <td>{u.startdate}</td>
                                            <td>{u.subject}</td>
                                            <td>{u.topic}</td>
                                            <td>{u.lastdate}</td>
                                            <td>{u.timings}</td>
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
                                            <td>{c.startdate}</td>
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

export default Exam
