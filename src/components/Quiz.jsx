import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsOver = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
        document.activeElement.blur();
        setUserAnswers((prev) => { return [...prev, answer] });
    }, []);



    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
    if (quizIsOver) {
        return (
            <Summary userAnswers={userAnswers} />
        );
    }


    return (
        <div id="quiz">
            <Question key={activeQuestionIndex} index={activeQuestionIndex} questionsLength={QUESTIONS.length} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer} />
        </div>
    );

}