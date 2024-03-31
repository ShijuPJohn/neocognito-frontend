import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchUrl} from "./globalConstants.js";

function App() {
    useEffect(() => {
        axios.get(`${fetchUrl}/questions?page=1`).then(response => {
            console.log(response.data.questions)
            setQuestion(response.data.questions[0])

        })

    }, [])
    const [answered, setAnswered] = useState(false)
    const [question, setQuestion] = useState({})
    const [selectedOption, setSelectedOption] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [totalScore, setTotalScore]=useState(0)
    return (
        <div className="quiz_box">
            {<h1 className={"quiz_box_quest_title"}>{question.question}</h1>}
            {question.options && (question.options.map((option, index) => (
                <h4 className={`quiz_box_option ${selectedOption.includes(index) ? "selected" : undefined} ${correctAnswers.includes(index) ? "right_answer" : undefined}`}
                    key={index}
                    style={answered?{cursor:"default"}:{}}
                    onClick={() => {
                       if (!answered){
                           const temp = [...selectedOption]
                           if (question.questionType==="m-choice") {
                               setSelectedOption([index])
                               return
                           }
                           if (selectedOption.includes(index)) {
                               const indexInArray = selectedOption.indexOf(index)
                               temp.splice(indexInArray, 1)
                               setSelectedOption([...temp])
                           } else {
                               temp.push(index)
                               setSelectedOption([...temp])
                           }
                    }}}
                >
                    {option}
                </h4>
            )))}
            <div className="quiz_box_btn_box">
                <button className="quiz_box_answer_btn" onClick={checkAnswer}>Answer</button>
            </div>
        </div>
    )

    function checkAnswer() {
        setCorrectAnswers(question.correctOptions)
        setSelectedOption([])
        setAnswered(true)
    }
}

export default App
