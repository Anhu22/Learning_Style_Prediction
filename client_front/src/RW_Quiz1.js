import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  const questions = useMemo(() => [
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
  ], []);

  // Start timer when component mounts
  useEffect(() => {
    // Get section start time from localStorage
    const sectionStartTime = parseInt(localStorage.getItem("readwriteSectionStartTime") || Date.now());
    
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

  const handleSubmit = useCallback(() => {
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
    
    // Store ONLY the score (REMOVED time storage)
    localStorage.setItem("readwriteQuizScore1", calculatedScore.toString());
    console.log(`ReadWrite Quiz 1 Score Saved: ${calculatedScore}`);
    
    // Update current time reference for next page
    localStorage.setItem("readwriteCurrentStartTime", Date.now().toString());
  }, [answers, questions, timerInterval]);

  const handleChange = (e, index) => {
    let newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  return (
    <QuizContainer>
      <Title>
        <h1>Solar System Quiz</h1>
      </Title>

      <TimerDisplay>
        ⏱️ Section Time: {formatTime(elapsedTime)}
      </TimerDisplay>

      <div>
        {questions.map((q, index) => (
          <QuestionContainer key={index}>
            <Question>{q.question}</Question>
            {q.options.map((option, i) => (
              <AnswerOption key={i}>
                <input
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

        <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
          <SubmitButton onClick={handleSubmit} disabled={submitted}>
            Submit
          </SubmitButton>
        </div>
      </div>
      <br></br>
      {submitted && (
        <div>
          <SubmitButton
            onClick={() => {
              navigate("/readwrite2");
            }}
          >
            Proceed to Next
          </SubmitButton>
        </div>
      )}
    </QuizContainer>
  );
};

export default Quiz;