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
    let newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
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
    localStorage.setItem("visualQuizScore2", calculatedScore.toString());
    console.log(`Visual Quiz 2 Score Saved: ${calculatedScore}`);
    
    // Get cumulative time from section start
    //const sectionStartTime = parseInt(localStorage.getItem("visualSectionStartTime") || Date.now());
    //const totalElapsed = Math.floor((Date.now() - sectionStartTime) / 1000);
    //localStorage.setItem("visualQuizTime2", totalElapsed.toString());
    
    // Store for next quiz
    localStorage.setItem("visualCurrentStartTime", Date.now().toString());
  };

  const questions = [
    {
      question: "1. Which part of the plant makes food?",
      options: ["Root", "Stem", "Leaves", "Flower"],
      correctAnswer: "Leaves",
    },
    {
      question: "2. Which part of the plant protects the flower?",
      options: ["Seed", "Leaves", "Bud", "Stem"],
      correctAnswer: "Bud",
    },
    {
      question: "3. What is the function of the roots?",
      options: [
        "Make seeds",
        "Hold the plant and absorb water",
        "Carry food",
        "Make flowers",
      ],
      correctAnswer: "Hold the plant and absorb water",
    },
    {
      question: "4. What is the colorful part of a Plant?",
      options: ["Root", "Flower", "Stem", "Fruit"],
      correctAnswer: "Flower",
    },
    {
      question: "5. Which part of the plant holds the seeds?",
      options: ["Stem", "Root", "Fruit", "Leaf"],
      correctAnswer: "Fruit",
    },
  ];

  return (
    <QuizContainer>
      <Title><h1>🌿 Plants Quiz</h1></Title>

      <TimerDisplay>
        ⏱️ Section Time: {formatTime(elapsedTime)}
      </TimerDisplay>

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
              {" "}{option}
            </AnswerOption>
          ))}
        </QuestionContainer>
      ))}

      <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
        <SubmitButton onClick={handleSubmit} disabled={submitted}>
          Submit
        </SubmitButton>
      </div>
      <br></br>
      {submitted && (
        <div>
          <SubmitButton
            onClick={() => {
              navigate("/visual3");
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