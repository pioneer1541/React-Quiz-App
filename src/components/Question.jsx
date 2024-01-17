import { useState } from "react"
import QUESTIONS from "../questions"
import Answers from "./Answers"
import QuestionTImer from "./QuestionTimer"
export default function Question({ index, onSelectAnswer, onSkipAnswer, questionsLength }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })

    let timer = 10000;
    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer((prev) => {
                return {
                    ...prev,
                    isCorrect: QUESTIONS[index].answers[0] === answer
                }
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }


    return (
        <div id="question">
            <QuestionTImer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState}></QuestionTImer>
            <h2>Question {index + 1}/{questionsLength}</h2>
            <h2>{QUESTIONS[index].text}</h2>
            <Answers answers={QUESTIONS[index].answers} selectedAnswer={answer.selectedAnswer} answerState={answerState} onSelect={handleSelectAnswer} />
        </div>
    )
}