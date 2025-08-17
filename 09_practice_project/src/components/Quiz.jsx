import { useCallback, useState } from "react";
import quizComplete from "../assets/quiz-complete.png";

import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

const QUESTION_TIMEOUT = 10000;

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length -1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(
    selectedAnswer
  ) {
    setAnswerState("answered");
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });

    setTimeout(() => {
      if (QUESTIONS[activeQuestionIndex].answers[0] === selectedAnswer) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  },
  [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(function handleSkipAnswer() {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, null];
    });
  }, []);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz complete" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={QUESTION_TIMEOUT}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer, index) => {
            const isSelected = userAnswers[userAnswers.length -1] === answer;
            let cssClass = '';

            if(answerState === 'answered' && isSelected) {
              cssClass = 'selected';
            }

            if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
              cssClass = answerState;
            }
            return (
              <li key={index} className="answer">
                <button onClick={() => handleSelectedAnswer(answer)} className={cssClass}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
