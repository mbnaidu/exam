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
  console.log(data);
  },[]);
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [score, setScore] = useState(0);
    const [submit,setSubmit] = useState(false);
    const [array,setArray] = useState([]);
    const [finalArray,setFinalArray] = useState([]);
  const handleChange = (event) => {
    array.push(event.target.value)
    setSelectedValue(event.target.value);
  };
  const Save = () => {
    finalArray.push(array[array.length-1]);
    if(currentQuestion === QUESTIONS.length){
      // console.log(finalArray)
    }
  }
    const [currentQuestion,setCurrentQuestion]=useState(1)
    const [counter, setCounter] = React.useState(5);
    React.useEffect(() => {
        if(counter===0 && currentQuestion<QUESTIONS.length){
            setCurrentQuestion(currentQuestion+1);
            finalArray.push(array[array.length-1]);
            setCounter(5);

        }
        else if(counter === 0 ){
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
                  {QUESTIONS.map((q)=>{
                    let option ;
                    if(que==q.id){
                      return(
                        <div>
                          <Container className="ques__" fluid="md">{q.id}.  {q.Question}</Container>
                          <CardBody>
                            <FormControl>
                              <RadioGroup>
                                <label><BlueRadio onChange={handleChange} value={q.Option1} size="small" />{q.Option1}</label>
                                <label><BlueRadio onChange={handleChange} value={q.Option2} size="small"/>{q.Option2}</label>
                                <label><BlueRadio onChange={handleChange}value={q.Option3} color="default"name="radio-button-demo"size="small"/>{q.Option3}</label>
                                <label><BlueRadio onChange={handleChange} value={q.Option4} color="default" name="radio-button-demo" size="small"/>{q.Option4}</label>
                              </RadioGroup>
                              <Button onClick={()=>{setCurrentQuestion(currentQuestion+1);setCounter(5);Save();}}><strong>NEXT</strong></Button>
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
          {questionRender(currentQuestion)}
        </div>
      </div>
    )
}

export default Online