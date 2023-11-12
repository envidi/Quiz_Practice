import { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import QuizContextProvider from "./context/Quix";
import data from "./dummy-data";
import quizImg from './assets/quiz-logo.png'
import './quiz.css'

function App() {
    const [indexCurrQuiz,setIndexCurrQuiz] = useState(0)

    console.log(indexCurrQuiz)
    return <QuizContextProvider>
        <div className="contain-top">
            <img className="quizImg" src={quizImg} alt="" />
            <h3>ReactQuiz</h3>
        </div>
       {
        indexCurrQuiz <= data.length-1 &&  <Quiz indexCurrQuiz={indexCurrQuiz} setIndexCurrQuiz={setIndexCurrQuiz} />
       }
        {
            indexCurrQuiz > data.length-1  && <Result setIndexCurrQuiz={setIndexCurrQuiz}/>
        }
    </QuizContextProvider>
}

export default App;
