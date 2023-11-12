import React, { useContext, useEffect } from 'react'
import '../quiz.css'
import completeImg from '../assets/quiz-complete.png'
import { QuizContext } from '../context/Quix'
import { RESET } from '../context/Quix'
function Result({setIndexCurrQuiz}) {
    const {state,dispatch} = useContext(QuizContext)

    const skippedArr = [...state.answers.filter(answer=>answer===null)]
    const skippedPercent = Math.round((skippedArr.length / state.answers.length)*100)        
    const correctArr = state.quizAnswered.map((item)=>{
        if(item.correctAnswer === item.ans){
            return item
        }        
    }).filter(item=>item !== undefined)
    const correctPercent = Math.round((correctArr.length / state.quizAnswered.length)*100)
    const incorrectPercent = 100 - skippedPercent - correctPercent
  console.log(state)
    const handleReset = () =>{
        setIndexCurrQuiz(0)
        dispatch({type:RESET})
    }
    
  return (
    <div className='result'>
        <img  src={completeImg} alt="" />
        <h2>Quiz completed</h2>
        <div className="contain-number-result">
            <div className="skipped">
                <span className='percent'>{skippedPercent}%</span>
                <span className='text'>SKIPPED</span>
            </div>
            <div className="correctPercent">
                <span className='percent'>{correctPercent}%</span>
                <span className='text'>CORRECT</span>
            </div>
            <div className="incorrectPercent">
                <span className='percent'>{incorrectPercent}%</span>
                <span className='text'>INCORRECT</span>
            </div>
        </div>
        <div className="contain-play-again">
            <button onClick={handleReset} className='btn-play-again'>Play again</button>
        </div>
        <hr />
        <div className="list-question-answered">
            {
                state.quizAnswered.map((game,index)=>{
                    const {correctAnswer,ans,text} = game
                    return (
                        <div key={index} className="item-question-answered">
                            <div className="index">{index+1}</div>
                                <div className="questionResult">
                                    {text}
                                </div>
                            <div 
                            className={`answered ${correctAnswer === ans ? "user-answer-correct" : "user-answer-wrong"}`}>
                                {ans}
                            </div>
                        </div>
                    )
                })
            }
         
        </div>
    </div>
  )
}

export default Result