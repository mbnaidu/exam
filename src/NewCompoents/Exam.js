import React, { useState,useEffect } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import Header from './Header';
import axios from 'axios';
import { useStateValue } from '../redux/StateProvider';
import { Call } from '@material-ui/icons';

function Exam() {


    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today.getDate());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth()+1);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    var  TODAY = currentDate + "-" +currentMonth + "-"+ currentYear;

    const [upcoming,setUpComing] = useState([]);
    const [present,setPresent] = useState([]);
    const [completed,setCompleted] = useState([]);


    const [{user}] = useStateValue();
    // const [iD, setID] = useState(0);
    let id = 0;
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
                    // {res.data.map((r)=>{
                    //     setId(r.id);
                    // })}
                    // CALL(id);
                    id = res.data[0].id;
                    // id="1202"
                }
            }
        )
    },[]);
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
    },[]);
    const ONLINE = () => {
        return(
            <div>
                {examArray.map((e)=>{
                    console.log(e);
                    // console.log(e.option1)
                    // console.log(e.option2)
                    // console.log(e.option3)
                    // console.log(e.option4)
                    // console.log(e.answer)
                })}
            </div>
        )
    }
    const MENU = (a,b,d)=> {
        var dateFrom = a;
        var dateTo = b;
        var dateCheck = TODAY;

        var d1 = dateFrom.split("-");
        var d2 = dateTo.split("-");
        var c = dateCheck.split("-");

        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]); 
        var to = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        var check = new Date(c[2], parseInt(c[1])-1, c[0]);

        if(d.students.indexOf(id) >= 0)
        {
            if(from <= check && to >= check ){
                present.push(d);
            }
            else if(from < check  && to < check){
                upcoming.push(d);
            }
            else if(from > check  && to > check){
                    completed.push(d);
            }
        }
    }
    function startTest(testId) {
        const data = {
            "id":testId,
        }
        axios.post('http://localhost:3001/getQuestions', {data}).then(
            function(res) {
                if(res.data){
                    console.log(res.data)
                    examArray.push(res.data);
                    SETEXAM(true);
                }
            }
        )
    }
    return (
        <div>
            {!EXAM ? (
                <div>
                    <div>
            <div>
                <Header/>
            </div>
            <div>
                <Button color="primary" onClick={()=>{onToggle()}} style={{ marginBottom: '1rem'}}>ONGOING EXAMS</Button>
                    <Collapse isOpen={isOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>START DATE</th>
                                        <th>LAST DATE</th>
                                        <th>TOTAL MARKS</th>
                                    </tr>
                                </thead>
                                {present.map((u)=>{
                                    return(
                                    <tbody>
                                        <tr>
                                            <td>{u.subject}</td>
                                            <td>{u.topic}</td>
                                            <td>{u.from}</td>
                                            <td>{u.to}</td>
                                            <td>{u.total}</td>
                                            <td><Button color="success"  onClick={()=>{startTest(u.id);}}><strong>START</strong></Button></td>
                                        </tr>
                                    </tbody>
                                    )
                                })}
                            </Table>
                        </Card>
                    </Collapse>
            </div>
            <div>
                <Button color="primary" onClick={()=>{upToggle();}} style={{ marginBottom: '1rem'}}>UPCOMING EXAMS</Button>
                    <Collapse isOpen={upOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>START DATE</th>
                                        <th>LAST DATE</th>
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
                <Button color="primary" onClick={()=>{coToggle();}} style={{ marginBottom: '1rem'}}>COMPLETED EXAMS</Button>
                    <Collapse isOpen={coOpen}>
                        <Card>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>START DATE</th>
                                        <th>LAST DATE</th>
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
                </div>
            ) : (
                <div>
                    {ONLINE()}
                </div>
            ) }
        </div>
    )
}

export default Exam
