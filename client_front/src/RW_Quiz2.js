import React, { useState, useEffect } from "react";
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

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!submitted) {
        handleSubmit();
      }
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, submitted]);

  const questions = [
    {
      question: "1. Which part of the plant makes food using sunlight?",
      options: ["Root", "Stem", "Leaves", "Flower"],
      correctAnswer: "Leaves",
    },
    {
      question: "2. Which plant needs support to grow upright?",
      options: ["Pumpkin", "Mango", "Money plant", "Mint"],
      correctAnswer: "Money plant",
    },
    {
      question: "3. What is the main job of roots?",
      options: [
        "Make seeds",
        "Hold the plant and absorb water",
        "Carry food",
        "Make flowers",
      ],
      correctAnswer: "Hold the plant and absorb water",
    },
    {
      question: "4. Small and soft plants, like mint or coriander, are called?",
      options: ["Shrubs", "Herbs", "Trees", "Climbers"],
      correctAnswer: "Herbs",
    },
    {
      question: "5. Which part of the plant protects and carries the seeds?",
      options: ["Stem", "Root", "Fruit", "Leaf"],
      correctAnswer: "Fruit",
    },
  ];

  const handleChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
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

    // Calculate time taken
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds

  setScore(calculatedScore);
  setSubmitted(true);
  localStorage.setItem("readwriteQuizScore2", calculatedScore);
  localStorage.setItem("readwriteQuizTime2", timeTaken);
  };

  return (
    <QuizContainer>
      <Title>
        <h1>🌿 Plants Quiz</h1>
      </Title>

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
              />
              {option}
            </AnswerOption>
          ))}
        </QuestionContainer>
      ))}

      {!submitted ? (
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
          {/* Skip button - always visible 
          <SubmitButton 
            style={{ background: '#f44336' }}
            onClick={() => navigate('/readwrite3')}
          >
            Skip ⏭️
          </SubmitButton>*/}
          
          <SubmitButton onClick={handleSubmit}>Submit Quiz</SubmitButton>
        </div>
      ) : (
        <div>
          {/*<p>Your score: {score}/5</p>*/}
          <SubmitButton onClick={() => navigate("/readwrite3")}>
            Proceed to Next
          </SubmitButton>
        </div>
      )}
    </QuizContainer>
  );
};

export default Quiz;
