import React, { useState,useEffect } from 'react'
import { Table,Button, Collapse,Container, CardBody } from 'reactstrap';
import Header from './Header';
import axios from 'axios';
import { useStateValue } from '../../redux/StateProvider';
import {  Card,} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { blue, green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';


let id = 0;


function Exam() {
    const [start,setStart] =useState("START");
    const [subarray,setSubArray] = useState([])
    const history = useHistory();
    const BlueRadio = withStyles({
        root: {
          color: blue[400],
          '&$checked': {
            color: blue[600],
          },
        },
        checked: {},
      })((props) => <Radio color="default" {...props} />);
    // GETTING TODAY'S DATE AND DAY
    const today = new Date();

    const currentDay = today.getDate();
    const currentMonth = today.getMonth()+1;
    const currentYear =  today.getFullYear();

    const hours = today.getHours();
    const minutes = today.getMinutes();

    const [upcoming,setUpComing] = useState([]);
    const [present,setPresent] = useState([]);
    const [completed,setCompleted] = useState([]);


    const [{user}] = useStateValue();
    const [isOpen, setOnOpen] = useState(false);
    const [upOpen, setUpOpen] = useState(false);
    const [coOpen, setCoOpen] = useState(false);
    const onToggle = () => setOnOpen(!isOpen);
    const upToggle = () => setUpOpen(!upOpen);
    const coToggle = () => setCoOpen(!coOpen);
    const [EXAM,SETEXAM] = useState(false);
    const [examArray,setExamArray] = useState([]);
 
    useEffect(() => {
        let data = {
            "username": user.username,
        }
        axios.post('http://localhost:3001/studentDetails',{data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    id = res.data[0].id;
                    // id="18pa1a1240"
                }
            }
        )
        axios.post('http://localhost:3001/allTests').then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    console.log(res.data)
                    {res.data.map((k)=>{
                        MENU(k.from,k.to,k);
                    })}
                }
            }
        )
        data = {
            "id":id
        }
        axios.post('http://localhost:3001/getReportCard', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((r)=>{
                        subarray.push(r);
                    })}
                }
            }
        )
    },[]);
    const MENU = (a,b,d)=> {
        var from = a;
        var to = b;
        var d2 = to.split("-");
        var d1 = from.split("-");
        var givenDay = d1[2];
        var givenMonth = d1[1];
        var givenYear = d1[0];
        var GivenDay = d2[2];
        var GivenMonth = d2[1];
        var GivenYear = d2[0];
        if(d.students.indexOf(id)>=0){
            if(currentYear >= givenYear && currentYear <=GivenYear){
                if(currentMonth > givenMonth && currentMonth > GivenMonth){
                    completed.push(d);        
                }
                else if(currentMonth <givenMonth && currentMonth < GivenMonth){
                    upcoming.push(d);        
                }
                else if(currentMonth >= givenMonth && currentMonth<=GivenMonth){
                    if(currentDay >= givenDay && currentDay <= GivenDay){
                        present.push(d);        
                    }
                    else if(currentDay > givenDay && currentDay > GivenDay){
                        completed.push(d);        
                    }
                    else if(currentDay < givenDay && currentDay < GivenDay){
                        upcoming.push(d);        
                    }
                }
            }
            if(currentYear > givenYear && currentYear >GivenYear){  
                completed.push(d);        
            }
            if(currentYear < givenYear && currentYear<GivenYear){
                upcoming.push(d);        
            }
        }
        
    }
    function startTest(testId,starttime,endtime,isSubmitted) {
        console.log(present);
        console.log(subarray);
        console.log(isSubmitted)
        var s = starttime.split(":");
        var e = endtime.split(":");

        var h1 = s[0];
        var m1 = s[1];

        var h2 = e[0];
        var m2 = e[1];

        for(var i=h1;i<h2;i++){
            if(i === hours && !isSubmitted){
                const data = {
                    "id":testId,
                }
                axios.post('http://localhost:3001/getQuestions', {data}).then(
                    function(res) {
                        if(res.data){
                                history.push({
                                    pathname: '/online',
                                    state: res.data
                                })
                        }
                    }
                )
            }
        }
    }
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <Button color="info" onClick={()=>{onToggle();}} style={{ marginBottom: '1rem'}}>TODAY</Button>
                    <Collapse isOpen={isOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>START DATE</th>
                                        <th>LAST DATE</th>
                                        <th>TIMINIGS</th>
                                        <th>TOTAL MARKS</th>
                                    </tr>
                                </thead>
                                {present.map((u)=>{
                                    console.log(subarray);
                                    var f = false;
                                    {subarray.map((s)=>{
                                        if(s.testId == u.id){
                                            if(s.isSubmitted){
                                                f = true;
                                                console.log(s.testId)
                                            }
                                        }
                                    })}
                                        return(
                                            <tbody key={u.id}>
                                                <tr>
                                                    <td>{u.subject}</td>
                                                    <td>{u.topic}</td>
                                                    <td>{u.from}</td>
                                                    <td>{u.to}</td>
                                                    <td>{u.starttime }{" to "}{ u.endtime}</td>
                                                    <td>{u.total}</td>
                                                    <td><Button color={ f ? "danger" : "success"}  onClick={()=>{startTest(u.id,u.starttime,u.endtime,f);}}><strong>{ f ? "SUBMITTED" : "START"}</strong></Button></td>
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

export default Exam
