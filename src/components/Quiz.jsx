import React, { useContext, useRef } from 'react'
import { useEffect,useState } from 'react';
import '../quiz.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import data from '../dummy-data';
import { QuizContext } from '../context/Quix';
import { QUIZ_ANSWERED } from '../context/Quix';
import ProgressCustom from './Progress';
import Header from './Header';



function Quiz({indexCurrQuiz,setIndexCurrQuiz}) {
  const classRef = useRef()
  const timerRef = useRef()
  const {state,dispatch} = useContext(QuizContext)
  
  const maxTime = 4000
  const [timeRemaining,setTimeRemaining] = useState({value : maxTime,total : 40})
  const currentQuestion = data[indexCurrQuiz]
  const {text,answers,correctAnswer} = currentQuestion
  const [isClick,setIsClick] = useState(false)
  const [isCorrect,setIsCorrect] = useState(undefined)
  
  
   
      if( isClick){
        classRef.current = 'click'
      }else if( !isClick && isCorrect){
        classRef.current = 'correct'
      }
      else if( !isClick && !isCorrect){
        classRef.current = 'wrong'
      }
      else{
        classRef.current = 'click'
      }
    
   

   
  useEffect(()=>{
   
   timerRef.current =  setInterval(()=>{
      setTimeRemaining(prev=>{    
       
        return {
          ...prev,
          value : prev.value - 10
        }
      })
    
    },10)    
    handleTimeLogic()
    return ()=>{      
      clearInterval( timerRef.current)
    }
  },[timeRemaining.value])

  useEffect(()=>{

  },[timeRemaining.value])
  
  const handleTimeOut = ()=>{
    if(isClick ){
      if(state.currentAnswered === correctAnswer){
        setTimeRemaining({value : 700,total : 7})
        setIsClick(false)
        setIsCorrect(true)
        return 
      }
      if(state.currentAnswered !== correctAnswer ){
        setTimeRemaining({value : 700,total : 7})
        setIsClick(false)
        setIsCorrect(false)
        return 
      }
    
    }
   
    clearInterval( timerRef.current)
    setIndexCurrQuiz(prev=>{
      if(prev === data.length ){
        return prev
      }
      return prev + 1
    })
    setTimeRemaining({value : maxTime, total : 40})
    !isClick && isCorrect===undefined && dispatch({type : QUIZ_ANSWERED,payload : {...currentQuestion , ans : null} })
    setIsClick(false)
    setIsCorrect(undefined)
  }

  const handleTimeLogic = () => {
    if (timeRemaining.value <= 0) {
      handleTimeOut();
    }
  };
 
 

  const handleQuestionAnswered = (answer)=>{
    dispatch({type : QUIZ_ANSWERED,payload :{...currentQuestion, ans : answer} })
    setIsClick(true)
    setTimeRemaining({value : 600,total : 6})
   
  }
 
  return (
    <main>
      
        <Header key={timeRemaining.total} isClick={isClick} isCorrect={isCorrect} timeRemaining={timeRemaining} />
        {
          currentQuestion ? (
           <>
            <h4 className='question'>
            {text}
          </h4>
          <ul>
            {
              answers.map((answer,index)=>{
                return <li 
                onClick={()=>!isClick && isCorrect===undefined && handleQuestionAnswered(answer)} 
                className={`ans 
                ${state.currentAnswered === answer && classRef.current} ` } 
                key={index}>
                  {answer}
                  </li>
              })
            }
          
          
          </ul> 
           </>
          ) : ""
        }
         
    </main>
  )
}

export default Quiz