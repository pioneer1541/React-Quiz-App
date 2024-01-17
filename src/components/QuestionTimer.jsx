import { useEffect, useState } from "react";
export default function QuestionTImer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prev) => prev - 100);
        }, 100);
        return () => clearInterval(interval);

    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onTimeout) onTimeout();
        }, timeout);
        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);



    return (
        <progress id="question-timer" value={remainingTime} max={timeout} className={mode}></progress>
    );
}