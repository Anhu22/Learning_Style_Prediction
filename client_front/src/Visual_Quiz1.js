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

const TimerDisplay = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #ff6347;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 15px;
  border-radius: 8px;
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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    // Get section start time from localStorage
    const sectionStartTime = parseInt(localStorage.getItem("visualSectionStartTime") || Date.now());
    
    // Calculate initial elapsed time
    const initialElapsed = Math.floor((Date.now() - sectionStartTime) / 1000);
    setElapsedTime(initialElapsed);
    
    // Start updating timer every second
    const interval = setInterval(() => {
      const currentElapsed = Math.floor((Date.now() - sectionStartTime) / 1000);
      setElapsedTime(currentElapsed);
    }, 1000);
    
    setTimerInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

    // Stop the timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    setSubmitted(true);
    
    // Save ONLY the score (remove time storage)
    localStorage.setItem("visualQuizScore1", calculatedScore.toString());
    console.log(`Visual Quiz 1 Score Saved: ${calculatedScore}`);
    
    // Optional: Update current time reference
    localStorage.setItem("visualCurrentStartTime", Date.now().toString());
  }, [answers, submitted, timerInterval]);

  return (
    <QuizContainer>
      <Title>
        <h1>Planets Quiz</h1>
      </Title>

      <TimerDisplay>
        ⏱️ Section Time: {formatTime(elapsedTime)}
      </TimerDisplay>

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
                disabled={submitted}
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