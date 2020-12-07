import React, { Fragment, useEffect, useState } from 'react'
import {Badge, Button,Container, CardBody, Jumbotron } from 'reactstrap'
import { FormControl, RadioGroup } from '@material-ui/core';
import { QUESTIONS } from '../Questions/NewQuestions'
import '../styles/Exam.css'
import { blue } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


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
  const [questionsArray,setQuestionsArray] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const data = {
      questionslist: history.location.state
  }
  // console.log(data.questionslist)
  setQuestionsArray(data.questionslist);
  },[]);
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [score, setScore] = useState(0);
    const [submit,setSubmit] = useState(false);
    const [array,setArray] = useState([]);
    const [finalArray,setFinalArray] = useState([]);
  const handleChange = (event) => {
    array.push(event.target.value)
  };
  const Save = () => {
    finalArray.push(array[array.length-1]);
    
  }
    const [currentQuestion,setCurrentQuestion]=useState(1)
    const [counter, setCounter] = React.useState(3);
    React.useEffect(() => {
        if(counter===0 && currentQuestion<questionsArray.length){
          finalArray.push(array[array.length-1]);
            setCurrentQuestion(currentQuestion+1);
            setCounter(3);
        }
        else if( counter===0 && questionsArray.length === currentQuestion){
          finalArray.push(array[array.length-1]);
            console.log(finalArray)
            setSubmit(true);
        }
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const questionRender = (que) =>{
      return(
        <div>
          <Jumbotron>
            <Fragment>
              <Button className="questions" color="primary" style={{color:"white"}}><strong>QUESTIONS </strong> <Badge color="badge badge-light" pill>{counter}</Badge></Button>
                </Fragment>
                  {questionsArray.map((q)=>{
                    let option ;
                    if(que==q.questId){
                      return(
                        <div key={q.questId}>
                          <Container className="ques__" fluid="md">{q.questId}.  {q.question}</Container>
                          <CardBody>
                            <FormControl>
                              <RadioGroup>
                                <label><BlueRadio onChange={handleChange} value="1" size="small" />{q.option1}</label>
                                <label><BlueRadio onChange={handleChange} value="2" size="small"/>{q.option2}</label>
                                <label><BlueRadio onChange={handleChange}value="3" color="default" size="small"/>{q.option3}</label>
                                <label><BlueRadio onChange={handleChange} value="4" color="default"   size="small"/>{q.option4}</label>
                              </RadioGroup>
                              <Button onClick={()=>{setCurrentQuestion(currentQuestion+1);setCounter(3);Save();}}><strong>NEXT</strong></Button>
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
            {!submit ? (
              <div>
              {questionRender(currentQuestion)}
            </div>
            ) : (
              <div>
                hi
              </div>
            ) }
        </div>
      </div>
    )
}

export default Online