import React, { Fragment, useEffect, useState } from 'react'
import {Badge,Container, CardBody, Jumbotron, Card, CardHeader, Progress,  } from 'reactstrap'
import { FormControl, RadioGroup } from '@material-ui/core';
import '../../styles/Exam.css'
import { blue } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../redux/StateProvider';
import axios from 'axios';
import { Modal, ModalActions, ModalContent, Button,ModalHeader, ModalBody, ModalFooter, ModalDimmer } from 'semantic-ui-react';


const BlueRadio = withStyles({
    root: {
      color: blue[400],
      '&$checked': {
        color: blue[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

function Online() {
  const [testId,setTestId] = useState("");
  const [Username,setUsername] = useState("");
  const [{user}] = useStateValue();
  const [answers,setAnswers] = useState([])
  const [questionsArray,setQuestionsArray] = useState([]);
  const [marks,setMarks] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let data = {
      "username": user.username,
  }
  axios.post('http://localhost:3001/studentDetails',{data}).then(
      function(res) {
          if(res.data.msg) {
              alert(res.data.msg);
          } else {
              setUsername(res.data[0].id)
              // setUsername(12344778)
          }
      }
  )
    const dataList = {
      questionslist: history.location.state
  }
  setQuestionsArray(dataList.questionslist);
  {dataList.questionslist.map((a)=>{
    let d = a.question.split(",");
    if(a.answer>0){
      answers.push(d[7]);
      }
    if(a.answer>0){
      answers.push(a.answer);
    }
    setTestId(a.testId);
  })}
},[]);

    const [selectedValue, setSelectedValue] = React.useState('a');
    const [score, setScore] = useState(0);
    const [submit,setSubmit] = useState(false);
    const [array,setArray] = useState([]);
    const [finalArray,setFinalArray] = useState([]);
  const handleChange = (option,answer) => {
      array.push(option);
  };
  const Save = () => {
    if((array[array.length-1])>0){
      finalArray.push(array[array.length-1]);
    }
    else{
      finalArray.push(0);
    }
    setArray([]);
  }
    const [currentQuestion,setCurrentQuestion]=useState(1)
    const [counter, setCounter] = React.useState(10);
    React.useEffect(() => {
      if(Math.floor(100/currentQuestion) >= 25){setCol("danger");}
    if(Math.floor(100/currentQuestion) >= 50){setCol("info");}
    if(Math.floor(100/currentQuestion) >= 75){setCol("primary");}
    if(Math.floor(100/currentQuestion) >= 100){setCol("success");}

        if(counter===0 && currentQuestion<questionsArray.length){
          if((array[array.length-1])>0){
            finalArray.push(array[array.length-1]);
          }
          else{
            finalArray.push(0);
          }
            setCurrentQuestion(currentQuestion+1);
            setArray([]);
            setCounter(10);
        }
        else if( counter===0 && questionsArray.length === currentQuestion){
          finalArray.push(array[array.length-1]);
          var finalMarks=0;
            for(var i=0;i<finalArray.length;i++){
              if(finalArray[i] == answers[i]){
                finalMarks++;
              }
            }
            setMarks(finalMarks);
            setSubmit(true);
            var data = {
              id:Username,
              marks:finalMarks,
              testId:testId
            }
            axios.post('http://localhost:3001/submitMarks', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                }
            }
        )
        }
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
    const [col,setCol] = useState("warning")
    
    const questionRender = (que) =>{
      return(
        <div>
          <Jumbotron>
          <Progress multi>
            <Progress animated bar color={col} value={Math.floor(100/currentQuestion)} >{questionsArray.length - currentQuestion} questions left</Progress>
          </Progress>
            <Fragment>
              <Button className="questions" color="primary" style={{color:"white"}}><strong>Next Question in ...</strong> <Badge color="badge badge-light" pill>{counter}</Badge></Button>
                </Fragment>
                  {questionsArray.map((q)=>{
                    let d1 = q.question.split(",");
                    if(que==q.questId){
                      return(
                        <div key={q.questId}>
                          <Container className="ques__" fluid="md">{q.questId}.{q.questId}  {d1[1]}</Container>
                          <CardBody>
                            <FormControl>
                              <RadioGroup>
                                <label><BlueRadio onChange={()=>{handleChange(1,d1[7],q.answer)}} value="1" size="small" />{d1[3]}{q.option1}</label>
                                <label><BlueRadio onChange={()=>{handleChange(2,d1[7],q.answer)}}  value="2" size="small"/>{d1[4]}{q.option2}</label>
                                <label><BlueRadio onChange={()=>{handleChange(3,d1[7],q.answer)}}  value="3" size="small"/>{d1[5]}{q.option3}</label>
                                <label><BlueRadio onChange={()=>{handleChange(4,d1[7],q.answer)}}  value="4" size="small"/>{d1[6]}{q.option4}</label>
                              </RadioGroup>
                            </FormControl>
                          </CardBody>
                        </div>
                            )}
                            })}
            </Jumbotron>
          </div>
            )
    };
    return (
      <div>
        <div>
            {!submit ? ( currentQuestion!=questionsArray.length ? (
              <div>
              {questionRender(currentQuestion)}
                  <Button onClick={()=>{setCurrentQuestion(currentQuestion+1);setCounter(10);Save();setArray([])}}><strong>NEXT</strong></Button>
            </div>
            ) : (
              <div>
              {questionRender(currentQuestion)}
            </div>
            ))
            : (
              <ModalDimmer centered >
                  <ModalContent>
                  <ModalHeader >MARKS</ModalHeader>
                    <p>{marks}</p>
                  </ModalContent>
                  <ModalActions>
                    <Button positive href="/">
                      Done
                    </Button>
                  </ModalActions>
              </ModalDimmer>
            ) }
        </div>
      </div>
    )
}

export default Online