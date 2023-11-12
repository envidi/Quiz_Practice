import { createContext,useReducer } from "react";

export const QuizContext = createContext({
    quizAnswered: [],
    currentAnswered : null,
    answers :[]
})

export const QUIZ_ANSWERED = "QUIZ_ANSWERED"
export const RESET = "RESET"

const reducer = (state,action)=>{
    switch (action.type) {
        case QUIZ_ANSWERED:
            
           return {
            quizAnswered : [...state.quizAnswered,action.payload],
            currentAnswered : action.payload.ans,
            answers : [...state.answers,action.payload.ans]
           }
        case RESET:
            
           return {
            quizAnswered: [],
            currentAnswered : null,
            answers :[]
           }
    
        default:
            return state;
    }
}

const QuizContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,{
        quizAnswered: [],
        currentAnswered : null,
        answers :[]
    })
    return <QuizContext.Provider value={{state,dispatch}}>
        {children}
    </QuizContext.Provider>
}
export default QuizContextProvider

