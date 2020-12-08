import React, { useEffect, useState } from 'react'
import { Card,Table,Button, Collapse } from 'reactstrap';
import { useStateValue } from '../../redux/StateProvider';
import Header from './Header';
import axios from 'axios';

let ID = 0;

function Profile() {

    //REPORT CARD
    const [testId,setTestId] = useState([]);
    const [marks,setMarks] = useState([]);
    const [isSubmitted,setIsSubmitted] = useState([]);
    const [subject,setSubject] = useState("");
    const [topic,setTopic] = useState("");
    const [subarray,setSubArray] = useState([])
    const [subarray1,setSubArray1] = useState([])
    const [finalArray,setFinalArray] = useState([]);





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
                    {res.data.map((i)=>{
                        setAdminName(i.username);
                        setPassword(i.password);
                        setEmail(i.email);
                        setContactNumber(i.contact);
                        setId(i.id);
                    })}
                    // ID="18pa1a1240"
                    ID = res.data[0].id;
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
            "id":ID
        }
        axios.post('http://localhost:3001/getReportCard', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((r)=>{
                        testId.push(r.testId);
                        isSubmitted.push(r.isSubmitted);
                        marks.push(r.marks);
                        subarray.push(r);
                    })}
                }
            }
        )
        axios.post('http://localhost:3001/allTests').then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((m)=>{
                        subarray1.push(m);
                    })}                  
                }
            }
        )
    }, []);
    const ReportCard = () =>{
        {subarray1.map((s)=>{
            {subarray.map((m)=>{
                if(s.id == m.testId){
                    finalArray[m.testId]=m.testId+"-"+s.subject+"-"+s.topic+"-"+m.marks+"-"+m.isSubmitted;
                }
            })}
        })}
        console.log(finalArray)
    }
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
            <Button color="info" onClick={()=>{toggle();ReportCard();}} style={{ marginBottom: '1rem'}} className="reportcard">REPORT CARD</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>TEST ID</th>
                                    <th>SUBJECT</th>
                                    <th>TOPIC</th>
                                    <th>MARKS</th>
                                    <th>SUBMISSION</th>
                                </tr>
                            </thead>
                            {finalArray.map((r)=>{
                                var from = r;
                                var d1 = from.split("-")
                                return(
                                <tbody key={r}>
                                    <tr>
                                        <td>{d1[0]}</td>
                                        <td>{d1[1]}</td>
                                        <td>{d1[2]}</td>
                                        <td>{d1[3]}</td>
                                        <td>{d1[4] === "true" ? "SUBMITTED" : "NOT SUBMITTED"}</td>
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
