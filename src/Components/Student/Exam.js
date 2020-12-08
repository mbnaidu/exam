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


function Exam() {
    const history = useHistory();
    const [start,setStart] = useState("Wait...")
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

    const [currentDate, setCurrentDate] = useState(today.getDate());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth()+1);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    var  TODAY = currentDate + "-" +currentMonth + "-"+ currentYear;

    const hours = today.getHours();
    const minutes = today.getMinutes();

    const [upcoming,setUpComing] = useState([]);
    const [present,setPresent] = useState([]);
    const [completed,setCompleted] = useState([]);


    const [{user}] = useStateValue();
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
                    // id = res.data[0].id;
                    id = "18pa1a1205";
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
    const calling = (starttime,endtime) => {
        var h1 = starttime[0]+starttime[1];
        var m1 = starttime[3]+starttime[4];

        var h2 = endtime[0]+endtime[1];
        var m2 = endtime[3]+endtime[4];

        for(var i=h1;i<=h2;i++){
            if(i === hours){
                for(var j=m1;j<=m2;j++){
                    if(j === minutes){
                        setStart("START");
                    }
                }
            }
        }
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
                calling(d.starttime,d.endtime);
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
        console.log(start)
        if(start === "START"){
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
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <Button color="info" onClick={()=>{onToggle();}} style={{ marginBottom: '1rem'}}>ONGOING EXAMS</Button>
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
                                    return(
                                    <tbody>
                                        <tr>
                                            <td>{u.subject}</td>
                                            <td>{u.topic}</td>
                                            <td>{u.from}</td>
                                            <td>{u.to}</td>
                                            <td>{u.starttime }{" to "}{ u.endtime}</td>
                                            <td>{u.total}</td>
                                            <td><Button color="success"  onClick={()=>{startTest(u.id,u.starttime,u.endtime);}}><strong>{start}</strong></Button></td>
                                        </tr>
                                    </tbody>
                                    )
                                })}
                            </Table>
                        </Card>
                    </Collapse>
            </div>
            <div>
                <Button color="info" onClick={()=>{upToggle();}} style={{ marginBottom: '1rem'}}>UPCOMING EXAMS</Button>
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
                <Button color="info" onClick={()=>{coToggle();}} style={{ marginBottom: '1rem'}}>COMPLETED EXAMS</Button>
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
