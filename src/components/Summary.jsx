import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Summary({ userAnswers }) {
    const skippedAnswers = Math.round(userAnswers.filter((answer) => answer === null).length / QUESTIONS.length * 100, 2);
    const correctAnswers = Math.round(userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]).length / QUESTIONS.length * 100, 2);
    const incorrectAnswers = 100 - skippedAnswers - correctAnswers;

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Quiz Complete Img" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswers + "%"}</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswers + "%"}</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{incorrectAnswers + "%"}</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = 'user-answer';
                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }
                    return (<li key={index}>
                        <h3>{index + 1}</h3>
                        <p className="question">{QUESTIONS[index].text}</p>
                        <p className={cssClass}> {answer ?? "Skipped"}</p>
                    </li>)
                }
                )}
            </ol>
        </div>
    );
}