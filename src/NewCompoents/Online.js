import React, { Fragment, useState } from 'react'
import {Badge, Button,Container, CardBody, CardHeader, CardTitle, Jumbotron } from 'reactstrap'
import {  Card, FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import { QUESTIONS } from '../Questions/NewQuestions'
import '../styles/Exam.css'
import { blue, green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';


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
    const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
    const [currentQuestion,setCurrentQuestion]=useState(1)
    const [counter, setCounter] = React.useState(10);
    React.useEffect(() => {
        if(counter===0 && currentQuestion<QUESTIONS.length){
            setCurrentQuestion(currentQuestion+1);
            setCounter(10);
        }
        else if(counter === 0 && currentQuestion === QUESTIONS.length){
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
                    if(que==q.id){
                      return(
                        <div>
                          <Container className="ques__" fluid="md">{q.id}.  {q.Question}</Container>
                          <CardBody>
                            <FormControl>
                              <RadioGroup>
                                <label><BlueRadio onChange={handleChange} value="a" size="small" />{q.Option1}</label>
                                <label><BlueRadio onChange={handleChange} value="b"name="radio-button-demo" size="small"/>{q.Option2}</label>
                                <label><BlueRadio onChange={handleChange}value="c"color="default"name="radio-button-demo"size="small"/>{q.Option3}</label>
                                <label><BlueRadio onChange={handleChange} value="d" color="default" name="radio-button-demo" size="small"/>{q.Option4}</label>
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
          {questionRender(currentQuestion)}
          <Button onClick={()=>{setCurrentQuestion(currentQuestion+1);setCounter(10)}}><strong>NEXT</strong></Button>
        </div>
      </div>
    )
}

export default Online