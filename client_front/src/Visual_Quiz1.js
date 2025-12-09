import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const QuizContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  border-radius: 12px;
`;

const Title = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Question = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const AnswerOption = styled.label`
  display: block;
  margin-top: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e55347;
  }
`;

// Sample Questions
const questions = [
  {
    question: "1. What is the name of our planet?",
    options: ["Earth", "Mars", "Venus", "Saturn"],
    correctAnswer: "Earth",
  },
  {
    question: "2. Which planet is known as the 'Red Planet'?",
    options: ["Earth", "Mars", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
  },
  {
    question: "3. What is the name of the star at the center of our solar system?",
    options: ["The Moon", "The Sun", "The Earth", "The North Star"],
    correctAnswer: "The Sun",
  },
  {
    question: "4. Which planet is closest to the Sun?",
    options: ["Mercury", "Earth", "Mars", "Saturn"],
    correctAnswer: "Mercury",
  },
  {
    question: "5. What is the name of the natural satellite of earth?",
    options: ["Saturn", "The Moon", "Venus", "Mars"],
    correctAnswer: "The Moon",
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [, setScore] = useState(0);
  const INITIAL_TIME = 2700;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME); // 45 minutes in seconds
  const [startTime, setStartTime] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!startTime) setStartTime(Date.now());

    if (timeLeft <= 0) {
      if (!submitted) handleSubmit();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, submitted, startTime]);

  /* formatTime currently unused (timer UI commented out)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }; */

  const handleChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = useCallback(() => {
    if (submitted) return;

    if (answers.length < questions.length || answers.includes(undefined)) {
      alert("Please answer all questions before submitting the quiz.");
      return;
    }

    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
    localStorage.setItem("visualQuizScore1", calculatedScore);
    // save time taken
    try {
      const timeTaken = Math.floor((Date.now() - (startTime || Date.now())) / 1000);
      localStorage.setItem("visualQuizTime1", timeTaken);
    } catch (e) {
      localStorage.setItem("visualQuizTime1", (INITIAL_TIME - timeLeft));
    }
  }, [answers, submitted, startTime, timeLeft]);

  return (
    <QuizContainer>
      <Title>
        <h1>Planets Quiz</h1>
      </Title>

      {/* Timer (optional) */}
      {/* <Timer>Time Left: {formatTime(timeLeft)}</Timer> */}

      {questions.map((q, index) => (
        <QuestionContainer key={index}>
          <Question>{q.question}</Question>
          {q.options.map((option, i) => (
            <AnswerOption key={i} htmlFor={`q${index}_opt${i}`}>
              <input
                id={`q${index}_opt${i}`}
                type="radio"
                name={`question${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={(e) => handleChange(e, index)}
                disabled={submitted || timeLeft <= 0}
              />
              {option}
            </AnswerOption>
          ))}
        </QuestionContainer>
      ))}

      {!submitted ? (
        <SubmitButton onClick={handleSubmit}>
          Submit Quiz
        </SubmitButton>
      ) : (
        <div>
          <SubmitButton onClick={() => navigate("/visual2")}>
            Proceed to Next
          </SubmitButton>
        </div>
      )}
    </QuizContainer>
  );
};

export default Quiz;
